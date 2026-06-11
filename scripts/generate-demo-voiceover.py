"""Generate bot-style voiceover and mux with demo video."""

from __future__ import annotations

import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "public" / "final-review-video.mp4"
VOICEOVER = ROOT / "public" / "demo-voiceover.mp3"
CAPTIONS = ROOT / "public" / "demo-captions.vtt"
OUTPUT = ROOT / "public" / "final-review-video.mp4"
BACKUP = ROOT / "public" / "final-review-video.original.mp4"
WORK_DIR = ROOT / "public" / ".voiceover-work"

FEATURE_DURATION = 300.0
CLOSING_DURATION = 13.0
TOTAL_DURATION = FEATURE_DURATION + CLOSING_DURATION

VOICE = "en-US-SteffanNeural"
RATE = "-4%"
PITCH = "+18Hz"
VOLUME = "+0%"
ORIGINAL_AUDIO_VOLUME = "0.14"

FEATURES_NARRATION = """
Hello. I am MeetingBuddy AI — your local meeting intelligence assistant.
Initialization complete. Beginning guided demonstration.
For the next five minutes, I will walk you through every core feature:
meeting capture, speech to text, local AI processing,
minutes of meeting generation, structured action extraction,
chatbot memory, bot follow-up, and enterprise privacy controls.
All intelligence runs on your infrastructure. Privacy mode: enabled.

Feature one: neural meeting capture.
MeetingBuddy AI listens to live meeting audio from conference rooms, video calls, and hybrid sessions.
Neural capture processes conversations in real time as they unfold.
Audio is retained on your system. No mandatory cloud upload is required.
This is the entry point for every automated workflow you are about to see.

Feature two: meeting transcription.
Captured audio is converted into an accurate, timestamped transcript.
Each speaker contribution is labeled, indexed, and searchable.
Your team receives a reliable record of what was said, when it was said, and who said it.
The transcript becomes structured input for downstream AI analysis.

Feature three: local AI transcript processing.
MeetingBuddy AI invokes Ollama and Qwen models on your own hardware.
The system identifies decisions, themes, and commitments without sending data to external APIs.
Processing status, model output, and intermediate reasoning remain inside your environment.
For regulated industries, this local-first design is not optional — it is essential.

Feature four: automatic minutes of meeting generation.
From the analyzed transcript, MeetingBuddy AI composes a professional MoM document.
You will see sections for summary, key decisions, discussion points, and attendees.
Formatting is consistent and ready for distribution.
Manual note-taking time is reduced from hours to minutes.

Feature five: five W one H action item extraction.
For every commitment detected, the system extracts who owns the task,
what must be delivered, when it is due, where it applies,
why it matters, and how execution should proceed.
Assignee tracking begins immediately.
Action items appear in structured tables with status badges for accountability.

Feature six: chatbot memory.
Project context and meeting history are stored inside the AI assistant itself.
There is no separate project dashboard to configure or maintain.
Ask questions in natural language at any time.
The chatbot recalls prior decisions, outcomes, and discussion threads from earlier meetings.

Feature seven: bot follow-up and workflow automation.
After the meeting ends, MeetingBuddy AI continues working on your behalf.
The bot monitors open action items, assignees, and approaching deadlines.
Email workflows distribute meeting summaries and send action requests to responsible parties.
Follow-up is proactive — not dependent on someone remembering to check a task list.

Feature eight: privacy-first architecture.
Local inference, optional connectivity, full data ownership,
offline operation, and enterprise controls are active by default.
Your sensitive conversations stay under organizational control.

Continuing with the on-screen feature walkthrough.

On screen, you can see the action item request interface.
Create structured requests with title, assignee, and due date fields.
Each request links back to the source meeting and transcript segment for full traceability.

The assignee tracking view lists every open commitment in one table.
Status badges highlight pending, in progress, and completed items.
Managers gain instant visibility without opening separate project management tools.

Neural capture remains active during live sessions.
Key insights surface while the conversation is still in progress.
Participants stay focused on the discussion — not on taking notes.

The email workflow distributes meeting summaries automatically.
Recipients receive key takeaways, decisions, and action items in a single message.
Assignees are notified directly when a new task is assigned to them.

Review the generated minutes of meeting document on screen.
Sections are organized for quick scanning: summary, decisions, discussion points, and next steps.
Export or share the document through your preferred channels.

The meeting transcript view provides timestamped speaker labels.
Jump to any moment in the conversation with a single click.
Search across past meetings to find prior decisions or quoted statements.

Feature nine: enterprise data control.
Compare MeetingBuddy AI with cloud-only alternatives.
You retain full data ownership, optional internet dependency, and offline capability.
Enterprise compliance teams gain on-premises deployment without sacrificing AI quality.

Feature ten: offline operation.
Process meetings anywhere — even without internet connectivity.
Core intelligence continues to run on local models and local storage.

That completes the feature walkthrough.
You have now seen how MeetingBuddy AI captures, understands, structures, and follows up on every meeting — entirely on your infrastructure.
""".strip()

CLOSING_QUOTE = """
Your meetings deserve more than forgotten notes and lost decisions.
MeetingBuddy AI — where every conversation becomes clarity, accountability, and action.
Privately. Automatically. On your infrastructure.
""".strip()


async def synthesize(text: str, audio_output: Path, boundaries_output: Path) -> None:
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH, volume=VOLUME)
    await communicate.save(str(audio_output), str(boundaries_output))


def format_timestamp(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = seconds % 60
    return f"{hours:02d}:{minutes:02d}:{secs:06.3f}"


def atempo_filter(tempo: float) -> str:
    filters: list[str] = []
    remaining = tempo
    while remaining > 2.0:
        filters.append("atempo=2.0")
        remaining /= 2.0
    while remaining < 0.5:
        filters.append("atempo=0.5")
        remaining /= 0.5
    filters.append(f"atempo={remaining:.6f}")
    return ",".join(filters)


def fit_audio_duration(input_path: Path, output_path: Path, target_duration: float) -> float:
    current_duration = probe_duration(input_path)

    if current_duration > target_duration + 0.05:
        tempo = current_duration / target_duration
        run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(input_path),
                "-af",
                atempo_filter(tempo),
                "-t",
                str(target_duration),
                str(output_path),
            ]
        )
        return target_duration / current_duration

    if current_duration < target_duration - 0.05:
        pad_duration = target_duration - current_duration
        run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(input_path),
                "-af",
                f"apad=pad_dur={pad_duration}",
                "-t",
                str(target_duration),
                str(output_path),
            ]
        )
        return 1.0

    run(["ffmpeg", "-y", "-i", str(input_path), "-t", str(target_duration), str(output_path)])
    return 1.0


def concat_audio(parts: list[Path], output_path: Path) -> None:
    concat_list = output_path.with_suffix(".txt")
    concat_list.write_text(
        "\n".join(f"file '{path.resolve().as_posix()}'" for path in parts),
        encoding="utf-8",
    )
    run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(concat_list),
            "-c",
            "copy",
            str(output_path),
        ]
    )
    concat_list.unlink(missing_ok=True)


def load_cues(
    boundaries_output: Path,
    time_offset: float,
    max_duration: float,
    time_scale: float,
) -> list[tuple[float, float, str]]:
    cues: list[tuple[float, float, str]] = []

    for line in boundaries_output.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        data = json.loads(line)
        if data.get("type") != "SentenceBoundary":
            continue

        start = (data["offset"] / 10_000_000) * time_scale + time_offset
        end = ((data["offset"] + data["duration"]) / 10_000_000) * time_scale + time_offset
        if start >= time_offset + max_duration:
            continue

        segment_end = time_offset + max_duration
        cues.append((start, min(end, segment_end), data["text"]))

    return cues


def write_vtt(cues: list[tuple[float, float, str]], captions_output: Path) -> None:
    vtt_lines = ["WEBVTT", "", "NOTE Generated bot narration captions for MeetingBuddyAI demo video", ""]
    for index, (start, end, text) in enumerate(cues, start=1):
        vtt_lines.extend(
            [
                str(index),
                f"{format_timestamp(start)} --> {format_timestamp(end)}",
                text,
                "",
            ]
        )

    captions_output.write_text("\n".join(vtt_lines), encoding="utf-8")


def run(cmd: list[str]) -> None:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )
    return float(result.stdout.strip())


def mux_voiceover(video: Path, voiceover: Path, output: Path, video_duration: float) -> None:
    temp_output = output.with_suffix(".vo.mp4")
    run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(video),
            "-i",
            str(voiceover),
            "-filter_complex",
            (
                f"[0:a]volume={ORIGINAL_AUDIO_VOLUME}[bg];"
                "[1:a]volume=1.0[vo];"
                "[bg][vo]amix=inputs=2:duration=first:dropout_transition=2[aout]"
            ),
            "-map",
            "0:v:0",
            "-map",
            "[aout]",
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-t",
            str(video_duration),
            str(temp_output),
        ]
    )
    temp_output.replace(output)


async def main() -> None:
    if not BACKUP.exists() and VIDEO.exists():
        VIDEO.replace(BACKUP)
        print(f"Backed up original video to {BACKUP.name}")

    source_video = BACKUP if BACKUP.exists() else VIDEO
    if not source_video.exists():
        raise FileNotFoundError(f"Missing demo video: {source_video}")

    video_duration = probe_duration(source_video)
    if abs(video_duration - TOTAL_DURATION) > 1.0:
        print(f"Warning: video duration is {video_duration:.1f}s, expected {TOTAL_DURATION:.1f}s")

    WORK_DIR.mkdir(parents=True, exist_ok=True)
    features_raw = WORK_DIR / "features-raw.mp3"
    features_fit = WORK_DIR / "features-fit.mp3"
    features_boundaries = WORK_DIR / "features.boundaries.jsonl"
    closing_raw = WORK_DIR / "closing-raw.mp3"
    closing_fit = WORK_DIR / "closing-fit.mp3"
    closing_boundaries = WORK_DIR / "closing.boundaries.jsonl"

    print("Synthesizing feature narration (0:00 - 5:00)...")
    await synthesize(FEATURES_NARRATION, features_raw, features_boundaries)
    features_scale = fit_audio_duration(features_raw, features_fit, FEATURE_DURATION)
    features_duration = probe_duration(features_fit)
    print(f"Features segment: {features_duration:.1f}s (target {FEATURE_DURATION:.1f}s)")

    print("Synthesizing closing quote (5:00 - 5:13)...")
    await synthesize(CLOSING_QUOTE, closing_raw, closing_boundaries)
    closing_scale = fit_audio_duration(closing_raw, closing_fit, CLOSING_DURATION)
    closing_duration = probe_duration(closing_fit)
    print(f"Closing segment: {closing_duration:.1f}s (target {CLOSING_DURATION:.1f}s)")

    concat_audio([features_fit, closing_fit], VOICEOVER)
    voice_duration = probe_duration(VOICEOVER)
    print(f"Combined voiceover: {voice_duration:.1f}s")

    feature_cues = load_cues(features_boundaries, 0.0, FEATURE_DURATION, features_scale)
    closing_cues = load_cues(
        closing_boundaries,
        FEATURE_DURATION,
        CLOSING_DURATION,
        closing_scale,
    )
    write_vtt(feature_cues + closing_cues, CAPTIONS)

    mux_voiceover(source_video, VOICEOVER, OUTPUT, video_duration)
    print(f"Updated demo video with bot voiceover: {OUTPUT}")
    print(f"Captions written to: {CAPTIONS}")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)

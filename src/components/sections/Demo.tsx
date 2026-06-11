"use client";

import { useEffect, useRef, useState } from "react";
import { IconPlay } from "@/components/icons";

export function Demo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const enableCaptions = () => {
      for (const track of video.textTracks) {
        track.mode = track.kind === "captions" ? "showing" : "disabled";
      }
    };

    enableCaptions();
    video.addEventListener("loadedmetadata", enableCaptions);
    return () => video.removeEventListener("loadedmetadata", enableCaptions);
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setHasStarted(true);
  };

  return (
    <section id="demo" className="section-padding relative overflow-hidden">
      <div className="glow-orb w-[450px] h-[450px] bg-purple-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="section-container relative z-10">
        <div className="text-center mb-10">
          <h2 className="section-title mb-4">Demo Video</h2>
          <p className="section-subtitle mx-auto">
            Watch the complete MeetingBuddyAI workflow from meeting capture to action items, bot
            follow-up, and chatbot memory. English captions are enabled by default.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div className="relative aspect-video bg-black group">
                <video
                  ref={videoRef}
                  className="demo-video w-full h-full object-cover"
                  controls={hasStarted}
                  preload="metadata"
                  playsInline
                  onPlay={() => setHasStarted(true)}
                >
                  <source src="/final-review-video.mp4" type="video/mp4" />
                  <track
                    kind="captions"
                    src="/demo-captions.vtt"
                    srcLang="en"
                    label="English captions"
                    default
                  />
                  Your browser does not support the video tag.
                </video>

                {!hasStarted && (
                  <button
                    type="button"
                    onClick={handlePlay}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors cursor-pointer"
                    aria-label="Play demo video"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 group-hover:scale-105 transition-transform pointer-events-none">
                      <IconPlay className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" />
                    </div>
                  </button>
                )}

                <span className="absolute top-4 right-4 z-20 badge !bg-black/60 !border-white/10 backdrop-blur-sm pointer-events-none">
                  5:13
                </span>
            </div>
          </div>

          <p className="mt-6 text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            See how MeetingBuddyAI converts conversations into structured outcomes using
            privacy-first local AI.
          </p>
        </div>
      </div>
    </section>
  );
}

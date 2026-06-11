export type DemoStepId =
  | "meeting"
  | "transcript"
  | "mom"
  | "email"
  | "actions"
  | "followup"
  | "memory"
  | "preread";

export type DemoStep = {
  id: DemoStepId;
  title: string;
  subtitle: string;
};

export const demoSteps: DemoStep[] = [
  { id: "meeting", title: "Meeting Playback", subtitle: "7-minute sprint review captured locally" },
  { id: "transcript", title: "Transcript", subtitle: "Speech-to-text with speaker labels" },
  { id: "mom", title: "MoM Generated", subtitle: "Structured minutes from local AI" },
  { id: "email", title: "Email Sent", subtitle: "Summary distributed to the team" },
  { id: "actions", title: "Action Items Collected", subtitle: "5W1H extraction with assignees" },
  { id: "followup", title: "Bot Follow-up", subtitle: "Automated reminders and replies" },
  { id: "memory", title: "Chatbot Memory", subtitle: "Context stored for future questions" },
  { id: "preread", title: "Pre-read Generated", subtitle: "Next meeting briefing ready" },
];

export const demoMeetingLines = [
  { speaker: "Sujay", time: "00:12", text: "Let's review sprint goals and open blockers for the API release." },
  { speaker: "Priya", time: "01:04", text: "QA handoff is pending documentation from Alex on the auth endpoints." },
  { speaker: "Alex", time: "02:18", text: "I'll finish API docs by Friday and share the updated MoM action list." },
  { speaker: "Sujay", time: "04:02", text: "Decision: ship beta installer after docs and assignee confirmations." },
] as const;

export const demoTranscript = `00:12 Sujay: Let's review sprint goals and open blockers for the API release.
01:04 Priya: QA handoff is pending documentation from Alex on the auth endpoints.
02:18 Alex: I'll finish API docs by Friday and share the updated action list.
04:02 Sujay: Decision — ship beta installer after docs and assignee confirmations.`;

export const demoMom = {
  summary: "Sprint review focused on API release readiness, QA handoff, and beta installer timing.",
  decisions: ["Ship beta installer after API docs and assignee confirmations."],
  actions: [
    "Alex to complete API documentation by Friday.",
    "Priya to begin QA handoff once docs are published.",
    "Sujay to confirm beta installer checklist before release.",
  ],
};

export const demoEmail = {
  to: "team@acme.internal",
  subject: "Sprint Review — Key Decisions & Action Items",
  body: "Summary: API release blocked on documentation. 3 action items assigned with Friday deadline for Alex.",
};

export const demoActionItems = [
  { who: "Alex", what: "Complete API documentation", when: "Friday", status: "Pending" },
  { who: "Priya", what: "QA handoff for auth endpoints", when: "Next week", status: "Waiting" },
  { who: "Sujay", what: "Confirm beta installer checklist", when: "Before release", status: "Open" },
];

export const demoFollowUp = {
  bot: "Follow-up sent to Alex: API documentation due Friday. Reply received: 'On track, draft ready by Thursday.'",
  status: "1 of 3 action items confirmed",
};

export const demoMemory = {
  question: "What blocked the API release in yesterday's sprint review?",
  answer:
    "QA handoff was waiting on API documentation from Alex. Decision: ship beta installer after docs and assignee confirmations.",
};

export const demoPreread = {
  title: "Pre-read: Next Sprint Planning",
  points: [
    "Open: Alex API docs (due Friday)",
    "Pending: Priya QA handoff after docs land",
    "Decision carry-over: beta installer gated on checklist sign-off",
  ],
};

export const expectedBenefits = [
  "Reduce manual note taking",
  "Improve accountability across teams",
  "Track action items automatically",
  "Build organizational meeting memory",
  "Prepare future meetings automatically",
] as const;

export const betaRequirements = [
  "Windows 10 or 11",
  "Ollama installed locally",
  "Qwen model pulled via Ollama",
  "Node.js runtime",
] as const;

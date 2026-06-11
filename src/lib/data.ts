export const navLinks = [

  { href: "#workflow", label: "Workflow" },

  { href: "#features", label: "Features" },

  { href: "#screenshots", label: "Screenshots" },

  { href: "#demo", label: "Demo" },

  { href: "#faq", label: "FAQ" },

  { href: "#beta", label: "Beta Access" },

] as const;



export const trustBadges = [

  "Privacy First",

  "Local AI",

  "Beta Available",

  "Offline Capable",

] as const;



export const problems = [

  "Important decisions disappear.",

  "Action items are forgotten.",

  "Creating meeting notes wastes valuable time.",

  "Sensitive conversations should remain private.",

  "Teams struggle to track accountability.",

  "Follow-ups on commitments rarely happen without reminders.",

] as const;



export const workflowSteps = [

  {

    title: "Meeting",

    description:

      "Capture live meeting audio on your device. Neural meeting capture records conversations without sending them to the cloud.",

  },

  {

    title: "Minutes of Meeting",

    description:

      "Local AI transforms the conversation into a structured MoM — summaries, decisions, and discussion points ready to share.",

  },

  {

    title: "Email",

    description:

      "Distribute meeting summaries and key outcomes automatically. Stakeholders receive takeaways and action items in one message.",

  },

  {

    title: "Action Item Collection",

    description:

      "5W1H extraction captures Who, What, When, Where, Why, and How for every commitment — with assignee tracking from day one.",

  },

  {

    title: "Bot Follow-up",

    description:

      "The AI bot proactively follows up on assignees and deadlines so nothing falls through the cracks after the meeting ends.",

  },

  {

    title: "Chatbot Memory",

    description:

      "Project context and meeting history live in the AI chatbot — ask questions grounded in prior meetings anytime.",

  },

  {

    title: "Next Meeting Pre-read",

    description:

      "Before the next session, generate a pre-read from open actions, prior decisions, and chatbot memory so everyone arrives prepared.",

  },

] as const;



export const features = [

  {

    icon: "document",

    title: "Automatic MoM Generation",

    description:

      "Generate polished Minutes of Meeting automatically — summaries, decisions, and discussion points included.",

  },

  {

    icon: "checklist",

    title: "5W1H Action Items & Bot Follow-up",

    description:

      "AI extracts structured action items with Who, What, When, Where, Why, and How — then the bot follows up on assignees and deadlines.",

  },

  {

    icon: "knowledge",

    title: "Chatbot Memory",

    description:

      "Project context stays in the AI chatbot's memory. Recall decisions and outcomes through conversation — no standalone project dashboard required.",

  },

  {

    icon: "email",

    title: "Email & Workflow Support",

    description:

      "Distribute MoM summaries and action items via email. Send action item requests directly to assignees.",

  },

  {

    icon: "cpu",

    title: "Local AI Processing",

    description:

      "Run Ollama and Qwen models on your infrastructure. No cloud API calls required for core intelligence.",

  },

  {

    icon: "mic",

    title: "Neural Meeting Capture",

    description:

      "Real-time neural capture processes live meeting audio and surfaces key insights as conversations unfold.",

  },

  {

    icon: "shield",

    title: "Privacy-First Architecture",

    description:

      "Your meeting data never needs to leave your organization. Privacy is built into every layer.",

  },

  {

    icon: "offline",

    title: "Offline Operation",

    description:

      "Full functionality without internet connectivity. Process meetings anywhere, anytime.",

  },

  {

    icon: "enterprise",

    title: "On-Prem Data Control",

    description:

      "Full data ownership and control. Deploy on-premises or in your private cloud with complete sovereignty.",

  },

  {

    icon: "mic",

    title: "Meeting Transcription",

    description:

      "High-accuracy speech-to-text that transforms conversations into searchable, timestamped transcripts.",

  },

] as const;



export const audienceGroups = [

  "Startup Teams",

  "Project Managers",

  "Software Development Teams",

  "Educational Institutions",

  "Consulting Firms",

  "Enterprise Teams",

  "Government & Compliance-Sensitive Organizations",

] as const;



export const useCases = [

  "Sprint Planning Meetings",

  "Client Meetings",

  "Project Reviews",

  "Academic Research Meetings",

  "Team Standups",

  "Product Discussions",

  "Board Meetings",

] as const;



export const faqItems = [

  {

    question: "Does MeetingBuddyAI require internet?",

    answer:

      "Core functionality works locally on your infrastructure. Internet is optional for features like email distribution, not required for AI processing.",

  },

  {

    question: "Where is my data stored?",

    answer:

      "On your infrastructure. Meeting audio, transcripts, MoM documents, and chatbot memory remain under your organization's control.",

  },

  {

    question: "Does it use cloud AI?",

    answer:

      "MeetingBuddyAI is designed for local AI using Ollama and Qwen models. Cloud APIs are optional, not mandatory for core intelligence.",

  },

  {

    question: "Can it run offline?",

    answer:

      "Yes. Local AI inference, transcript processing, and MoM generation work without an internet connection.",

  },

  {

    question: "What operating systems are supported?",

    answer:

      "Windows is supported first in the beta. macOS and Linux support are planned based on tester demand.",

  },

  {

    question: "Is there a pricing page?",

    answer:

      "Not yet. We are in limited beta and focused on validating the product with early testers before defining pricing models.",

  },

] as const;



export const roadmapCurrent = [

  "Meeting Capture",

  "MoM Generation",

  "Bot Follow-up",

  "Chatbot Memory",

] as const;



export const roadmapComing = [

  "Better Installer",

  "Team Collaboration",

  "Enterprise Deployment",

  "Advanced Analytics",

] as const;



export const privacyHighlights = [

  "Local AI inference on your hardware",

  "No mandatory cloud dependency",

  "Full data ownership and portability",

  "Enterprise-grade privacy controls",

  "Sensitive discussions remain under organizational control",

] as const;



export const comparisonRows = [

  { feature: "Data Ownership", meetingBuddy: "Full ownership", cloud: "Vendor-controlled" },

  { feature: "Internet Dependency", meetingBuddy: "Optional", cloud: "Required" },

  { feature: "Privacy Control", meetingBuddy: "Complete", cloud: "Limited" },

  { feature: "Offline Capability", meetingBuddy: "Full support", cloud: "None" },

  { feature: "Local Processing", meetingBuddy: "Native", cloud: "Cloud-only" },

  { feature: "Compliance Readiness", meetingBuddy: "On-prem ready", cloud: "Varies" },

] as const;



export const screenshots = [

  {

    title: "Action Item Request",

    label: "Send Request",

    image: "/screenshots/action-item-request.png",

    alt: "MeetingBuddyAI action item request form with title, assignee, and due date fields",

  },

  {

    title: "Action Items Assignee",

    label: "Assignee Tracking",

    image: "/screenshots/action-items-assignee.png",

    alt: "MeetingBuddyAI action items table showing assignees and status badges",

  },

  {

    title: "Neural Capture",

    label: "Live AI Processing",

    image: "/screenshots/neural-capture.png",

    alt: "MeetingBuddyAI neural capture interface processing meeting conversation",

  },

  {

    title: "Email Workflow",

    label: "Email Distribution",

    image: "/screenshots/email-workflow.png",

    alt: "MeetingBuddyAI automated meeting summary email with key takeaways and action items",

  },

  {

    title: "Minutes of Meeting",

    label: "MoM Document",

    image: "/screenshots/minutes-of-meeting.png",

    alt: "MeetingBuddyAI generated minutes of meeting document with structured sections",

  },

  {

    title: "Meeting Transcript",

    label: "Transcript View",

    image: "/screenshots/meeting-transcript.png",

    alt: "MeetingBuddyAI timestamped meeting transcript with speaker labels",

  },

] as const;



export const companyName = "Apex Cognition LLP" as const;

export const founders = ["Sujay", "Shreyas Aditya"] as const;

export const footerLinks = [

  { href: "#workflow", label: "Workflow" },

  { href: "#features", label: "Features" },

  { href: "#privacy", label: "Privacy" },

  { href: "#demo", label: "Demo" },

  { href: "#faq", label: "FAQ" },

  { href: "#beta", label: "Beta Access" },

] as const;



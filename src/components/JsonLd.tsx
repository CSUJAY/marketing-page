export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MeetingBuddyAI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, macOS, Linux",
    description:
      "Privacy-first AI meeting intelligence platform that transforms meetings into transcripts, Minutes of Meeting, action items with bot follow-up, and chatbot memory using local AI.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Beta access",
    },
    featureList: [
      "Local AI Processing",
      "Meeting Transcription",
      "Automatic MoM Generation",
      "5W1H Action Items with Bot Follow-up",
      "Chatbot Memory",
      "Offline Operation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

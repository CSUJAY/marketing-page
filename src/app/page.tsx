import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Workflow } from "@/components/sections/Workflow";
import { WhoIsItFor } from "@/components/sections/WhoIsItFor";
import { UseCases } from "@/components/sections/UseCases";
import { WhyNotCloudAI } from "@/components/sections/WhyNotCloudAI";
import { ExpectedBenefits } from "@/components/sections/ExpectedBenefits";
import { Features } from "@/components/sections/Features";
import { Privacy } from "@/components/sections/Privacy";
import { Screenshots } from "@/components/sections/Screenshots";
import { Demo } from "@/components/sections/Demo";
import { TryDemo } from "@/components/sections/TryDemo";
import { Roadmap } from "@/components/sections/Roadmap";
import { FAQ } from "@/components/sections/FAQ";
import { BetaRequirements } from "@/components/sections/BetaRequirements";
import { BetaAccess } from "@/components/sections/BetaAccess";
import { FounderStory } from "@/components/sections/FounderStory";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Workflow />
        <WhoIsItFor />
        <UseCases />
        <WhyNotCloudAI />
        <ExpectedBenefits />
        <Features />
        <Privacy />
        <Screenshots />
        <Demo />
        <TryDemo />
        <Roadmap />
        <FAQ />
        <BetaRequirements />
        <BetaAccess />
        <FounderStory />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

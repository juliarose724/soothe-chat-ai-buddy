
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface LandingPageProps {
  onStartTalking: () => void;
}

export const LandingPage = ({ onStartTalking }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-[#051827] flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            SOS AI
          </h1>
          <p className="text-xl md:text-2xl text-[#B0C4D6] max-w-2xl mx-auto leading-relaxed">
            Your friendly, professional mental-health chatbot
          </p>
        </div>
        
        <Button
          onClick={onStartTalking}
          className="group relative px-12 py-6 text-xl font-semibold text-white rounded-2xl bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Start Talking
          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        
        <div className="mt-12 text-[#B0C4D6] text-sm">
          Available 24/7 • Confidential • Supportive
        </div>
      </div>
    </div>
  );
};

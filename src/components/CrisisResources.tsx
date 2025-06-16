
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Globe } from "lucide-react";

interface CrisisResourcesProps {
  isOpen: boolean;
  onClose: () => void;
}

const resources = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support",
    icon: Phone,
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 text-based support",
    icon: MessageCircle,
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Mental health & substance abuse",
    icon: Phone,
  },
];

const onlineResources = [
  {
    name: "Psychology Today",
    url: "https://www.psychologytoday.com",
    description: "Find therapists and mental health professionals",
  },
  {
    name: "NAMI",
    url: "https://www.nami.org",
    description: "National Alliance on Mental Illness",
  },
  {
    name: "Mental Health America",
    url: "https://www.mhanational.org",
    description: "Mental health resources and screening tools",
  },
];

export const CrisisResources = ({ isOpen, onClose }: CrisisResourcesProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A2332] border-[#2A3441] text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Crisis Resources & Support
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 font-medium text-center">
              If you're having thoughts of self-harm or suicide, please reach out for help immediately.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Emergency Hotlines</h3>
            <div className="space-y-3">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#242B3A] rounded-lg p-4 border border-[#2A3441]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">{resource.name}</h4>
                        <p className="text-slate-300 text-sm mb-2">{resource.description}</p>
                        <Button
                          onClick={() => window.open(`tel:${resource.number.replace(/\D/g, '')}`)}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm h-8"
                        >
                          {resource.number}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Online Resources</h3>
            <div className="space-y-3">
              {onlineResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-[#242B3A] rounded-lg p-4 border border-[#2A3441]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{resource.name}</h4>
                      <p className="text-slate-300 text-sm mb-2">{resource.description}</p>
                      <Button
                        onClick={() => window.open(resource.url, '_blank')}
                        variant="outline"
                        className="border-[#2A3441] text-slate-300 hover:bg-[#2A3441] text-sm h-8"
                      >
                        Visit Website
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 text-sm text-center">
              Remember: You are not alone. Help is available, and there are people who care about you.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

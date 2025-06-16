
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings } from "lucide-react";

interface ChatHeaderProps {
  conversationTitle: string;
  onProfileClick: () => void;
}

export const ChatHeader = ({ conversationTitle, onProfileClick }: ChatHeaderProps) => {
  return (
    <div className="bg-[#102B40] border-b border-[#163447] p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-white">SOS AI</h1>
        {conversationTitle && (
          <>
            <span className="text-[#B0C4D6]">•</span>
            <span className="text-[#B0C4D6]">{conversationTitle}</span>
          </>
        )}
      </div>
      
      <Avatar 
        className="cursor-pointer hover:ring-2 hover:ring-[#00D2FF] transition-all duration-200" 
        onClick={onProfileClick}
      >
        <AvatarFallback className="bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white">
          <Settings className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

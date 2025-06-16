
import { Bot } from "lucide-react";

interface ChatHeaderProps {
  conversationTitle: string;
}

export const ChatHeader = ({ conversationTitle }: ChatHeaderProps) => {
  return (
    <div className="bg-[#1A2332] border-b border-[#2A3441] p-4 flex items-center shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-lg flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">SOS AI</h1>
        </div>
        {conversationTitle && (
          <>
            <span className="text-slate-400 text-lg">•</span>
            <span className="text-slate-300 font-medium">{conversationTitle}</span>
          </>
        )}
      </div>
    </div>
  );
};

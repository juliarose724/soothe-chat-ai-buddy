
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatAreaProps {
  conversationId: string | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatArea = ({ conversationId, messages, onSendMessage }: ChatAreaProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() && conversationId) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#051827] p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-2xl font-bold text-white">SOS</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to SOS AI</h2>
          <p className="text-[#B0C4D6] text-lg leading-relaxed">
            Start a new conversation to begin chatting with your AI mental health companion. 
            I'm here to listen and support you 24/7.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#051827]">
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-lg font-bold text-white">AI</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">How can I help you today?</h3>
              <p className="text-[#B0C4D6]">I'm here to provide support and listen to whatever is on your mind.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-lg px-6 py-4 rounded-2xl shadow-lg ${
                    message.isUser
                      ? "bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white"
                      : "bg-[#102B40] text-white border border-[#163447]"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className={`text-xs mt-2 ${message.isUser ? "text-white/70" : "text-[#B0C4D6]"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t border-[#163447] bg-[#102B40] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl py-4 px-6 pr-12 focus:border-[#00D2FF] focus:ring-1 focus:ring-[#00D2FF] text-sm"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 px-6 py-4"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

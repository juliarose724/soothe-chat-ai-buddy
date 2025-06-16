
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";

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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

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
      <div className="flex-1 flex flex-col items-center justify-center bg-[#0A1628] p-8">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Bot className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to SOS AI</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Your compassionate AI mental health companion is here to listen, 
            support, and guide you through whatever you're experiencing.
          </p>
          <div className="bg-[#1A2332] rounded-xl p-6 border border-[#2A3441]">
            <p className="text-slate-300 text-sm">
              Start a new conversation to begin your journey toward better mental health.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0A1628] min-h-0">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Bot className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">How can I help you today?</h3>
              <p className="text-slate-400 text-lg">I'm here to provide support and listen to whatever is on your mind.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div className="flex items-start gap-3 max-w-2xl">
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`px-6 py-4 rounded-2xl shadow-lg max-w-md ${
                      message.isUser
                        ? "bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] text-white ml-auto"
                        : "bg-[#1A2332] text-white border border-[#2A3441]"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div className={`text-xs mt-3 ${message.isUser ? "text-white/70" : "text-slate-400"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-medium">U</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="border-t border-[#2A3441] bg-[#1A2332] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                className="w-full bg-[#242B3A] border-[#3A4553] text-white placeholder:text-slate-400 rounded-xl py-4 px-6 text-sm focus:border-[#4A9EFF] focus:ring-1 focus:ring-[#4A9EFF] resize-none min-h-[52px] transition-all"
                style={{ minHeight: "52px" }}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] hover:from-[#5BA8FF] hover:to-[#8AE3C4] text-white rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed px-6 h-[52px] min-w-[52px]"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

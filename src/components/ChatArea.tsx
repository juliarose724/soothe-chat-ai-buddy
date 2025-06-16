
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage("");
    }
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#051827]">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-3xl font-bold text-white">Welcome to SOS AI</h2>
          <p className="text-[#B0C4D6] max-w-md">
            Start a new conversation to begin chatting with your AI mental health companion. 
            I'm here to listen and support you 24/7.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#051827]">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="bg-[#102B40] rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Hello! I'm SOS AI</h3>
                <p className="text-[#B0C4D6]">
                  I'm here to provide mental health support and a safe space to talk. 
                  How are you feeling today?
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-lg ${
                    message.isUser
                      ? "bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white"
                      : "bg-[#102B40] text-white"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                  <div className={`text-xs mt-2 ${message.isUser ? "text-blue-100" : "text-[#B0C4D6]"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-[#163447]">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex space-x-3 bg-[#163447] rounded-2xl p-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent border-none text-white placeholder:text-[#B0C4D6] focus:ring-0 focus:outline-none"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white rounded-xl hover:scale-105 transition-transform duration-200"
              disabled={!inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Plus, Settings, User } from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onProfileClick: () => void;
}

export const ChatSidebar = ({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onProfileClick,
}: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-[#1A2332] border-r border-[#2A3441] flex flex-col h-full shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-[#2A3441]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">SOS AI</h1>
            <p className="text-slate-400 text-sm">Mental Health Companion</p>
          </div>
        </div>
        
        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] hover:from-[#5BA8FF] hover:to-[#8AE3C4] text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium py-3 h-12"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Conversation
        </Button>
      </div>
      
      {/* Conversations */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-full flex items-center justify-center mx-auto mb-4 opacity-60">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <p className="text-slate-300 text-sm font-medium mb-2">No conversations yet</p>
              <p className="text-slate-400 text-xs leading-relaxed">Start a new chat to begin your<br />mental health journey</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <Button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                variant="ghost"
                className={`w-full justify-start p-4 rounded-xl text-left transition-all duration-200 hover:shadow-md group ${
                  activeConversationId === conversation.id
                    ? "bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] text-white shadow-lg hover:from-[#5BA8FF] hover:to-[#8AE3C4]"
                    : "text-slate-300 hover:bg-[#242B3A] hover:text-white"
                }`}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activeConversationId === conversation.id ? "bg-white" : "bg-slate-500"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate text-sm mb-1">{conversation.title}</div>
                    <div className={`text-xs opacity-70 ${
                      activeConversationId === conversation.id ? "text-white" : "text-slate-400"
                    }`}>
                      {conversation.timestamp.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
      
      {/* Profile Section */}
      <div className="p-4 border-t border-[#2A3441] bg-[#1A2332]">
        <Button
          onClick={onProfileClick}
          variant="ghost"
          className="w-full p-4 rounded-xl text-left hover:bg-[#242B3A] transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-slate-600 group-hover:ring-slate-500 transition-all">
              <AvatarFallback className="bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] text-white font-semibold">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">User Profile</p>
              <p className="text-slate-400 text-xs">Settings & Account</p>
            </div>
            <Settings className="h-4 w-4 text-slate-400 group-hover:text-slate-300 transition-colors" />
          </div>
        </Button>
      </div>
    </div>
  );
};

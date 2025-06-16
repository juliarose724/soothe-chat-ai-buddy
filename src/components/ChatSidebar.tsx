
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

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
}

export const ChatSidebar = ({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
}: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-[#102B40] border-r border-[#163447] flex flex-col h-full">
      <div className="p-4 border-b border-[#163447]">
        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#B0C4D6] text-sm">No conversations yet</p>
              <p className="text-[#B0C4D6] text-xs mt-1">Start a new chat to get support</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <Button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                variant="ghost"
                className={`w-full justify-start p-3 rounded-xl text-left transition-all duration-200 ${
                  activeConversationId === conversation.id
                    ? "bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white shadow-lg"
                    : "text-[#B0C4D6] hover:bg-[#163447] hover:text-white hover:shadow-md"
                }`}
              >
                <div className="truncate">
                  <div className="font-medium truncate">{conversation.title}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {conversation.timestamp.toLocaleDateString()}
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

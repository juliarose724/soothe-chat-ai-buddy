
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Plus, User, LogOut, Heart, Phone } from "lucide-react";

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
  onMoodTracker: () => void;
  onCrisisResources: () => void;
  onLogout: () => void;
}

export const ChatSidebar = ({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
  onProfileClick,
  onMoodTracker,
  onCrisisResources,
  onLogout,
}: ChatSidebarProps) => {
  return (
    <Sidebar className="w-72 border-r border-[#2A3441]">
      <SidebarHeader className="p-4 border-b border-[#2A3441]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">SOS AI</h1>
            <p className="text-slate-400 text-xs">Mental Health Companion</p>
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
        
        <Button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] hover:from-[#5BA8FF] hover:to-[#8AE3C4] text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium py-2.5 h-10"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 py-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onMoodTracker}
                  className="w-full justify-start p-3 rounded-lg text-left transition-all duration-200 hover:bg-[#242B3A] text-slate-300 hover:text-white"
                >
                  <Heart className="mr-3 h-4 w-4" />
                  <span className="text-sm font-medium">Mood Tracker</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onCrisisResources}
                  className="w-full justify-start p-3 rounded-lg text-left transition-all duration-200 hover:bg-[#242B3A] text-slate-300 hover:text-white"
                >
                  <Phone className="mr-3 h-4 w-4" />
                  <span className="text-sm font-medium">Crisis Resources</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 bg-[#2A3441]" />
        
        <SidebarGroup>
          <div className="px-4 py-2">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Conversations</h3>
          </div>
          <SidebarGroupContent>
            <ScrollArea className="flex-1 px-2">
              <div className="space-y-1">
                {conversations.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] rounded-full flex items-center justify-center mx-auto mb-3 opacity-60">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-slate-300 text-sm font-medium mb-1">No conversations yet</p>
                    <p className="text-slate-400 text-xs leading-relaxed">Start a new chat to begin your mental health journey</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <SidebarMenuItem key={conversation.id}>
                      <SidebarMenuButton
                        onClick={() => onSelectConversation(conversation.id)}
                        className={`w-full justify-start p-3 rounded-lg text-left transition-all duration-200 hover:shadow-sm group ${
                          activeConversationId === conversation.id
                            ? "bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] text-white shadow-md hover:from-[#5BA8FF] hover:to-[#8AE3C4]"
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
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </div>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t border-[#2A3441]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onProfileClick}
              className="w-full p-3 rounded-lg text-left hover:bg-[#242B3A] transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 ring-2 ring-slate-600 group-hover:ring-slate-500 transition-all">
                  <AvatarFallback className="bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] text-white font-semibold text-sm">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">Profile</p>
                  <p className="text-slate-400 text-xs">Settings & Account</p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              className="w-full p-3 rounded-lg text-left hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-slate-300"
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

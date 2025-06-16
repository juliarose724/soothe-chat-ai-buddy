
import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatArea } from "./ChatArea";
import { ProfileModal } from "./ProfileModal";
import { MoodTracker } from "./MoodTracker";
import { CrisisResources } from "./CrisisResources";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

interface ChatPageProps {
  onLogout?: () => void;
}

export const ChatPage = ({ onLogout }: ChatPageProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showCrisisResources, setShowCrisisResources] = useState(false);

  const generateAIResponse = (userMessage: string): string => {
    // Enhanced AI responses for mental health support
    const responses = [
      "I hear you, and I want you to know that what you're feeling is valid. Can you tell me more about what's been on your mind?",
      "Thank you for sharing that with me. It takes courage to open up. How long have you been feeling this way?",
      "I'm here to support you through this. What would be most helpful for you right now?",
      "That sounds really challenging. Remember that you're not alone in this. What coping strategies have you tried before?",
      "I appreciate you trusting me with your feelings. Let's work through this together. What's one small thing that might help you feel a bit better today?",
      "Your feelings matter, and so do you. Is there anything specific that triggered these feelings recently?",
      "It's okay to not be okay sometimes. Would you like to try a quick breathing exercise or grounding technique?",
      "I'm glad you reached out today. Taking this step shows real strength. How can I best support you right now?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateConversationTitle = (firstMessage: string): string => {
    const words = firstMessage.toLowerCase().split(' ');
    if (words.includes('stress') || words.includes('stressed')) return 'Stress Management';
    if (words.includes('anxiety') || words.includes('anxious')) return 'Anxiety Support';
    if (words.includes('sad') || words.includes('depression')) return 'Emotional Support';
    if (words.includes('sleep') || words.includes('tired')) return 'Sleep Concerns';
    if (words.includes('work') || words.includes('job')) return 'Work-Life Balance';
    if (words.includes('panic') || words.includes('overwhelmed')) return 'Crisis Support';
    return 'General Support';
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      timestamp: new Date(),
      messages: [],
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = (messageContent: string) => {
    if (!activeConversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: generateAIResponse(messageContent),
      isUser: false,
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        const isFirstMessage = conv.messages.length === 0;
        const updatedMessages = [...conv.messages, userMessage, aiMessage];
        return {
          ...conv,
          messages: updatedMessages,
          title: isFirstMessage ? generateConversationTitle(messageContent) : conv.title,
        };
      }
      return conv;
    }));
  };

  const handleLogout = () => {
    // Reset application state
    setConversations([]);
    setActiveConversationId(null);
    setIsProfileOpen(false);
    setShowMoodTracker(false);
    setShowCrisisResources(false);
    
    // Call the parent logout handler to navigate back to landing
    if (onLogout) {
      onLogout();
    }
  };

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-[#0A1628] flex w-full overflow-hidden">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onProfileClick={() => setIsProfileOpen(true)}
          onMoodTracker={() => setShowMoodTracker(true)}
          onCrisisResources={() => setShowCrisisResources(true)}
          onLogout={handleLogout}
        />
        
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <ChatHeader
            conversationTitle={activeConversation?.title || ""}
          />
          
          <ChatArea
            conversationId={activeConversationId}
            messages={activeConversation?.messages || []}
            onSendMessage={handleSendMessage}
          />
        </SidebarInset>
        
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <MoodTracker
          isOpen={showMoodTracker}
          onClose={() => setShowMoodTracker(false)}
        />

        <CrisisResources
          isOpen={showCrisisResources}
          onClose={() => setShowCrisisResources(false)}
        />
      </div>
    </SidebarProvider>
  );
};

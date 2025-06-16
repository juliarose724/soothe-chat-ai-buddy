
import { useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatArea } from "./ChatArea";
import { ProfileModal } from "./ProfileModal";

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

export const ChatPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const generateAIResponse = (userMessage: string): string => {
    // Simple AI response simulation - in real app this would call an AI service
    const responses = [
      "I hear you, and I want you to know that what you're feeling is valid. Can you tell me more about what's been on your mind?",
      "Thank you for sharing that with me. It takes courage to open up. How long have you been feeling this way?",
      "I'm here to support you through this. What would be most helpful for you right now?",
      "That sounds really challenging. Remember that you're not alone in this. What coping strategies have you tried before?",
      "I appreciate you trusting me with your feelings. Let's work through this together. What's one small thing that might help you feel a bit better today?",
      "Your feelings matter, and so do you. Is there anything specific that triggered these feelings recently?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateConversationTitle = (firstMessage: string): string => {
    // Simple title generation based on message content
    const words = firstMessage.toLowerCase().split(' ');
    if (words.includes('stress') || words.includes('stressed')) return 'Stress Management';
    if (words.includes('anxiety') || words.includes('anxious')) return 'Anxiety Support';
    if (words.includes('sad') || words.includes('depression')) return 'Emotional Support';
    if (words.includes('sleep') || words.includes('tired')) return 'Sleep Concerns';
    if (words.includes('work') || words.includes('job')) return 'Work-Life Balance';
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

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  return (
    <div className="min-h-screen bg-[#051827] flex">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewConversation={handleNewConversation}
        onSelectConversation={handleSelectConversation}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader
          conversationTitle={activeConversation?.title || ""}
          onProfileClick={() => setIsProfileOpen(true)}
        />
        
        <ChatArea
          conversationId={activeConversationId}
          messages={activeConversation?.messages || []}
          onSendMessage={handleSendMessage}
        />
      </div>
      
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};

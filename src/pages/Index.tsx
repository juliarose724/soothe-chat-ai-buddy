
import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AuthPage } from "@/components/AuthPage";
import { ChatPage } from "@/components/ChatPage";

type AppState = "landing" | "auth" | "chat";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");

  const handleStartTalking = () => {
    setAppState("auth");
  };

  const handleAuthSuccess = () => {
    setAppState("chat");
  };

  const handleLogout = () => {
    setAppState("landing");
  };

  return (
    <>
      {appState === "landing" && <LandingPage onStartTalking={handleStartTalking} />}
      {appState === "auth" && <AuthPage onAuthSuccess={handleAuthSuccess} />}
      {appState === "chat" && <ChatPage onLogout={handleLogout} />}
    </>
  );
};

export default Index;

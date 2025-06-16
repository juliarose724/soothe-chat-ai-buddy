
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!signInForm.email || !signInForm.password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Simulate authentication
    console.log("Sign in attempt:", signInForm);
    onAuthSuccess();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!signUpForm.email || !signUpForm.password || !signUpForm.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    // Simulate authentication
    console.log("Sign up attempt:", signUpForm);
    onAuthSuccess();
  };

  const handleGoogleAuth = () => {
    console.log("Google authentication");
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-[#051827] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#102B40] border-[#163447] animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">Welcome to SOS AI</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#163447]">
              <TabsTrigger value="signin" className="text-[#B0C4D6] data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D2FF] data-[state=active]:to-[#48FCCC]">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-[#B0C4D6] data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D2FF] data-[state=active]:to-[#48FCCC]">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-[#B0C4D6]">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-[#B0C4D6]">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
                    placeholder="Enter your password"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white rounded-xl hover:scale-105 transition-transform duration-200">
                  Sign In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-[#B0C4D6]">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-[#B0C4D6]">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
                    placeholder="Create a password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="text-[#B0C4D6]">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signUpForm.confirmPassword}
                    onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                    className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
                    placeholder="Confirm your password"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white rounded-xl hover:scale-105 transition-transform duration-200">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#163447]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#102B40] px-2 text-[#B0C4D6]">Or continue with</span>
              </div>
            </div>
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full mt-4 bg-transparent border-[#163447] text-[#B0C4D6] hover:bg-[#163447] hover:text-white rounded-xl"
            >
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

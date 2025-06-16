
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [profile, setProfile] = useState({
    name: "User",
    email: "user@example.com",
    about: "Tell us a bit about yourself..."
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    console.log("Saving profile:", profile);
    onClose();
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account");
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleGoogleAuth = () => {
    console.log("Google authentication");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A2332] border-[#2A3441] text-white max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Profile & Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-[#242B3A] border-[#3A4553] text-white placeholder:text-slate-400 rounded-xl focus:border-[#4A9EFF]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-[#242B3A] border-[#3A4553] text-white placeholder:text-slate-400 rounded-xl focus:border-[#4A9EFF]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="about" className="text-slate-300">About Me</Label>
              <Textarea
                id="about"
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                className="bg-[#242B3A] border-[#3A4553] text-white placeholder:text-slate-400 rounded-xl min-h-20 resize-none focus:border-[#4A9EFF]"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>
          
          <Separator className="bg-[#2A3441]" />
          
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] hover:from-[#5BA8FF] hover:to-[#8AE3C4] text-white rounded-xl transition-all duration-200 font-medium"
            >
              Save Changes
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-transparent border-2 border-[#3A4553] text-slate-300 hover:bg-[#242B3A] hover:text-white rounded-xl transition-colors duration-200"
            >
              Change Password
            </Button>
            
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>
          
          <Separator className="bg-[#2A3441]" />
          
          <div className="space-y-3">
            {!showDeleteConfirm ? (
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 rounded-xl font-medium"
              >
                Delete Account
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-red-400 text-center font-medium">
                  Are you sure? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1 bg-transparent border-2 border-[#3A4553] text-slate-300 hover:bg-[#242B3A] hover:text-white rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl font-medium"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

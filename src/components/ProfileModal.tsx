
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#102B40] border-[#163447] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Profile & Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#B0C4D6]">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#B0C4D6]">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="about" className="text-[#B0C4D6]">About Me</Label>
              <Textarea
                id="about"
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                className="bg-[#163447] border-[#163447] text-white placeholder:text-[#B0C4D6] rounded-xl min-h-20"
                placeholder="Tell us a bit about yourself..."
              />
            </div>
          </div>
          
          <Separator className="bg-[#163447]" />
          
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#00D2FF] to-[#48FCCC] text-white rounded-xl hover:scale-105 transition-transform duration-200"
            >
              Save Changes
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#163447] text-[#B0C4D6] hover:bg-[#163447] hover:text-white rounded-xl"
            >
              Change Password
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#163447] text-[#B0C4D6] hover:bg-[#163447] hover:text-white rounded-xl"
            >
              Continue with Google
            </Button>
          </div>
          
          <Separator className="bg-[#163447]" />
          
          <div className="space-y-3">
            {!showDeleteConfirm ? (
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 rounded-xl"
              >
                Delete Account
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-400 text-center">
                  Are you sure? This action cannot be undone.
                </p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1 bg-transparent border-[#163447] text-[#B0C4D6] hover:bg-[#163447] hover:text-white rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl"
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

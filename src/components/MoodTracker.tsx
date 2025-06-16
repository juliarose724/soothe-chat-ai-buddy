
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MoodTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const moods = [
  { emoji: "😊", label: "Great", value: 5, color: "bg-green-500" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-blue-500" },
  { emoji: "😐", label: "Okay", value: 3, color: "bg-yellow-500" },
  { emoji: "🙁", label: "Low", value: 2, color: "bg-orange-500" },
  { emoji: "😢", label: "Struggling", value: 1, color: "bg-red-500" },
];

export const MoodTracker = ({ isOpen, onClose }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (selectedMood !== null) {
      // In a real app, you would save this to a database
      console.log("Mood saved:", { mood: selectedMood, notes, timestamp: new Date() });
      setSelectedMood(null);
      setNotes("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A2332] border-[#2A3441] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center mb-6">
            How are you feeling today?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                  selectedMood === mood.value
                    ? "bg-gradient-to-br from-[#4A9EFF] to-[#7BDCB5] scale-105"
                    : "bg-[#242B3A] hover:bg-[#2A3441]"
                }`}
              >
                <span className="text-2xl mb-2">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              What's on your mind? (optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share any thoughts or feelings..."
              className="bg-[#242B3A] border-[#2A3441] text-white placeholder:text-slate-400 resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-[#2A3441] text-slate-300 hover:bg-[#242B3A]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={selectedMood === null}
              className="flex-1 bg-gradient-to-r from-[#4A9EFF] to-[#7BDCB5] hover:from-[#5BA8FF] hover:to-[#8AE3C4] text-white"
            >
              Save Mood
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

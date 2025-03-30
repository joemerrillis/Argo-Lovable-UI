
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface ChatInputFormProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatInputForm: React.FC<ChatInputFormProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 flex gap-2"
    >
      <Input
        placeholder="What would you like me to do?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        className="flex-grow bg-background text-white border-muted focus-visible:ring-argo-accent"
      />
      <Button 
        type="submit" 
        className="bg-argo-accent text-black hover:bg-argo-accent/90"
        disabled={isLoading || !input.trim()}
      >
        <Send size={18} />
      </Button>
    </form>
  );
};

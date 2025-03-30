
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, Cloud, Brain, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'argo';
  timestamp: Date;
}

export const HomePanel: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome back. I'm ready to assist you with your tasks. What would you like me to do today?",
      sender: 'argo',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Create and add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Show a "thinking" message
      const thinkingMessage: Message = {
        id: `thinking-${Date.now()}`,
        text: "I'm processing that request...",
        sender: 'argo',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, thinkingMessage]);

      // Call the new API endpoint
      const response = await fetch('https://api.argoassist.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'test-user', // Fixed test user as requested
          message: userMessage.text
        })
      });

      // Remove the thinking message
      setMessages(prev => prev.filter(msg => msg.id !== thinkingMessage.id));

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Process the successful response
      const data = await response.json();
      // Extract the message from different possible response formats
      const responseText = data?.reply_message || data?.data?.message || data?.data?.response || "I've received your message and am working on it.";
      
      // Add Argo's response
      const argoResponse: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: 'argo',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, argoResponse]);
      
      // Optional: store in Supabase memory
      try {
        await supabase.from('memory').insert({
          user_id: 'test-user',
          input: userMessage.text,
          response: responseText,
          source: 'ui'
        });
      } catch (memoryError) {
        console.error('Failed to store in memory:', memoryError);
        // Don't show error toast for memory storage failure
      }
      
    } catch (err) {
      console.error('Error in chat handling:', err);
      toast({
        title: "Communication Error",
        description: "There was a problem connecting to Argo's brain. Please try again.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to my services. Please try again in a moment.",
        sender: 'argo',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const panelItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="h-full flex flex-col overflow-hidden p-6">
      <motion.div 
        className="flex items-center justify-between mb-6"
        variants={panelItemVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <h1 className="text-3xl font-bold text-white">
          <span className="text-argo-accent">Argo</span> Assistant
        </h1>
        
        <div className="flex items-center space-x-3">
          <Badge className="bg-argo-accent text-black hover:bg-argo-accent/90 px-3 py-1">
            <Brain size={14} className="mr-1" /> Memory: ON
          </Badge>
          
          <Badge className="bg-muted text-white hover:bg-muted/90 px-3 py-1">
            <Cloud size={14} className="mr-1" /> Jersey City ☁️
          </Badge>
          
          <Badge className="bg-argo-secondary text-white hover:bg-argo-secondary/90 px-3 py-1">
            <Eye size={14} className="mr-1" /> Mode: Assistant
          </Badge>
        </div>
      </motion.div>

      <motion.div 
        className="flex-grow overflow-hidden flex flex-col"
        variants={panelItemVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <Card className="flex-grow bg-card/50 backdrop-blur-sm border-border overflow-hidden rounded-2xl shadow-lg">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-5 py-3 shadow-md",
                      message.sender === 'user' 
                        ? "bg-argo-accent text-black ml-12" 
                        : "bg-muted text-white mr-12"
                    )}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Separator className="bg-border" />
            
            <form 
              onSubmit={handleSendMessage} 
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { ChatHeader } from '../chat/ChatHeader';
import { ChatMessages } from '../chat/ChatMessages';
import { ChatInputForm } from '../chat/ChatInputForm';
import { Message } from '../chat/ChatMessage';

export const HomePanel: React.FC = () => {
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

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || isLoading) return;

    // Create and add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
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
          message: input
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

  return (
    <div className="h-full flex flex-col overflow-hidden p-6">
      <ChatHeader />

      <motion.div 
        className="flex-grow overflow-hidden flex flex-col"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.4, ease: "easeOut" } }
        }}
        initial="hidden"
        animate="visible"
      >
        <Card className="flex-grow bg-card/50 backdrop-blur-sm border-border overflow-hidden rounded-2xl shadow-lg">
          <CardContent className="p-0 h-full flex flex-col">
            <ChatMessages messages={messages} />
            
            <Separator className="bg-border" />
            
            <ChatInputForm onSendMessage={handleSendMessage} isLoading={isLoading} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

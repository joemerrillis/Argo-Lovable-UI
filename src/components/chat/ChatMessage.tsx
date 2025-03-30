
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'argo';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  return (
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
  );
};

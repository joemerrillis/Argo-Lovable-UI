
import React, { useEffect, useRef } from 'react';
import { ChatMessage, Message } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6">
      {messages.map((message, index) => (
        <ChatMessage key={message.id} message={message} index={index} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

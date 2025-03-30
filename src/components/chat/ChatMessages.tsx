
import React from 'react';
import { ChatMessage, Message } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto p-6 space-y-6">
      {messages.map((message, index) => (
        <ChatMessage key={message.id} message={message} index={index} />
      ))}
    </div>
  );
};

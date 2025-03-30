
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Brain, Cloud, Eye } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center justify-between mb-6"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
      }}
      initial="hidden"
      animate="visible"
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
  );
};

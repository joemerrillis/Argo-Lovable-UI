
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cloud, Search, CheckSquare, MessageSquare, Phone, Youtube, Settings, Check, AlertTriangle } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  status: 'active' | 'warning' | 'error';
  lastUsed?: Date;
}

export const ToolsPanel: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([
    {
      id: 'weather',
      name: 'Weather (Tomorrow.io)',
      description: 'Access real-time weather data and forecasts',
      icon: <Cloud className="h-5 w-5 text-blue-400" />,
      enabled: true,
      status: 'active',
      lastUsed: new Date('2023-10-15T10:30:00')
    },
    {
      id: 'perplexity',
      name: 'Perplexity Search',
      description: 'Advanced web search with summarization',
      icon: <Search className="h-5 w-5 text-green-400" />,
      enabled: true,
      status: 'active',
      lastUsed: new Date('2023-10-14T16:45:00')
    },
    {
      id: 'clickup',
      name: 'ClickUp Integration',
      description: 'Task management and project organization',
      icon: <CheckSquare className="h-5 w-5 text-purple-400" />,
      enabled: true,
      status: 'active',
      lastUsed: new Date('2023-10-13T09:15:00')
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send and receive messages from Slack workspace',
      icon: <MessageSquare className="h-5 w-5 text-yellow-400" />,
      enabled: true,
      status: 'warning',
      lastUsed: new Date('2023-10-12T14:20:00')
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'Send SMS and make voice calls',
      icon: <Phone className="h-5 w-5 text-red-400" />,
      enabled: false,
      status: 'error'
    },
    {
      id: 'youtube',
      name: 'YouTube Playlisting',
      description: 'Create and manage YouTube playlists',
      icon: <Youtube className="h-5 w-5 text-red-500" />,
      enabled: true,
      status: 'active',
      lastUsed: new Date('2023-10-10T19:30:00')
    }
  ]);

  const handleToggleTool = (id: string) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="h-full p-6 overflow-hidden flex flex-col">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white">
          <span className="text-argo-accent">Tools</span> & Integrations
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure and manage the tools that power Argo's capabilities
        </p>
      </motion.div>

      <ScrollArea className="flex-grow">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden h-full">
                <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      {tool.icon}
                      {tool.name}
                      
                      {tool.status === 'active' && tool.enabled && (
                        <Badge className="ml-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400">
                          <Check size={12} className="mr-1" /> Active
                        </Badge>
                      )}
                      
                      {tool.status === 'warning' && tool.enabled && (
                        <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 hover:text-yellow-400">
                          <AlertTriangle size={12} className="mr-1" /> Warning
                        </Badge>
                      )}
                      
                      {tool.status === 'error' && (
                        <Badge className="ml-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400">
                          <AlertTriangle size={12} className="mr-1" /> Error
                        </Badge>
                      )}
                    </CardTitle>
                    
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {tool.description}
                    </CardDescription>
                  </div>
                  
                  <Switch 
                    checked={tool.enabled} 
                    onCheckedChange={() => handleToggleTool(tool.id)}
                    className="data-[state=checked]:bg-argo-accent data-[state=checked]:text-black"
                  />
                </CardHeader>
                
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {tool.lastUsed ? (
                      <div className="flex items-center mt-2">
                        <span>Last used: {tool.lastUsed.toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    ) : (
                      <div className="flex items-center mt-2">
                        <span>Not used yet</span>
                      </div>
                    )}
                    
                    <Separator className="my-3 bg-border/50" />
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Settings size={12} className="mr-1" />
                        Configuration
                      </span>
                      <span className="text-argo-accent cursor-pointer hover:underline">
                        Manage
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

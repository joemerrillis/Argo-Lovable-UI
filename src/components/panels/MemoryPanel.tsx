
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Edit, ExternalLink, MessageSquare, Trash2, Clock } from 'lucide-react';

interface MemoryItem {
  id: string;
  title: string;
  snippet: string;
  timestamp: Date;
  type: 'query' | 'task' | 'conversation';
}

export const MemoryPanel: React.FC = () => {
  const memories: MemoryItem[] = [
    {
      id: '1',
      title: 'Weather forecast for the week',
      snippet: 'You asked for the weather forecast in Jersey City for the upcoming week.',
      timestamp: new Date('2023-10-15T10:30:00'),
      type: 'query'
    },
    {
      id: '2',
      title: 'Meeting preparation with Product team',
      snippet: 'Prepared agenda and key points for the Product team meeting on Thursday.',
      timestamp: new Date('2023-10-14T15:45:00'),
      type: 'task'
    },
    {
      id: '3',
      title: 'Research on AI deployment options',
      snippet: 'We discussed various hosting options for deploying the AI model, including Railway and Cloudflare Workers.',
      timestamp: new Date('2023-10-13T09:15:00'),
      type: 'conversation'
    },
    {
      id: '4',
      title: 'Email template for client outreach',
      snippet: 'Created an email template for reaching out to potential clients about the new service offering.',
      timestamp: new Date('2023-10-12T17:20:00'),
      type: 'task'
    },
    {
      id: '5',
      title: 'Stock market updates',
      snippet: 'You asked for updates on the tech stock market, focusing on AI companies.',
      timestamp: new Date('2023-10-11T11:05:00'),
      type: 'query'
    }
  ];

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
          <span className="text-argo-accent">Memory</span> Timeline
        </h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage your interaction history with Argo
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="flex-grow flex flex-col">
        <TabsList className="w-fit mb-4 bg-card">
          <TabsTrigger value="all">All Memories</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-grow mt-0">
          <ScrollArea className="h-full">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {memories.map((memory) => (
                <motion.div key={memory.id} variants={itemVariants}>
                  <Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden hover:shadow-md hover:border-argo-accent/50 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-medium">{memory.title}</CardTitle>
                        {memory.type === 'query' && <MessageSquare size={18} className="text-blue-400" />}
                        {memory.type === 'task' && <Clock size={18} className="text-green-400" />}
                        {memory.type === 'conversation' && <CalendarDays size={18} className="text-purple-400" />}
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        {memory.timestamp.toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{memory.snippet}</p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          <Edit size={14} className="mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          <ExternalLink size={14} className="mr-1" /> Convert
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="queries" className="flex-grow mt-0">
          <ScrollArea className="h-full">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {memories.filter(m => m.type === 'query').map((memory) => (
                <motion.div key={memory.id} variants={itemVariants}>
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-medium">{memory.title}</CardTitle>
                        <MessageSquare size={18} className="text-blue-400" />
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">
                        {memory.timestamp.toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{memory.snippet}</p>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          <Edit size={14} className="mr-1" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          <ExternalLink size={14} className="mr-1" /> Convert
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </TabsContent>

        {/* Similar structure for tasks and conversations tabs */}
        <TabsContent value="tasks" className="mt-0 flex-grow">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
              {memories.filter(m => m.type === 'task').map((memory) => (
                <Card key={memory.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{memory.title}</CardTitle>
                      <Clock size={18} className="text-green-400" />
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {memory.timestamp.toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{memory.snippet}</p>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <ExternalLink size={14} className="mr-1" /> Convert
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="conversations" className="mt-0 flex-grow">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
              {memories.filter(m => m.type === 'conversation').map((memory) => (
                <Card key={memory.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{memory.title}</CardTitle>
                      <CalendarDays size={18} className="text-purple-400" />
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {memory.timestamp.toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{memory.snippet}</p>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <ExternalLink size={14} className="mr-1" /> Convert
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

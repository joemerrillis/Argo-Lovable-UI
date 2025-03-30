
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomePanel } from '@/components/panels/HomePanel';
import { MemoryPanel } from '@/components/panels/MemoryPanel';
import { ToolsPanel } from '@/components/panels/ToolsPanel';
import { SentinelPanel } from '@/components/panels/SentinelPanel';
import { Shield, Brain, Wrench, Terminal, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-argo-background text-white overflow-hidden">
      {/* Sidebar */}
      <motion.div 
        className={cn(
          "h-screen flex flex-col bg-card border-r border-border p-2",
          isSidebarOpen ? "w-20" : "w-14"
        )}
        initial={false}
        animate={{ width: isSidebarOpen ? "5rem" : "3.5rem" }}
      >
        <div className="flex flex-col items-center gap-1 pt-4">
          <motion.button
            className="p-3 rounded-2xl hover:bg-muted transition-colors mb-6"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={22} className="text-argo-accent" />
          </motion.button>

          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
            <TabsList className="flex flex-col items-center gap-1 bg-transparent border-none p-0">
              <TabsTrigger
                value="home"
                className={cn(
                  "w-full flex justify-center p-3 rounded-2xl hover:bg-muted transition-colors",
                  activeTab === "home" && "bg-muted text-argo-accent"
                )}
              >
                <Terminal size={22} />
              </TabsTrigger>

              <TabsTrigger
                value="memory"
                className={cn(
                  "w-full flex justify-center p-3 rounded-2xl hover:bg-muted transition-colors",
                  activeTab === "memory" && "bg-muted text-argo-accent"
                )}
              >
                <Brain size={22} />
              </TabsTrigger>

              <TabsTrigger
                value="tools"
                className={cn(
                  "w-full flex justify-center p-3 rounded-2xl hover:bg-muted transition-colors",
                  activeTab === "tools" && "bg-muted text-argo-accent"
                )}
              >
                <Wrench size={22} />
              </TabsTrigger>

              <TabsTrigger
                value="sentinel"
                className={cn(
                  "w-full flex justify-center p-3 rounded-2xl hover:bg-muted transition-colors",
                  activeTab === "sentinel" && "bg-muted text-argo-accent"
                )}
              >
                <Shield size={22} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-grow overflow-hidden">
        <Tabs 
          value={activeTab} 
          className="h-full"
          onValueChange={setActiveTab}
        >
          <div className="w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === "home" && (
                <motion.div
                  key="home"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full"
                >
                  <TabsContent value="home" className="m-0 h-full">
                    <HomePanel />
                  </TabsContent>
                </motion.div>
              )}

              {activeTab === "memory" && (
                <motion.div
                  key="memory"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full"
                >
                  <TabsContent value="memory" className="m-0 h-full">
                    <MemoryPanel />
                  </TabsContent>
                </motion.div>
              )}

              {activeTab === "tools" && (
                <motion.div
                  key="tools"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full"
                >
                  <TabsContent value="tools" className="m-0 h-full">
                    <ToolsPanel />
                  </TabsContent>
                </motion.div>
              )}

              {activeTab === "sentinel" && (
                <motion.div
                  key="sentinel"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-full"
                >
                  <TabsContent value="sentinel" className="m-0 h-full">
                    <SentinelPanel />
                  </TabsContent>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

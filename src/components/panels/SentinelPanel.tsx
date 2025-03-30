
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Database, Lock, ShieldAlert, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export const SentinelPanel: React.FC = () => {
  const [dataProtectionLevel, setDataProtectionLevel] = useState(70);

  // Sample data for the panel
  const dataCategories = [
    { name: 'Personal Information', count: 16, risk: 'high' },
    { name: 'Browsing History', count: 45, risk: 'medium' },
    { name: 'App Usage Data', count: 23, risk: 'low' },
    { name: 'Connected Services', count: 8, risk: 'medium' },
    { name: 'Calendar Events', count: 37, risk: 'low' },
  ];

  const connectedServices = [
    { name: 'Supabase', status: 'connected', lastSync: '2 minutes ago' },
    { name: 'n8n', status: 'connected', lastSync: '15 minutes ago' },
    { name: 'Cloudflare', status: 'connected', lastSync: '1 hour ago' },
    { name: 'ClickUp', status: 'connected', lastSync: '3 hours ago' },
    { name: 'Railway', status: 'connected', lastSync: '1 day ago' },
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
          <span className="text-argo-accent">Sentinel</span> Control
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your data privacy, security settings, and connected services
        </p>
      </motion.div>

      <Tabs defaultValue="data" className="flex-grow flex flex-col">
        <TabsList className="w-fit mb-4 bg-card">
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Controls</TabsTrigger>
          <TabsTrigger value="services">Connected Services</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-grow">
          <TabsContent value="data" className="mt-0">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <Database className="mr-2 h-5 w-5 text-argo-accent" />
                      Data Storage Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-2 flex-1">
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Data Protection Level</span>
                          <span className="text-argo-accent">{dataProtectionLevel}%</span>
                        </div>
                        <Progress value={dataProtectionLevel} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Your data is encrypted and stored securely. Regular automatic backups are enabled.
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="bg-argo-secondary hover:bg-argo-secondary/90">
                          <Lock className="mr-2 h-4 w-4" /> Encrypt All Data
                        </Button>
                        <Button variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Purge Memory
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {dataCategories.map((category, index) => (
                <motion.div key={`data-${index}`} variants={itemVariants}>
                  <Card className={`bg-card/50 backdrop-blur-sm border-${
                    category.risk === 'high' ? 'red-500/50' : 
                    category.risk === 'medium' ? 'yellow-500/50' : 
                    'border'
                  }`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {category.count} entries
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {category.risk === 'high' && (
                            <span className="flex items-center text-red-400 text-xs">
                              <AlertCircle className="mr-1 h-3 w-3" />
                              High sensitivity
                            </span>
                          )}
                          {category.risk === 'medium' && (
                            <span className="flex items-center text-yellow-400 text-xs">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Medium sensitivity
                            </span>
                          )}
                          {category.risk === 'low' && (
                            <span className="flex items-center text-green-400 text-xs">
                              <Lock className="mr-1 h-3 w-3" />
                              Low sensitivity
                            </span>
                          )}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <motion.div 
              className="grid grid-cols-1 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <ShieldAlert className="mr-2 h-5 w-5 text-argo-accent" />
                      Privacy Shield Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          Memory Retention
                        </span>
                        <Button variant="outline" size="sm">
                          30 Days
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <EyeOff className="mr-2 h-4 w-4" />
                          Smoke Shield Mode
                        </span>
                        <Button variant="outline" size="sm" className="bg-card">
                          Enable
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="flex items-center">
                            <Lock className="mr-2 h-4 w-4" />
                            End-to-End Encryption
                          </span>
                          <span className="text-xs text-muted-foreground block mt-1 ml-6">
                            All communications are encrypted in transit and at rest
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="bg-card text-green-400" disabled>
                          Active
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted rounded-2xl">
                      <h3 className="text-sm font-medium mb-2">About Smoke Shield Mode</h3>
                      <p className="text-xs text-muted-foreground">
                        When activated, Smoke Shield temporarily scrambles your memory and data connections, 
                        making them unreadable even to Argo. Use this in high-risk situations or when privacy 
                        is paramount. All data will be restored when deactivated.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Data Sharing Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm">API Data Flow</h3>
                          <p className="text-xs text-muted-foreground">Control how data flows between integrated services</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm">Third Party Access</h3>
                          <p className="text-xs text-muted-foreground">Manage which external services can access your data</p>
                        </div>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="services" className="mt-0">
            <motion.div 
              className="grid grid-cols-1 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {connectedServices.map((service, index) => (
                <motion.div key={`service-${index}`} variants={itemVariants}>
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader className="pb-3 pt-4 px-4">
                      <CardTitle className="text-base font-medium flex items-center justify-between">
                        <span>{service.name}</span>
                        <span className={`text-xs font-normal px-2 py-1 rounded-full ${
                          service.status === 'connected' ? 'bg-green-500/20 text-green-400' : 
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {service.status}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4 px-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Last synced: {service.lastSync}
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              <motion.div variants={itemVariants}>
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">API Flow Diagram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center p-4 gap-4">
                      {/* This is a simplified API flow diagram */}
                      <div className="w-full p-6 bg-background/50 rounded-2xl flex flex-col items-center space-y-4">
                        <div className="px-4 py-2 border border-argo-accent/50 rounded-lg text-argo-accent">
                          User Interface (Cloudflare)
                        </div>
                        <div className="h-6 w-px bg-muted-foreground"></div>
                        <div className="px-4 py-2 border border-muted-foreground rounded-lg text-white">
                          API Bridge (api.argoassist.com)
                        </div>
                        <div className="grid grid-cols-3 gap-4 w-full mt-2">
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-px bg-muted-foreground"></div>
                            <div className="px-3 py-2 border border-blue-500/50 rounded-lg text-blue-400 text-sm">
                              Railway
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-px bg-muted-foreground"></div>
                            <div className="px-3 py-2 border border-purple-500/50 rounded-lg text-purple-400 text-sm">
                              n8n
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="h-6 w-px bg-muted-foreground"></div>
                            <div className="px-3 py-2 border border-green-500/50 rounded-lg text-green-400 text-sm">
                              Supabase
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="mt-4 bg-argo-accent text-black hover:bg-argo-accent/90">
                        View Detailed Diagram
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  AlertCircle, 
  BarChart2, 
  BriefcaseIcon, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  MessageSquareIcon, 
  TrendingUp 
} from 'lucide-react'

// Mock data for visualization
const agentActivity = [
  { id: 1, agent: 'Job Scout', status: 'active', tasks: 3, color: 'bg-ai-teal' },
  { id: 2, agent: 'Proposal Specialist', status: 'completed', tasks: 2, color: 'bg-quantum-blue' },
  { id: 3, agent: 'Interview Negotiator', status: 'idle', tasks: 0, color: 'bg-neural-purple' },
]

const recentJobs = [
  { id: 'job1', title: 'Full Stack Developer Needed', status: 'matched', date: '2h ago', description: 'Looking for a React and Node.js expert...' },
  { id: 'job2', title: 'Python Data Scientist', status: 'applied', date: '5h ago', description: 'Machine learning project using TensorFlow...' },
  { id: 'job3', title: 'Frontend UI/UX Developer', status: 'matched', date: '1d ago', description: 'Redesigning an e-commerce platform...' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header with metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card glass className="holographic-overlay">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Jobs Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">24</div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-ai-teal/10">
                <BriefcaseIcon className="w-5 h-5 text-ai-teal" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-ai-teal" />
              <span>+5 since yesterday</span>
            </div>
          </CardContent>
        </Card>
        
        <Card glass className="holographic-overlay">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Proposals Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">7</div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-quantum-blue/10">
                <BarChart2 className="w-5 h-5 text-quantum-blue" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1 text-quantum-blue" />
              <span>3 with responses</span>
            </div>
          </CardContent>
        </Card>
        
        <Card glass className="holographic-overlay">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-neural-purple/10">
                <MessageSquareIcon className="w-5 h-5 text-neural-purple" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <Clock className="w-3 h-3 mr-1 text-neural-purple" />
              <span>Next in 3 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Multi-agent activity visualization */}
      <Card glass>
        <CardHeader>
          <CardTitle>Multi-Agent Activity</CardTitle>
          <CardDescription>Real-time visualization of agent interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 w-full">
            {/* Visualization container - would be replaced with actual Three.js canvas */}
            <div className="absolute inset-0 rounded-md overflow-hidden glass-panel">
              {/* Neural network connections */}
              <svg className="absolute inset-0 w-full h-full z-0">
                <line x1="20%" y1="30%" x2="40%" y2="60%" className="neural-connection" strokeWidth="1" />
                <line x1="40%" y1="60%" x2="80%" y2="40%" className="neural-connection" strokeWidth="1" />
                <line x1="80%" y1="40%" x2="60%" y2="20%" className="neural-connection" strokeWidth="1" />
                <line x1="60%" y1="20%" x2="20%" y2="30%" className="neural-connection" strokeWidth="1" />
                <line x1="40%" y1="60%" x2="60%" y2="70%" className="neural-connection" strokeWidth="1" />
              </svg>
              
              {/* Agent nodes */}
              {agentActivity.map((agent, i) => (
                <motion.div 
                  key={agent.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.1 * i 
                  }}
                  className={`absolute ${agent.color} rounded-full p-3 agent-glow`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      {agent.status === 'active' ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      ) : agent.status === 'idle' ? (
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      ) : (
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="absolute -bottom-8 whitespace-nowrap text-xs">
                      {agent.agent}
                    </div>
                    {agent.tasks > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                        {agent.tasks}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Button variant="outline" size="sm">
              View Agent Details
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent jobs and actions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card glass className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Job Matches</CardTitle>
            <CardDescription>Jobs that match your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="p-3 rounded-md glass-panel hover:bg-white/5 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{job.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">{job.date}</span>
                      {job.status === 'matched' ? (
                        <div className="ml-2 text-xs bg-ai-teal/20 text-ai-teal px-2 py-0.5 rounded-full">Matched</div>
                      ) : (
                        <div className="ml-2 text-xs bg-quantum-blue/20 text-quantum-blue px-2 py-0.5 rounded-full">Applied</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View Details <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">View All Jobs</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card glass className="md:col-span-2">
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Updates and alerts from agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-md glass-panel">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile Optimization Recommended</p>
                    <p className="text-xs text-muted-foreground">Add more portfolio items to increase match rate</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-md glass-panel">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-ai-teal" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Proposal Successfully Sent</p>
                    <p className="text-xs text-muted-foreground">Full Stack Developer position at TechCo</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-md glass-panel">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Clock className="w-5 h-5 text-quantum-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Interview Scheduled</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 3:00 PM with GlobalTech Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
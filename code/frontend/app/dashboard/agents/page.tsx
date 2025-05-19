"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Brain, Search, FileText } from 'lucide-react'

const mockAgents = [
  {
    name: 'Job Scout',
    description: 'Finds relevant jobs based on your profile and preferences.',
    icon: <Search className="w-6 h-6 text-ai-teal" />,
    status: 'Active',
  },
  {
    name: 'Proposal Writer',
    description: 'Generates tailored proposals for each job using your profile.',
    icon: <FileText className="w-6 h-6 text-quantum-blue" />,
    status: 'Active',
  },
  {
    name: 'Profile Optimizer',
    description: 'Suggests improvements to your freelancer profile.',
    icon: <Brain className="w-6 h-6 text-neural-purple" />,
    status: 'Active',
  },
]

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agents</h1>
      <p className="text-muted-foreground mb-4">Meet your multi-agent team. Each agent specializes in a part of your Upwork workflow.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAgents.map((agent, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              {agent.icon}
              <CardTitle>{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{agent.description}</p>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">{agent.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
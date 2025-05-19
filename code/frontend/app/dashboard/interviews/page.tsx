"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, User, Video } from 'lucide-react'

const mockInterviews = [
  {
    job: 'Data Scientist - Climate Analytics',
    company: 'SparkClimate Pakistan',
    date: '2024-07-10',
    time: '10:00 AM',
    mode: 'Video',
    status: 'Scheduled',
  },
  {
    job: 'Machine Learning Intern',
    company: 'Cplus Soft',
    date: '2024-07-15',
    time: '2:00 PM',
    mode: 'Video',
    status: 'Scheduled',
  },
  {
    job: 'Data Engineer',
    company: 'Bitgrit Inc',
    date: '2024-06-01',
    time: '11:00 AM',
    mode: 'Video',
    status: 'Completed',
  },
]

export default function InterviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Interviews</h1>
      <p className="text-muted-foreground mb-4">Track your upcoming and past interviews with clients.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInterviews.map((interview, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Video className="w-6 h-6 text-ai-teal" />
              <CardTitle>{interview.job}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-1">{interview.company}</p>
              <div className="flex items-center gap-2 text-sm mb-1">
                <Calendar className="w-4 h-4" />
                <span>{interview.date} at {interview.time}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <User className="w-4 h-4" />
                <span>{interview.mode} Interview</span>
                <span className={`ml-2 px-2 py-1 rounded-full ${interview.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{interview.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
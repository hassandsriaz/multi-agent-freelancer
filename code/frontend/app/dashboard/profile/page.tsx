"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Plus, Save, Sparkles, Trash2, Upload, User } from 'lucide-react'
import { userProfile } from '@/lib/profile'

export default function ProfilePage() {
  const [profile, setProfile] = useState(userProfile)
  const [editing, setEditing] = useState<string | null>(null)
  const [optimizationLoading, setOptimizationLoading] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<string | null>(null)
  
  const handleOptimizeProfile = () => {
    setOptimizationLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setOptimizationResults(`# Profile Optimization Suggestions

## Professional Title
Change "Senior Full-Stack Developer" to "Senior Full-Stack Engineer | React & Node.js Expert"

## Summary Improvements
Your summary could highlight more specific achievements. Consider: "Full-stack developer with 7+ years of experience building high-performance web applications. Specialized in React, Node.js, and Python with a track record of reducing load times by 60% and implementing scalable architectures that support 100K+ users."

## Skills Suggestions
Consider adding these trending skills if you have experience with them:
- Next.js
- TailwindCSS
- CI/CD Pipelines
- Kubernetes
- WebSockets

## Experience Description Enhancements
Make your experience more achievement-oriented. For example:
- "Reduced API response times by 65% through query optimization and caching strategies"
- "Implemented CI/CD pipeline that reduced deployment times from hours to minutes"
- "Led a team of 4 developers to deliver a major feature that increased user engagement by 25%"

## Hourly Rate Analysis
Based on your skills and experience, your current rate ($65/hr) is slightly below market. Consider increasing to $75-80/hr for new clients.`);
      setOptimizationLoading(false)
    }, 2000);
  }
  
  const handleEditField = (field: string) => {
    setEditing(field)
  }
  
  const handleSaveField = () => {
    setEditing(null)
  }
  
  const handleAddSkill = (newSkill: string) => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill]
      })
    }
  }
  
  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">Manage your freelancer profile and optimization</p>
        </div>
        <Button variant="teal" onClick={handleOptimizeProfile} disabled={optimizationLoading}>
          <Sparkles className="mr-2 h-4 w-4" />
          <span>{optimizationLoading ? "Optimizing..." : "AI Optimize Profile"}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Profile Info */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-ai-teal/20 via-quantum-blue/20 to-neural-purple/20"></div>
            <div className="relative px-6">
              <div className="absolute -top-12 left-6 w-24 h-24 rounded-full bg-secondary border-4 border-card flex items-center justify-center">
                <User className="h-12 w-12 text-muted-foreground/70" />
              </div>
            </div>
            <CardContent className="pt-14">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <p className="text-muted-foreground font-medium">Data Scientist / Data Engineer</p>
                <div className="mt-4 grid grid-cols-1 gap-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Education</p>
                    <p className="font-medium">
                      {profile.education[0].degree} @ {profile.education[0].institution} ({profile.education[0].graduation})
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(skill => (
                  <div key={skill} className="px-3 py-1 rounded-full bg-secondary text-xs">
                    {skill}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.programming.map(lang => (
                  <div key={lang} className="px-3 py-1 rounded-full bg-secondary/70 text-xs">
                    {lang}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.frameworks.map(fw => (
                  <div key={fw} className="px-3 py-1 rounded-full bg-secondary/50 text-xs">
                    {fw}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.databases.map(db => (
                  <div key={db} className="px-3 py-1 rounded-full bg-secondary/30 text-xs">
                    {db}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interest => (
                  <div key={interest} className="px-3 py-1 rounded-full bg-secondary/20 text-xs">
                    {interest}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Profile Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-secondary">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-quantum-blue/20 border border-quantum-blue"></div>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{exp.period}</div>
                    </div>
                    <ul className="mt-2 text-sm list-disc ml-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.projects.map((proj, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-secondary">
                    <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-ai-teal/20 border border-ai-teal"></div>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{proj.name}</h3>
                        <p className="text-muted-foreground">{proj.period}</p>
                      </div>
                    </div>
                    <ul className="mt-2 text-sm list-disc ml-4">
                      {proj.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground">{edu.institution} • {edu.location}</p>
                      <p className="text-xs text-muted-foreground">Relevant Coursework: {edu.coursework?.join(', ')}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{edu.graduation}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {optimizationResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-ai-teal glass holographic-overlay">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-ai-teal" />
                    AI Profile Optimization
                  </CardTitle>
                  <CardDescription>
                    Automatically generated suggestions to improve your profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-card/50 rounded-md p-4 font-mono text-sm whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {optimizationResults}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="teal" className="w-full">
                    Apply Optimizations
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp, Copy, Edit, Eye, FileText, Send, Sparkles, Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

// Mock proposal data
const mockProposals = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Senior React Developer for Fintech App',
    clientName: 'FinanceWorks Inc.',
    coverLetter: `Dear FinanceWorks Inc.,

I'm excited to apply for the Senior React Developer position. With over 7 years of experience building React applications and a strong background in fintech, I believe I'm an excellent match for your needs.

My recent work includes developing a real-time financial dashboard for a trading platform that processes millions of data points with minimal latency. I used React with TypeScript, Redux for state management, and D3.js for data visualization.

I'd love to discuss how my experience with complex financial UIs and performance optimization can benefit your project.

Best regards,
John Developer`,
    rate: 65,
    status: 'draft',
    createdAt: new Date('2023-11-25'),
    lastEdited: new Date('2023-11-26'),
    aiScore: 92,
  },
  {
    id: '2',
    jobId: '2',
    jobTitle: 'Full Stack Developer with Node.js and React',
    clientName: 'ShopMaster',
    coverLetter: `Hello ShopMaster team,

I'm writing to express my interest in your Full Stack Developer position. As a developer with 5+ years of experience in both Node.js and React, I've built several e-commerce platforms with features similar to what you're looking for.

Most recently, I developed a complete online marketplace that integrates Stripe for payments and various shipping APIs. The platform handles 10,000+ daily transactions and has a responsive React frontend that's optimized for both desktop and mobile.

I'm particularly interested in your project because of my background in e-commerce and payment systems integration.

Looking forward to discussing your project further,
John Developer`,
    rate: 55,
    status: 'submitted',
    createdAt: new Date('2023-11-20'),
    submittedAt: new Date('2023-11-21'),
    aiScore: 95,
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'Python Data Scientist for Machine Learning Project',
    clientName: 'DataAnalytica',
    coverLetter: `Hello DataAnalytica,

I'm applying for your Python Data Scientist position. While my primary expertise is in web development, I've completed several machine learning projects using Python and TensorFlow.

My experience includes building customer prediction models using scikit-learn and analyzing large datasets with pandas. I've also worked with Jupyter notebooks for data visualization and exploration.

I'm eager to learn more about your specific project requirements and how I can contribute.

Best,
John Developer`,
    rate: 50,
    status: 'draft',
    createdAt: new Date('2023-11-24'),
    lastEdited: new Date('2023-11-24'),
    aiScore: 78,
  },
]

export default function ProposalsPage() {
  const [activeProposal, setActiveProposal] = useState(mockProposals[0])
  const [editMode, setEditMode] = useState(false)
  const [coverLetter, setCoverLetter] = useState(activeProposal.coverLetter)
  const [rate, setRate] = useState(activeProposal.rate)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()
  
  const handleSaveProposal = () => {
    // In a real app, this would make an API call
    setActiveProposal({
      ...activeProposal,
      coverLetter,
      rate,
      lastEdited: new Date(),
    })
    setEditMode(false)
  }
  
  const handleGenerateProposal = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: activeProposal.jobId,
          jobTitle: activeProposal.jobTitle,
          clientName: activeProposal.clientName,
          rate: rate,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate proposal')
      }

      const data = await response.json()
      setCoverLetter(data.coverLetter)
      setActiveProposal({
        ...activeProposal,
        coverLetter: data.coverLetter,
        aiScore: data.aiScore,
        lastEdited: new Date(),
      })
      
      toast({
        title: "Proposal Generated",
        description: "Your AI-generated proposal is ready!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImproveProposal = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/proposals/improve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: activeProposal.jobId,
          currentProposal: coverLetter,
          jobTitle: activeProposal.jobTitle,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to improve proposal')
      }

      const data = await response.json()
      setCoverLetter(data.improvedProposal)
      setActiveProposal({
        ...activeProposal,
        coverLetter: data.improvedProposal,
        aiScore: data.aiScore,
        lastEdited: new Date(),
      })
      
      toast({
        title: "Proposal Improved",
        description: "Your proposal has been enhanced by AI!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Proposal Management</h1>
          <p className="text-muted-foreground">Create and manage your job proposals</p>
        </div>
        <Button 
          variant="cyber" 
          onClick={handleGenerateProposal}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          <span>{isGenerating ? 'Generating...' : 'New AI Proposal'}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proposals List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Proposals</CardTitle>
              <CardDescription>
                {mockProposals.length} total proposals
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockProposals.map((proposal) => (
                  <div 
                    key={proposal.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-secondary/30 ${
                      activeProposal.id === proposal.id ? 'bg-secondary/50' : ''
                    }`}
                    onClick={() => {
                      if (!editMode || confirm('Discard changes?')) {
                        setActiveProposal(proposal)
                        setCoverLetter(proposal.coverLetter)
                        setRate(proposal.rate)
                        setEditMode(false)
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{proposal.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{proposal.clientName}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        proposal.status === 'draft' 
                          ? 'bg-yellow-500/20 text-yellow-500' 
                          : 'bg-green-500/20 text-green-500'
                      }`}>
                        {proposal.status === 'draft' ? 'Draft' : 'Submitted'}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>AI Score: {proposal.aiScore}%</span>
                      <span>
                        {proposal.status === 'draft' 
                          ? `Last edited: ${formatDate(proposal.lastEdited)}` 
                          : `Submitted: ${formatDate(proposal.submittedAt!)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Proposal Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <ArrowUp className="h-4 w-4 text-ai-teal flex-shrink-0" />
                  <span>Personalize each proposal to the job requirements</span>
                </li>
                <li className="flex gap-2">
                  <ArrowUp className="h-4 w-4 text-ai-teal flex-shrink-0" />
                  <span>Include relevant experience and examples</span>
                </li>
                <li className="flex gap-2">
                  <ArrowUp className="h-4 w-4 text-ai-teal flex-shrink-0" />
                  <span>Keep your proposal concise and to the point</span>
                </li>
                <li className="flex gap-2">
                  <ArrowDown className="h-4 w-4 text-destructive flex-shrink-0" />
                  <span>Avoid generic templates that feel impersonal</span>
                </li>
                <li className="flex gap-2">
                  <ArrowDown className="h-4 w-4 text-destructive flex-shrink-0" />
                  <span>Don't underbid significantly below your worth</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Proposal Editor/Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div>
                <CardTitle>{activeProposal.jobTitle}</CardTitle>
                <CardDescription>
                  {activeProposal.clientName} • {formatDate(activeProposal.createdAt)}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {editMode ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                    <Button variant="teal" size="sm" onClick={handleSaveProposal}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleImproveProposal}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Improve with AI
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-semibold">${editMode ? (
                      <input
                        type="number"
                        className="w-16 bg-secondary rounded px-2 py-1"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                      />
                    ) : rate}/hr</span>
                    <span className="text-xs text-muted-foreground">USD</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">AI Score</p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-secondary/50 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-ai-teal" 
                        style={{ width: `${activeProposal.aiScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{activeProposal.aiScore}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Cover Letter</p>
                <div className="bg-secondary/30 rounded-lg p-4 min-h-[300px] font-mono text-sm whitespace-pre-wrap">
                  {editMode ? (
                    <textarea
                      className="w-full h-[300px] bg-transparent resize-none focus:outline-none"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                    />
                  ) : (
                    coverLetter
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
              
              <div>
                {activeProposal.status === 'draft' && (
                  <Button variant="quantum">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Proposal
                  </Button>
                )}
                {activeProposal.status === 'submitted' && (
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Submission
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glass className="holographic-overlay overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI Enhancement Tools</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2 py-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Tailor to Job
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Add Portfolio Links
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Professional Tone
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Concise Version
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 
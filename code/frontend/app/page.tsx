"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, BriefcaseIcon, FileTextIcon, MessageSquare, Settings } from 'lucide-react'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
      <header className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-10 h-10 rounded-full bg-ai-teal flex items-center justify-center agent-glow"
            >
              <Brain className="w-6 h-6 text-black" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold gradient-text"
            >
              Upwork Multi-Agent Platform
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/dashboard">
              <Button variant="teal">
                Launch Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Job Scout Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('job-scout')}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Link href="/dashboard/jobs">
            <Card glass={true} className={`h-full transition-all duration-300 ${hoveredCard === 'job-scout' ? 'border-ai-teal' : ''}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-ai-teal/20 flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-ai-teal" />
                  </div>
                  <CardTitle>Job Scout</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Discover perfect job matches with AI-powered job searching that understands your skills and preferences.</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-sm text-ai-teal">Find opportunities →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Proposal Specialist Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('proposal')}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Link href="/dashboard/proposals">
            <Card glass={true} className={`h-full transition-all duration-300 ${hoveredCard === 'proposal' ? 'border-quantum-blue' : ''}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-quantum-blue/20 flex items-center justify-center">
                    <FileTextIcon className="w-5 h-5 text-quantum-blue" />
                  </div>
                  <CardTitle>Proposal Specialist</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Generate tailored, compelling proposals that highlight your strengths and increase your win rate.</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-sm text-quantum-blue">Craft proposals →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Interview Negotiator Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('negotiator')}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Link href="/dashboard/interviews">
            <Card glass={true} className={`h-full transition-all duration-300 ${hoveredCard === 'negotiator' ? 'border-neural-purple' : ''}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neural-purple/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-neural-purple" />
                  </div>
                  <CardTitle>Interview Negotiator</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>Navigate client interviews with confidence and secure better rates with AI-assisted negotiation.</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-sm text-neural-purple">Prepare interviews →</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Settings/Profile Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          onHoverStart={() => setHoveredCard('settings')}
          onHoverEnd={() => setHoveredCard(null)}
          className="md:col-span-2 lg:col-span-3"
        >
          <Link href="/dashboard/profile">
            <Card glass={true} className={`transition-all duration-300 ${hoveredCard === 'settings' ? 'border-white/30' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <p className="font-medium">Configure your profile and settings to optimize the multi-agent system</p>
                  <div className="ml-auto">
                    <span className="text-sm text-muted-foreground">Manage settings →</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-8 text-center text-sm text-muted-foreground"
      >
        <p>&copy; {new Date().getFullYear()} Upwork Multi-Agent System</p>
      </motion.footer>
    </div>
  )
} 
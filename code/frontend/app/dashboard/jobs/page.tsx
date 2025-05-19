"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, BriefcaseIcon, Calendar, DollarSign, ArrowRight, Star, StarOff, Clock, Loader2 } from 'lucide-react'
import { formatDate, truncate } from '@/lib/utils'
import { cn } from '@/lib/utils'

// Mock job data 
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer for Fintech App',
    description: 'We are looking for a senior React developer with 5+ years of experience to help build our financial dashboard application. Experience with data visualization libraries like D3.js or recharts is a plus.',
    budget: '$50-70/hr',
    skills: ['React', 'TypeScript', 'Redux', 'D3.js'],
    postedOn: new Date('2023-11-25'),
    clientName: 'FinanceWorks Inc.',
    clientCountry: 'United States',
    clientRating: 4.8,
    jobSuccess: '95%',
    workload: 'Full-time',
    relevance: 98,
  },
  {
    id: '2',
    title: 'Full Stack Developer with Node.js and React',
    description: 'We need a full stack developer to build a new e-commerce platform using Node.js and React. The ideal candidate will have experience with payment gateways and shipping API integrations.',
    budget: '$40-60/hr',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    postedOn: new Date('2023-11-26'),
    clientName: 'ShopMaster',
    clientCountry: 'Canada',
    clientRating: 4.5,
    jobSuccess: '90%',
    workload: 'Part-time',
    relevance: 92,
  },
  {
    id: '3',
    title: 'Python Data Scientist for Machine Learning Project',
    description: 'We are seeking a Python data scientist with expertise in machine learning to help analyze our customer data and build predictive models for customer behavior.',
    budget: '$45-65/hr',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'Jupyter'],
    postedOn: new Date('2023-11-27'),
    clientName: 'DataAnalytica',
    clientCountry: 'United Kingdom',
    clientRating: 4.9,
    jobSuccess: '98%',
    workload: 'Full-time',
    relevance: 85,
  },
  {
    id: '4',
    title: 'UI/UX Designer for Mobile Banking App',
    description: 'Looking for a skilled UI/UX designer to redesign our mobile banking application. Experience with financial applications and a strong portfolio are required.',
    budget: '$35-55/hr',
    skills: ['UI Design', 'UX Research', 'Figma', 'Mobile App Design', 'Prototyping'],
    postedOn: new Date('2023-11-28'),
    clientName: 'MobileBanking',
    clientCountry: 'Australia',
    clientRating: 4.7,
    jobSuccess: '92%',
    workload: 'Part-time',
    relevance: 78,
  },
]

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  // Simulate loading state
  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Mock error for demonstration
      if (searchQuery.toLowerCase().includes('error')) {
        throw new Error('Failed to fetch jobs')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Filter className="w-4 h-4" />
          )}
          Filters
        </Button>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-md bg-destructive/10 text-destructive"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loading Skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[300px] rounded-lg bg-muted animate-pulse"
              />
            ))
          ) : (
            mockJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold line-clamp-2">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {job.clientName} • {job.clientCountry}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "text-muted-foreground hover:text-primary",
                          selectedJob === job.id && "text-primary"
                        )}
                        onClick={() => setSelectedJob(job.id === selectedJob ? null : job.id)}
                      >
                        {selectedJob === job.id ? (
                          <Star className="w-5 h-5 fill-primary" />
                        ) : (
                          <StarOff className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.workload}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 
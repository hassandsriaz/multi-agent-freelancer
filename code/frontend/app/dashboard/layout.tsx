"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Menu, 
  X, 
  BriefcaseIcon, 
  FileTextIcon, 
  MessageSquare, 
  User, 
  BarChartIcon, 
  GanttChartIcon, 
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
  onClick?: () => void
}

const NavItem = ({ href, icon, label, active, onClick }: NavItemProps) => (
  <Link href={href} onClick={onClick}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  </Link>
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: <BarChartIcon className="w-5 h-5" />, label: "Overview" },
    { href: "/dashboard/jobs", icon: <BriefcaseIcon className="w-5 h-5" />, label: "Jobs" },
    { href: "/dashboard/proposals", icon: <FileTextIcon className="w-5 h-5" />, label: "Proposals" },
    { href: "/dashboard/interviews", icon: <MessageSquare className="w-5 h-5" />, label: "Interviews" },
    { href: "/dashboard/agents", icon: <GanttChartIcon className="w-5 h-5" />, label: "Agents" },
    { href: "/dashboard/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { href: "/dashboard/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(true)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: sidebarOpen ? 250 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className={cn(
          "fixed left-0 top-0 h-full z-20 md:relative bg-card border-r",
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-md glass-panel flex items-center justify-center"
            >
              <Brain className="w-6 h-6 text-ai-teal" />
            </motion.div>
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-lg font-bold">Multi-Agent System</h1>
                </motion.div>
              )}
            </AnimatePresence>
            <Button 
              variant="ghost" 
              size="icon"
              className="ml-auto md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href}
                onClick={() => setSidebarOpen(true)}
              />
            ))}
          </nav>
          
          <div className="pt-4 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-4 h-4 mr-2" />
              {sidebarOpen && "Collapse Sidebar"}
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 
import { Session } from 'next-auth'

// API base URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  session?: Session | null
}

/**
 * Base fetch function with authentication and error handling
 */
async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    session
  } = options

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers
  }

  // Add auth token if session exists
  if (session?.accessToken) {
    requestHeaders.Authorization = `Bearer ${session.accessToken}`
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: 'include'
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions)

  // Handle HTTP errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || `API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Job Scout API
 */
export const jobScoutAPI = {
  searchJobs: (criteria: any, session?: Session | null) => {
    return fetchAPI('/jobs/search', {
      method: 'POST',
      body: criteria,
      session
    })
  },
  getJobDetails: (jobId: string, session?: Session | null) => {
    return fetchAPI(`/jobs/${jobId}`, { session })
  }
}

/**
 * Proposal Specialist API
 */
export const proposalAPI = {
  generateProposal: (jobId: string, data: any, session?: Session | null) => {
    return fetchAPI(`/jobs/${jobId}/generate-proposal`, {
      method: 'POST',
      body: data,
      session
    })
  },
  submitProposal: (jobId: string, proposal: any, session?: Session | null) => {
    return fetchAPI(`/jobs/${jobId}/submit-proposal`, {
      method: 'POST',
      body: proposal,
      session
    })
  }
}

/**
 * Account Manager API
 */
export const profileAPI = {
  getProfile: (session?: Session | null) => {
    return fetchAPI('/profile', { session })
  },
  updateProfile: (data: any, session?: Session | null) => {
    return fetchAPI('/profile/update', {
      method: 'POST',
      body: data,
      session
    })
  },
  optimizeProfile: (session?: Session | null) => {
    return fetchAPI('/profile/optimize', {
      method: 'POST',
      session
    })
  }
}

/**
 * Multi-Agent Crew API
 */
export const crewAPI = {
  automateJobApplication: (data: any, session?: Session | null) => {
    return fetchAPI('/crew/automate-job-application', {
      method: 'POST',
      body: data,
      session
    })
  },
  optimizeProfile: (session?: Session | null) => {
    return fetchAPI('/crew/optimize-profile', {
      method: 'POST',
      session
    })
  }
}

/**
 * Auth API
 */
export const authAPI = {
  login: (credentials: { username: string; password: string }) => {
    return fetchAPI('/auth/token', {
      method: 'POST',
      body: credentials
    })
  },
  getUserProfile: (session?: Session | null) => {
    return fetchAPI('/auth/users/me', { session })
  }
} 
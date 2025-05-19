import { NextResponse } from 'next/server'
import { improveProposal, calculateAIScore } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { jobId, currentProposal, jobTitle } = body

    // Improve the proposal using OpenAI
    const improvedProposal = await improveProposal(currentProposal, jobTitle)
    
    // Calculate new AI score
    const aiScore = await calculateAIScore(improvedProposal, jobTitle)

    return NextResponse.json({
      improvedProposal,
      aiScore
    })
  } catch (error) {
    console.error('Error improving proposal:', error)
    return NextResponse.json(
      { error: 'Failed to improve proposal' },
      { status: 500 }
    )
  }
} 
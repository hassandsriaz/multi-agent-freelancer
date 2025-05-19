import { NextResponse } from 'next/server'
import { generateProposal, calculateAIScore } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { jobId, jobTitle, clientName, rate } = body

    // Generate the proposal using OpenAI
    const coverLetter = await generateProposal(jobTitle, clientName, rate)
    
    // Calculate AI score
    const aiScore = await calculateAIScore(coverLetter, jobTitle)

    return NextResponse.json({
      coverLetter,
      aiScore
    })
  } catch (error) {
    console.error('Error generating proposal:', error)
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
} 
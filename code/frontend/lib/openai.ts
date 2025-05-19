import OpenAI from 'openai'
import { userProfile } from './profile'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development
})

function getProfileSummary() {
  return `Candidate Profile:\nName: ${userProfile.name}\nEducation: ${userProfile.education.map(e => `${e.degree} from ${e.institution} (${e.graduation})`).join('; ')}\nExperience: ${userProfile.experience.map(e => `${e.title} at ${e.company} (${e.period}): ${e.highlights.join(' | ')}`).join('; ')}\nProjects: ${userProfile.projects.map(p => `${p.name} (${p.period}): ${p.highlights.join(' | ')}`).join('; ')}\nSkills: ${userProfile.skills.join(', ')}\nProgramming: ${userProfile.programming.join(', ')}\nFrameworks/Tools: ${userProfile.frameworks.join(', ')}\nDatabases: ${userProfile.databases.join(', ')}\nInterests: ${userProfile.interests.join(', ')}`;
}

export async function generateProposal(jobTitle: string, clientName: string, rate: number) {
  const profileSummary = getProfileSummary();
  const prompt = `\n${profileSummary}\n\nWrite a professional cover letter for the following job:\nJob Title: ${jobTitle}\nClient: ${clientName}\nRate: $${rate}/hr\n\nThe cover letter should:\n1. Be personalized to the job requirements\n2. Highlight relevant experience and skills from the candidate's profile\n3. Be concise and professional\n4. Include specific examples of past work\n5. End with a call to action\n\nFormat the response as a proper cover letter with appropriate spacing and structure.`

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert freelancer who writes compelling cover letters. Focus on being specific, professional, and highlighting relevant experience."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  })

  return completion.choices[0].message.content
}

export async function improveProposal(currentProposal: string, jobTitle: string) {
  const profileSummary = getProfileSummary();
  const prompt = `\n${profileSummary}\n\nImprove the following cover letter for a ${jobTitle} position. Make it more compelling, professional, and tailored to the job requirements:\n\n${currentProposal}\n\nFocus on:\n1. Making it more specific and detailed\n2. Adding relevant examples from the candidate's profile\n3. Improving the overall structure and flow\n4. Making it more engaging\n5. Maintaining a professional tone`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert at improving cover letters. Focus on making them more compelling while maintaining professionalism."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  })

  return completion.choices[0].message.content
}

export async function calculateAIScore(proposal: string, jobTitle: string) {
  const profileSummary = getProfileSummary();
  const prompt = `\n${profileSummary}\n\nRate the following cover letter for a ${jobTitle} position on a scale of 0-100. Consider:\n1. Relevance to the job\n2. Professionalism\n3. Specificity and detail\n4. Structure and flow\n5. Call to action\n\nCover letter:\n${proposal}\n\nProvide only the numerical score.`

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert at evaluating cover letters. Provide only a numerical score between 0-100."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 10
  })

  const score = parseInt(completion.choices[0].message.content || "0")
  return Math.min(Math.max(score, 0), 100) // Ensure score is between 0-100
} 
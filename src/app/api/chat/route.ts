import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ reply: 'Please ask me something!' });
    }

    const reply = getResponse(message);
    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      reply: "Hi! I'm Mahsa's assistant. Ask me about her skills, projects, or experience!"
    });
  }
}

function getResponse(message: string): string {
  const m = message.toLowerCase();
  
  if (m.includes('skill') || m.includes('technolog')) {
    return "Mahsa's skills include React, Next.js, TypeScript, Node.js, Express, MongoDB, Python, and Angular. She's a full-stack developer passionate about front-end!";
  }
  if (m.includes('react')) {
    return "Mahsa is highly proficient in React.js with hooks, Redux, and React Router. She built Kanba LMS using React!";
  }
  if (m.includes('next')) {
    return "Mahsa specializes in Next.js for SSR and API routes. Her portfolio is built with Next.js 15!";
  }
  if (m.includes('education') || m.includes('degree')) {
    return "Mahsa has a Master's in CS from Northeastern University, a Web Dev certificate from BCIT, and a Bachelor's in Software Engineering.";
  }
  if (m.includes('kanba')) {
    return "Kanba is Mahsa's LMS built with React, Redux, Node.js, Express, and MongoDB. Features include course management, assignments, and gradebook!";
  }
  if (m.includes('mccp')) {
    return "MCCP is Mahsa's AI-powered coding platform with multi-model integration for code assistance.";
  }
  if (m.includes('project')) {
    return "Mahsa's main projects: Kanba (LMS), MCCP (AI coding platform), and this portfolio website.";
  }
  if (m.includes('contact') || m.includes('email')) {
    return "Email Mahsa at mahsa54@gmail.com. Links to GitHub and LinkedIn are in the footer!";
  }
  if (m.includes('github')) {
    return "github.com/mahsakhakpour";
  }
  if (m.includes('linkedin')) {
    return "linkedin.com/in/mahsakhakpour";
  }
  if (m.match(/^(hi|hello|hey)/)) {
    return "Hello! Ask me about Mahsa's skills, projects like Kanba, or her education!";
  }
  
  // If no keywords matched, ask for clarification instead of giving default answer
  return "I can tell you about Mahsa's skills, projects (like Kanba or MCCP), education, or how to contact her. What would you like to know?";
}
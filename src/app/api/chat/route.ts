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
  
  // Experience
  if (m.includes('experience') || m.includes('background') || m.includes('work history')) {
    return "Mahsa is a full-stack web developer with experience building end-to-end applications. She has worked with React, Next.js, Node.js, Express, MongoDB, and Python. She holds a Master's in CS from Northeastern University and a Web Development certificate from BCIT. Her experience spans front-end interfaces, back-end systems, database architecture, and UX/UI design.";
  }
  
  // Age - politely decline
  if (m.includes('age') || m.includes('old')) {
    return "I don't have that information. I can tell you about Mahsa's professional experience, skills, education, and projects instead!";
  }
  
  // Personal questions - decline
  if (m.includes('salary') || m.includes('money') || m.includes('paid') || m.includes('phone') || m.includes('number') || m.includes('address') || m.includes('location') || m.includes('live') || m.includes('where')) {
    return "I don't have that information. I'm designed to answer questions about Mahsa's professional skills, projects, education, and experience.";
  }
  
  // Skills
  if (m.includes('skill') || m.includes('technolog')) {
    return "Mahsa's skills include React, Next.js, TypeScript, Node.js, Express, MongoDB, Python, and Angular. She's a full-stack developer passionate about front-end and UX/UI!";
  }
  
  // React
  if (m.includes('react')) {
    return "Mahsa is highly proficient in React.js with hooks, Redux, and React Router. She built Kanba LMS using React!";
  }
  
  // Next.js
  if (m.includes('next')) {
    return "Mahsa specializes in Next.js for SSR and API routes. Her portfolio is built with Next.js 15!";
  }
  
  // Education
  if (m.includes('education') || m.includes('degree')) {
    return "Mahsa has a Master's in CS from Northeastern University, a Web Dev certificate from BCIT, and a Bachelor's in Software Engineering.";
  }
  
  // Kanba project
  if (m.includes('kanba')) {
    return "Kanba is Mahsa's LMS built with React, Redux, Node.js, Express, and MongoDB. Features include course management, assignments, and gradebook!";
  }
  
  // MCCP project
  if (m.includes('mccp')) {
    return "MCCP is Mahsa's AI-powered coding platform with multi-model integration for code assistance.";
  }
  
  // Projects general
  if (m.includes('project')) {
    return "You can find her projects here: https://www.mahsa.website/projects";
  }
  
  // Contact
  if (m.includes('contact') || m.includes('email')) {
    return "Email Mahsa at mahsa54@gmail.com. Links to GitHub and LinkedIn are in the footer!";
  }
  
  // GitHub
  if (m.includes('github')) {
    return "github.com/mahsakhakpour";
  }
  
  // LinkedIn
  if (m.includes('linkedin')) {
    return "linkedin.com/in/mahsakhakpour";
  }
  
  // Greetings
  if (m.match(/^(hi|hello|hey)/)) {
    return "Hello! Ask me about Mahsa's skills, projects like Kanba, her education, or experience!";
  }
  
  // Default - what I CAN answer
  return "I don't have that information. I can answer questions about Mahsa's skills, projects, education, experience, or how to contact her.";
}
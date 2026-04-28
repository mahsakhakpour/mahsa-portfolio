import { NextResponse } from 'next/server';

// Your portfolio information - NATURAL TONE
const portfolioContext = `
You are an AI assistant for Mahsa Khakpour's portfolio website. Be helpful and honest.

About Mahsa:
- Full-stack web developer with a Master's in Computer Science from Northeastern University
- Associate Certificate in Web Development from BCIT
- Bachelor's degree in Computer-Software Engineering
- Combines full-stack capabilities with a passion for front-end development and UX/UI design
- Focuses on creating user-friendly, functional digital experiences

Skills:
- Frontend: React, Next.js, TypeScript, Angular, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, Python, PHP
- Databases: MongoDB, PostgreSQL, MySQL, SQL
- Tools: Git, Redux, REST APIs, Vercel

Projects:
- Kanba: Full-stack Learning Management System (LMS) with React, Redux, Node.js, Express, MongoDB
- MCCP: AI-powered coding platform with multi-model integration
- Portfolio website: Built with Next.js 15, TypeScript, and modern CSS

Education:
- M.S. in Computer Science - Northeastern University
- Associate Certificate in Web Development - BCIT
- Bachelor's in Computer-Software Engineering

Contact:
- Email: mahsa54@gmail.com
- GitHub: github.com/mahsakhakpour
- LinkedIn: linkedin.com/in/mahsakhakpour

Instructions:
- Be helpful and conversational
- Keep responses concise (1-2 sentences if possible)
- Be polite and natural
- If asked about something not in this context, say politely that you don't have that information
`;

// Store conversation history
const conversations = new Map<string, { role: string; content: string }[]>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json({ reply: 'Please ask me something!' });
    }

    // Generate or use existing conversation ID
    const sessionId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    
    const history = conversations.get(sessionId) || [];
    
    // Add user message to history
    history.push({ role: 'user', content: message });

    // Prepare messages for Groq
    const messages = [
      { role: "system", content: portfolioContext },
      ...history.slice(-10).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    // Check if Groq API key exists
    if (!process.env.GROQ_API_KEY) {
      console.warn("GROQ_API_KEY not set, using fallback responses");
      const fallbackReply = getFallbackResponse(message);
      history.push({ role: 'assistant', content: fallbackReply });
      conversations.set(sessionId, history.slice(-10));
      return NextResponse.json({ reply: fallbackReply, conversationId: sessionId });
    }

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messages,
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      throw new Error(`Groq API returned ${response.status}`);
    }

    const result = await response.json();
    let reply = result.choices[0]?.message?.content || "";
    
    // Clean up the reply
    reply = reply.replace(/^Mahsa:/i, '').trim();
    reply = reply.replace(/^Assistant:/i, '').trim();
    
    if (!reply) {
      reply = getFallbackResponse(message);
    }

    // Add assistant response to history
    history.push({ role: 'assistant', content: reply });
    conversations.set(sessionId, history.slice(-10));

    return NextResponse.json({ reply, conversationId: sessionId });

  } catch (error) {
    console.error('Chat API error:', error);
    
    const fallbackId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const fallbackReply = getFallbackResponse("default");
    
    return NextResponse.json({ 
      reply: fallbackReply,
      conversationId: fallbackId
    });
  }
}

// Comprehensive fallback responses when Groq API is not available
function getFallbackResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  // Greetings
  if (lowerMsg.match(/^(hi|hello|hey|greetings|sup)/)) {
    return "Hello! I'm Mahsa's AI assistant. I can tell you about her skills, experience, education, projects, or how to contact her. What would you like to know?";
  }
  
  // Skills
  if (lowerMsg.includes('skill') || lowerMsg.includes('technolog') || lowerMsg.includes('tech stack')) {
    return "Mahsa's core skills include React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Python, Angular, and PHP. She specializes in full-stack development with a passion for front-end and UX/UI!";
  }
  
  // React
  if (lowerMsg.includes('react')) {
    return "Mahsa is highly proficient in React.js including hooks, context API, Redux, and React Router. She's built several full-stack applications including Kanba (LMS platform) with React!";
  }
  
  // Next.js
  if (lowerMsg.includes('next.js') || lowerMsg.includes('nextjs') || lowerMsg.includes('next')) {
    return "Mahsa specializes in Next.js for server-side rendering, static site generation, API routes, and the App Router. Her portfolio is built with Next.js 15!";
  }
  
  // Education
  if (lowerMsg.includes('education') || lowerMsg.includes('degree') || lowerMsg.includes('study') || lowerMsg.includes('university')) {
    return "Mahsa holds a Master's in Computer Science from Northeastern University, an Associate Certificate in Web Development from BCIT, and a Bachelor's in Computer-Software Engineering.";
  }
  
  // Experience
  if (lowerMsg.includes('experience') || lowerMsg.includes('background') || lowerMsg.includes('work')) {
    return "Mahsa is a full-stack developer who bridges design and development. She has experience with front-end interfaces, back-end systems, database architecture, and creating user-centered digital experiences.";
  }
  
  // Kanba project
  if (lowerMsg.includes('kanba')) {
    return "Kanba is Mahsa's comprehensive Learning Management System (LMS) built with React, Redux, Node.js, Express, and MongoDB. It features course management, assignments, gradebook, and multi-role support (students/faculty/admin)!";
  }
  
  // MCCP project
  if (lowerMsg.includes('mccp')) {
    return "MCCP (Multi-modal Code Collaboration Platform) is an AI-powered coding platform Mahsa developed. It integrates multiple AI models for code assistance, real-time collaboration, and intelligent code review features.";
  }
  
  // Projects general
  if (lowerMsg.includes('project') || lowerMsg.includes('portfolio') || lowerMsg.includes('work')) {
    return "Mahsa's main projects include:\n\n• Kanba - Full-stack LMS platform\n• MCCP - AI-powered coding platform\n• This portfolio website\n\nCheck them out in the Portfolio dropdown menu!";
  }
  
  // Contact
  if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
    return "You can email Mahsa at mahsa54@gmail.com or connect with her on GitHub and LinkedIn. Links are in the footer of this website!";
  }
  
  // GitHub
  if (lowerMsg.includes('github')) {
    return "Mahsa's GitHub is github.com/mahsakhakpour. Check out her repositories including Kanba LMS and MCCP!";
  }
  
  // LinkedIn
  if (lowerMsg.includes('linkedin')) {
    return "Connect with Mahsa on LinkedIn at linkedin.com/in/mahsakhakpour";
  }
  
  // About
  if (lowerMsg.includes('about') || lowerMsg.includes('who is')) {
    return "Mahsa Khakpour is a full-stack web developer who thrives at the intersection of logic and creativity. She has a Master's in CS from Northeastern and a passion for crafting exceptional front-end experiences!";
  }
  
  // Passion
  if (lowerMsg.includes('passion') || lowerMsg.includes('love')) {
    return "Mahsa's true passion is front-end development and UX/UI design! While she's a full-stack developer, she loves creating intuitive, beautiful, and accessible user interfaces.";
  }
  
  // Default response
  return "Thanks for your question! Mahsa is a full-stack developer with a Master's in CS from Northeastern University. She specializes in React, Next.js, Node.js, and has a passion for front-end development and UX/UI. Feel free to ask about her skills, projects like Kanba, education, or how to contact her!";
}
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
      // Fallback responses when API key is missing
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
    const fallbackReply = "Hi! I'm Mahsa's assistant. Feel free to ask about my skills in React, Next.js, web development, education, or projects like Kanba!";
    
    return NextResponse.json({ 
      reply: fallbackReply,
      conversationId: fallbackId
    });
  }
}

// Fallback responses when Groq API is not available
function getFallbackResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('skill') || lowerMsg.includes('technolog')) {
    return "Mahsa's core skills include React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Python, and Angular. She specializes in full-stack development with a passion for front-end!";
  }
  if (lowerMsg.includes('react')) {
    return "Mahsa is highly proficient in React.js including hooks, context API, Redux, and React Router. She's built several full-stack applications with React.";
  }
  if (lowerMsg.includes('next')) {
    return "Mahsa specializes in Next.js for server-side rendering, static site generation, and API routes. Her portfolio is built with Next.js 15!";
  }
  if (lowerMsg.includes('education') || lowerMsg.includes('degree')) {
    return "Mahsa holds a Master's in Computer Science from Northeastern University, an Associate Certificate in Web Development from BCIT, and a Bachelor's in Computer-Software Engineering.";
  }
  if (lowerMsg.includes('experience')) {
    return "Mahsa is a full-stack developer who bridges design and development. She has experience with front-end interfaces, back-end systems, and database architecture.";
  }
  if (lowerMsg.includes('kanba')) {
    return "Kanba is Mahsa's comprehensive LMS built with React, Redux, Node.js, Express, and MongoDB. It features course management, assignments, gradebook, and multi-role support!";
  }
  if (lowerMsg.includes('project')) {
    return "Mahsa's main projects include Kanba (LMS platform), MCCP (AI-powered coding platform), and this portfolio website. Check them out in the Portfolio dropdown!";
  }
  if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
    return "You can email Mahsa at mahsa54@gmail.com or connect with her on GitHub and LinkedIn. Links are in the footer!";
  }
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Hello! I'm Mahsa's AI assistant. I can tell you about her skills, experience, education, projects, or how to contact her. What would you like to know?";
  }
  
  return "Thanks for your question! Mahsa is a full-stack developer with a Master's in CS from Northeastern University. She specializes in React, Next.js, Node.js, and has a passion for front-end development and UX/UI. Feel free to ask about her skills, projects like Kanba, or experience!";
}
import { NextResponse } from 'next/server';

// Your portfolio information - NATURAL TONE
const portfolioContext = `
You are an AI assistant for Mahsa Khakpour's portfolio website. Be helpful and honest.

About Mahsa:
- Front-end and Full-stack developer who builds web applications
- She focuses on creating user-friendly, functional digital experiences
- Her work combines front-end development with back-end systems
- Currently working with React, Next.js, TypeScript, Node.js, and Python

Skills:
- Frontend: HTML, CSS, JavaScript, React, Next.js, Angular
- Backend: Node.js, Python, PHP
- Databases: SQL, MongoDB
- Also has experience with UI/UX design and business analysis

Projects:
- Portfolio website - built with Next.js 15 and TypeScript
- Various web applications (both front-end and full-stack)

Contact:
- Email: mahsa54@gmail.com

Instructions:
- Be helpful and straightforward
- Don't over-praise - just state facts
- If you don't know something, say: "I don't have that information"
- Keep responses concise (1-3 sentences)
- Be polite but natural, not overly enthusiastic
`;

// Define type for conversation messages
interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Store conversation history
const conversations = new Map<string, ConversationMessage[]>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json(
        { reply: 'Please say something!' }
      );
    }

    console.log("Received message:", message);
    console.log("Groq API Key exists:", !!process.env.GROQ_API_KEY);

    // Generate or use existing conversation ID
    const sessionId: string = conversationId ? String(conversationId) : `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    
    const history = conversations.get(sessionId) as ConversationMessage[];
    
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

    console.log("Sending request to Groq...");

    // Direct API call to Groq (no SDK needed)
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
      throw new Error(`Groq API returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    let reply = result.choices[0]?.message?.content || "";
    console.log("Received response from Groq");

    // Clean up the reply
    reply = reply.replace(/^Mahsa:/i, '').trim();
    reply = reply.replace(/^Assistant:/i, '').trim();
    
    if (!reply) {
      reply = "I'm not sure how to answer that. Feel free to ask about my skills or projects!";
    }

    // Add assistant response to history
    history.push({ role: 'assistant', content: reply });
    
    // Keep only last 10 exchanges
    if (history.length > 10) {
      conversations.set(sessionId, history.slice(-10));
    }

    return NextResponse.json({ 
      reply,
      conversationId: sessionId 
    });

  } catch (error) {
    console.error('Groq API error:', error);
    
    const fallbackId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    return NextResponse.json({ 
      reply: "Hi! I'm Mahsa's assistant. Feel free to ask about my skills in React, Next.js, or web development!",
      conversationId: fallbackId
    });
  }
}
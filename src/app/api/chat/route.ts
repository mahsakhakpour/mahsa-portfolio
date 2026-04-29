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
  
  // WORK EXPERIENCE
  if (m.includes('experience') || m.includes('work') || m.includes('job') || m.includes('career') || m.includes('employment')) {
    return "Mahsa's work experience includes:\n\n" +
      "📍 **Full-Stack Developer at UGTS (2018–2021 & Dec 2024–Present)** – Develops full-stack applications with React, backend integrations, custom APIs, performance optimization, and automation.\n\n" +
      "📍 **Full-Stack Developer at Unibuild (Dec 2023–Dec 2024)** – Built responsive apps with React.js, Node.js, Express, RESTful APIs, refactored legacy code, and led code reviews.\n\n" +
      "📍 **UX/UI Developer at Campus Support (Jan 2023–Dec 2023)** – Designed interactive interfaces, conducted usability testing, and built reusable UI components.\n\n" +
      "📍 **Web Developer at CI Employment (May 2018–Nov 2019)** – Delivered end-to-end web solutions with JavaScript, backend scripting, and database integration.";
  }
  
  // TECHNICAL SKILLS
  if (m.includes('skill') || m.includes('technolog') || m.includes('tech stack')) {
    return "Mahsa's technical skills include:\n\n" +
      "🔹 **Frontend:** JavaScript, React.js, TypeScript, Angular, HTML5, CSS3\n" +
      "🔹 **Backend:** Node.js, Express.js, Python, REST APIs, PHP, Java\n" +
      "🔹 **Databases:** MongoDB, MySQL, MS SQL Server, SQLite\n" +
      "🔹 **Tools:** Git, Postman, WordPress, Agile/Scrum, SDLC, Performance Optimization";
  }
  
  // REACT
  if (m.includes('react')) {
    return "Mahsa is highly proficient in React.js with hooks, Redux, TypeScript, and React Router. She built Kanba LMS using React and has extensive experience building custom React components and reusable UI libraries.";
  }
  
  // NEXT.JS
  if (m.includes('next.js') || m.includes('nextjs') || m.includes('next')) {
    return "Mahsa specializes in Next.js for SSR, static site generation, and API routes. Her portfolio is built with Next.js 15 and TypeScript!";
  }
  
  // EDUCATION
  if (m.includes('education') || m.includes('degree') || m.includes('study') || m.includes('university')) {
    return "🎓 Mahsa's education includes:\n\n" +
      "• **Certificate, Data Analytics Engineering** – Northeastern University (Expected Sep 2026)\n" +
      "• **MSc in Computer Science** – Northeastern University, Vancouver (May 2025)\n" +
      "• **Associate Certificate, Applied Web Development** – BCIT, Vancouver (May 2018)";
  }
  
  // PROJECTS
  if (m.includes('project') || m.includes('portfolio')) {
    return "Mahsa's featured projects:\n\n" +
      "📚 **Kanba (Interactive University Learning Platform)** – Full-stack LMS with React, TypeScript, Redux, Node.js, Express, MongoDB. Features course management, assignments, automated grading, and role-based access.\n\n" +
      "🤖 **Interactive Robot Patrol** – JavaScript animation showcase with dynamic robot behavior, smooth motion control, and real-time interaction.\n\n" +
      "📊 **MCCP (Maximum Circular Coverage Problem)** – Novel Sliding Circle algorithm with DBSCAN achieving 94% accuracy and 99% faster execution. Applied to 5G tower placement, traffic lights, ambulance hubs, and food truck locations.\n\n" +
      "🔗 You can find all projects at: https://www.mahsa.website/projects";
  }
  
  // KANBA project
  if (m.includes('kanba')) {
    return "Kanba is Mahsa's full-stack Learning Management System (LMS) built with React, TypeScript, Redux, Bootstrap, Node.js, Express.js, and MongoDB. Features include course management, assignment distribution, timed quizzes with server-side validation, automated grading, comprehensive gradebook with weighted calculations, role-based access for students/faculty/admin, and performance optimization through code splitting and lazy loading.";
  }
  
  // MCCP project
  if (m.includes('mccp')) {
    return "MCCP (Maximum Circular Coverage Problem) is Mahsa's capstone project featuring a novel Sliding Circle algorithm integrated with DBSCAN. It achieves 94% accuracy and 99% faster execution speed. Applications include optimizing 5G tower installations, locating traffic lights, positioning mobile ambulance hubs, and selecting optimal spots for food truck parking. Built with visualization tools for data presentation.";
  }
  
  // Robot Patrol project
  if (m.includes('robot')) {
    return "Interactive Robot Patrol is a JavaScript animation project featuring dynamic robot behavior with smooth motion control using requestAnimationFrame, boundary detection, and event-driven interaction. It demonstrates advanced DOM manipulation and modular robot components (head, body, arms, legs) with synchronized CSS keyframe animations.";
  }
  
  // CONTACT
  if (m.includes('contact') || m.includes('email') || m.includes('phone')) {
    return "📧 **Email:** mahsa54@gmail.com\n📱 **Phone:** 778 987 4482\n📍 **Location:** Vancouver, BC\n\n🔗 **Links:** LinkedIn | Website | GitHub\n\nLinks to GitHub and LinkedIn are available in the footer of this website!";
  }
  
  // GITHUB
  if (m.includes('github')) {
    return "🐙 github.com/mahsakhakpour - Check out her repositories including Kanba (LMS platform), MCCP (AI algorithm project), and this portfolio!";
  }
  
  // LINKEDIN
  if (m.includes('linkedin')) {
    return "🔗 linkedin.com/in/mahsakhakpour - Connect with Mahsa for professional opportunities!";
  }
  
  // AGE - politely decline
  if (m.includes('age') || m.includes('old')) {
    return "I don't have that information. I can tell you about Mahsa's professional experience, skills, education, projects, or how to contact her instead!";
  }
  
  // PERSONAL QUESTIONS
  if (m.includes('salary') || m.includes('money') || m.includes('paid') || m.includes('address') || m.includes('live') || m.includes('where')) {
    return "I don't have that information. I'm designed to answer questions about Mahsa's professional skills, work experience, projects, education, and contact information.";
  }
  
  // GREETINGS
  if (m.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! 👋 I'm Mahsa's AI assistant. I can tell you about her work experience, technical skills (React, Node.js, Python), education (Northeastern, BCIT), projects (Kanba, MCCP, Robot Patrol), or how to contact her. What would you like to know?";
  }
  
  // DEFAULT
  return "I don't have that information. I can answer questions about:\n\n" +
    "• **Work Experience** (UGTS, Unibuild, Campus Support, CI Employment)\n" +
    "• **Technical Skills** (React, Node.js, Python, TypeScript, MongoDB, etc.)\n" +
    "• **Education** (Northeastern MSc, BCIT Web Dev, Data Analytics Certificate)\n" +
    "• **Projects** (Kanba LMS, MCCP algorithm, Robot Patrol)\n" +
    "• **Contact Info** (Email, phone, location, GitHub, LinkedIn)\n\n" +
    "What would you like to know?";
}
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
  
  // COURSE ANALYTICS project (specific)
  if (m.includes('course analytics') || m.includes('survey platform')) {
    return "Course Platform Analytics is a full-stack survey platform for collecting and visualizing student preferences for course platforms. Built with Next.js, TypeScript, Tailwind CSS, React Query, Recharts, and LocalStorage API.\n\nView project: [https://www.mahsa.website/projects/course-analytics](https://www.mahsa.website/projects/course-analytics)";
  }
  
  // INTERIYOUR project (specific)
  if (m.includes('interiyour') || m.includes('interior design')) {
    return "InteriYOUR Design is a UX/UI design final project for an interior design app. It includes user interviews, surveys, personas, user flows, journey maps, wireframes, and a final prototype.\n\nView PDF: [https://www.mahsa.website/InteriYOUR-Design_Final-Project.pdf](https://www.mahsa.website/InteriYOUR-Design_Final-Project.pdf)";
  }
  
  // KANBA project
  if (m.includes('kanba')) {
    return "Kanba is Mahsa's full-stack Learning Management System (LMS) built with React, TypeScript, Redux, Bootstrap, Node.js, Express.js, and MongoDB. Features include course management, assignment distribution, timed quizzes with server-side validation, automated grading, comprehensive gradebook with weighted calculations, role-based access, and performance optimization.\n\nView project: [https://www.mahsa.website/projects/kanba](https://www.mahsa.website/projects/kanba)";
  }
  
  // MCCP project
  if (m.includes('mccp')) {
    return "MCCP (Maximum Circular Coverage Problem) is Mahsa's capstone project featuring a novel Sliding Circle algorithm integrated with DBSCAN. It achieves 94% accuracy and 99% faster execution speed. Applications include optimizing 5G tower installations, locating traffic lights, positioning mobile ambulance hubs, and selecting optimal spots for food truck parking.\n\nView project: [https://www.mahsa.website/projects/mccp](https://www.mahsa.website/projects/mccp)";
  }
  
  // Robot Patrol project
  if (m.includes('robot')) {
    return "Interactive Robot Patrol is a JavaScript animation project featuring dynamic robot behavior with smooth motion control using requestAnimationFrame, boundary detection, and event-driven interaction. It demonstrates advanced DOM manipulation and modular robot components with synchronized CSS keyframe animations.";
  }
  
  // GENERAL PROJECT QUESTION
  if (m.includes('project') || m.includes('portfolio')) {
    return "Mahsa's featured projects:\n\n" +
      "Kanba (Interactive University Learning Platform) - Full-stack LMS with React, TypeScript, Redux, Node.js, Express, MongoDB\n" +
      "[https://www.mahsa.website/projects/kanba](https://www.mahsa.website/projects/kanba)\n\n" +
      "Course Platform Analytics - Survey platform for visualizing student course preferences\n" +
      "[https://www.mahsa.website/projects/course-analytics](https://www.mahsa.website/projects/course-analytics)\n\n" +
      "InteriYOUR Design - UX/UI design project for an interior design app\n" +
      "[https://www.mahsa.website/InteriYOUR-Design_Final-Project.pdf](https://www.mahsa.website/InteriYOUR-Design_Final-Project.pdf)\n\n" +
      "Interactive Robot Patrol - JavaScript animation with dynamic robot behavior\n\n" +
      "MCCP (Maximum Circular Coverage Problem) - Sliding Circle algorithm achieving 94% accuracy, 99% faster\n" +
      "[https://www.mahsa.website/projects/mccp](https://www.mahsa.website/projects/mccp)\n\n" +
      "All projects: [https://www.mahsa.website/projects](https://www.mahsa.website/projects)";
  }
  
  // WORK EXPERIENCE
  if (m.includes('experience') || m.includes('work') || m.includes('job') || m.includes('career') || m.includes('employment')) {
    return "Mahsa's work experience includes:\n\n" +
      "Full-Stack Developer at UGTS\n   Develops full-stack applications with React, backend integrations, custom APIs, performance optimization, and automation.\n\n" +
      "Full-Stack Developer at Unibuild\n   Built responsive apps with React.js, Node.js, Express, RESTful APIs, refactored legacy code, and led code reviews.\n\n" +
      "UX/UI Developer at Campus Support\n   Designed interactive interfaces, conducted usability testing, and built reusable UI components.";
  }
  
  // TECHNICAL SKILLS
  if (m.includes('skill') || m.includes('technolog') || m.includes('tech stack')) {
    return "Mahsa's technical skills include:\n\n" +
      "Frontend: JavaScript, React.js, TypeScript, Angular, HTML5, CSS3\n\n" +
      "Backend: Node.js, Express.js, Python, REST APIs, PHP, Java\n\n" +
      "Databases: MongoDB, MySQL, MS SQL Server, SQLite\n\n" +
      "Tools: Git, Postman, WordPress, Agile/Scrum, SDLC, Performance Optimization";
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
    return "Mahsa's education includes:\n\n" +
      "Certificate, Data Analytics Engineering – Northeastern University (Expected Sep 2026)\n\n" +
      "MSc in Computer Science – Northeastern University, Vancouver (May 2025)\n\n" +
      "Associate Certificate, Applied Web Development – BCIT, Vancouver (May 2018)";
  }
  
  // CONTACT - Email and LinkedIn (clickable)
  if (m.includes('contact') || m.includes('email') || m.includes('linkedin')) {
    return "Email: mahsa54@gmail.com\n\nLinkedIn: [https://linkedin.com/in/mahsakhakpour](https://linkedin.com/in/mahsakhakpour)";
  }
  
  // PHONE - redirect to email/LinkedIn
  if (m.includes('phone') || m.includes('number') || m.includes('call')) {
    return "I don't have a phone number to share. You can reach Mahsa via email at mahsa54@gmail.com or connect on LinkedIn: [https://linkedin.com/in/mahsakhakpour](https://linkedin.com/in/mahsakhakpour)";
  }
  
  // LOCATION
  if (m.includes('location') || m.includes('vancouver') || m.includes('where') || m.includes('live') || m.includes('address')) {
    return "I don't share specific location details. You can reach Mahsa via email at mahsa54@gmail.com or connect on LinkedIn: [https://linkedin.com/in/mahsakhakpour](https://linkedin.com/in/mahsakhakpour)";
  }
  
  // GITHUB (separate from contact)
  if (m.includes('github')) {
    return "GitHub: [https://github.com/mahsakhakpour](https://github.com/mahsakhakpour) - Check out her repositories including Kanba, MCCP, Course Platform Analytics, and this portfolio!";
  }
  
  // AGE
  if (m.includes('age') || m.includes('old')) {
    return "I don't have that information. I can tell you about Mahsa's professional experience, skills, education, projects, or how to contact her instead!";
  }
  
  // SALARY/MONEY
  if (m.includes('salary') || m.includes('money') || m.includes('paid')) {
    return "I don't have that information. I'm designed to answer questions about Mahsa's professional skills, work experience, projects, education, and contact information.";
  }
  
  // GREETINGS
  if (m.match(/^(hi|hello|hey|greetings)/)) {
    return "👋 Hello! I'm Mahsa's AI assistant. I can tell you about her work experience, technical skills (React, Node.js, Python), education (Northeastern, BCIT), projects (Kanba, Course Analytics, MCCP, InteriYOUR Design), or how to contact her via email or LinkedIn. What would you like to know?";
  }
  
  // DEFAULT
  return "I don't have that information. I can answer questions about Mahsa's work experience, technical skills, education, projects (Kanba, Course Analytics, MCCP, InteriYOUR Design, Robot Patrol), or you can contact her via email at mahsa54@gmail.com or LinkedIn: [https://linkedin.com/in/mahsakhakpour](https://linkedin.com/in/mahsakhakpour). What would you like to know?";
}
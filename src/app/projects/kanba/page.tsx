import "./style.css";

export default function KanbaPage() {
  return (
    <div className="kanba-container">

      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="/kanba/kanba.png"
          alt="Kanba"
          className="hero-img"
        />

        <div className="hero-text">
          <h1 className="title">
            Kanba
            <span>Comprehensive LMS Web Application</span>
          </h1>

          <p>
            Kanba is a sophisticated web platform designed to streamline course management and enhance user engagement. It integrates front-end interactivity with robust back-end services, enabling seamless navigation, real-time updates, and structured workflows. This project demonstrates advanced full-stack capabilities, including modular content management, assignment tracking, automated grading, and multi-role support, delivering a polished, user-centered digital experience suitable for professional environments.
          </p>
        </div>
      </section>

      {/* Tech Grid */}
      <section className="section tech-grid">
        <div className="tech-box">
          <h3>Front-End</h3>
          <ul>
            <li>React.js</li>
            <li>Redux</li>
            <li>Bootstrap</li>
            <li>HTML/CSS</li>
          </ul>
        </div>

        <div className="tech-box">
          <h3>Back-End</h3>
          <ul>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>RESTful API</li>
          </ul>
        </div>

        <div className="tech-box">
          <h3>Database</h3>
          <ul>
            <li>MongoDB</li>
            <li>NoSQL</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Key Features & Functionality</h2>

        <div className="feature">
          <div>
            <h4>Personalized Dashboard</h4>
            <p>
              Customized course overview with quick navigation, recent activity feed, and course cards for easy access to enrolled courses.
            </p>
          </div>
          <img src="/kanba/dashboard.png" alt="Dashboard" />
        </div>

        <div className="feature">
          <img src="/kanba/module.png" alt="Modules" />
          <div>
            <h4>Modules & Content</h4>
            <p>
              Organize course materials into structured modules with lessons, assignments, and resources. Features drag-and-drop reordering, publish/unpublish controls, and sequential navigation.
            </p>
          </div>
        </div>

        <div className="feature">
          <div>
            <h4>Assignments System</h4>
            <p>
              Create and manage assignments with due dates, points, submission tracking, grading functionality, and late submission handling.
            </p>
          </div>
          <img src="/kanba/assignments.png" alt="Assignments" />
        </div>

        <div className="feature">
          <img src="/kanba/grades.png" alt="Grades" />
          <div>
            <h4>Grade Management</h4>
            <p>
              The grading system automatically calculates scores and displays real-time progress. Instructors can create assessments while students track their performance through an integrated grade book.
            </p>
          </div>
        </div>
      </section>

      <section className="section roles">
        <h2>User Roles</h2>
        <ul>
          <li>Students who can enroll in courses and submit work</li>
          <li>Faculty who can create courses and grade assignments</li>
          <li>Administrators who manage the entire system and user accounts</li>
        </ul>
      </section>

      <section className="section links">
        <button className="cta-button">View Source Code</button>
        <div>
          <button className="cta-button">Front-End</button>
          <button className="cta-button">Back-End</button>
        </div>
      </section>
    </div>
  );
}
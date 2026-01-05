export const skills = [
  // Programming Fundamentals
  "Problem Solving",
  "Data Structures",
  "Algorithms",
  "OOP",
  "Design Patterns",
  "Clean Code",
  "SOLID Principles",
  "Debugging",
  "Version Control (Git)",
  "Unit Testing",

  // Programming Languages
  "C",
  "C++",
  "C#",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "PHP",
  "SQL",

  // Backend Development
  "ASP.NET Core",
  "Node.js",
  "Express.js",
  "NestJS",
  "RESTful APIs",
  "GraphQL",
  "Microservices",
  "Authentication & Authorization",
  "JWT",
  "OAuth",
  "SignalR",
  "WebSockets",

  // Frontend Development
  "HTML5",
  "CSS3",
  "SASS",
  "Bootstrap",
  "Tailwind CSS",
  "JavaScript ES6+",
  "Angular",
  "React",
  "Next.js",
  "Responsive Design",
  "State Management",
  "UI/UX Basics",

  // Full Stack
  "Full Stack Development",
  "Client-Server Architecture",
  "API Integration",
  "Server-Side Rendering",
  "MVC Architecture",
  "Monorepo",
  "CI/CD",

  // Databases
  "SQL Server",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Database Design",
  "ORM (Entity Framework, Prisma)",
  "Indexing",
  "Query Optimization",

  // Networking
  "Computer Networks",
  "OSI Model",
  "TCP/IP",
  "HTTP/HTTPS",
  "DNS",
  "Routing & Switching",
  "Firewalls",
  "Load Balancing",
  "VPN",
  "Network Security",

  // Cloud & DevOps
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Linux",
  "Nginx",
  "CI/CD Pipelines",
  "Monitoring & Logging",

  // AI & Machine Learning
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "Supervised Learning",
  "Unsupervised Learning",
  "Reinforcement Learning",
  "Model Training",
  "Model Evaluation",
  "Feature Engineering",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",

  // Data
  "Data Analysis",
  "Data Science",
  "Pandas",
  "NumPy",
  "Data Visualization",
  "Big Data",
  "ETL",

  // Security
  "Cyber Security",
  "Web Security",
  "OWASP",
  "Penetration Testing",
  "Encryption",
  "Secure Coding",

  // Soft & Engineering Skills
  "Agile",
  "Scrum",
  "Problem Analysis",
  "System Design",
  "Documentation",
  "Code Review",
  "Team Collaboration"
];


type AnswerType = 'Text' | 'Record';

export interface IJobQuestion {
  questionName: string;
  answerType: AnswerType;
}
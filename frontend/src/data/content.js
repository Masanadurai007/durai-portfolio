// Single source of truth for portfolio content.
// Edit this file to update text across the whole site.

export const PROFILE = {
  name: "Masana Durai",
  shortName: "Durai",
  roles: ["Fullstack Developer", "AI Engineer", "Freelancer"],
  location: "Chennai, India",
  email: "mmasanadurai007@gmail.com",
  phone: "+91 93619 77522",
  whatsappNumber: "919361977522",
  github: "https://github.com/Masanadurai007",
  linkedin: "https://linkedin.com/in/mmasanadurai2005",
  tagline: "I build AI agents — and the production systems they run on.",
  subtext:
    "I build multi-agent pipelines, RAG systems, and fullstack products — for clients who need something that actually ships to production.",
};

export const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Services",
  "Works",
  "Contact",
];

export const STATS_INLINE = [
  { value: "3", label: "shipped projects" },
  { value: "1st / 126", label: "Project Expo teams" },
  { value: "400+", label: "DSA problems solved" },
];

export const SKILLS_ROW_1 = [
  { name: "LangChain", icon: "Brain" },
  { name: "LangGraph", icon: "GitBranch" },
  { name: "AWS Bedrock", icon: "Cloud" },
  { name: "FastAPI", icon: "Zap" },
  { name: "Golang", icon: "Hexagon" },
  { name: "React.js", icon: "Atom" },
  { name: "RAG", icon: "Search" },
  { name: "Agentic AI", icon: "Bot" },
];

export const SKILLS_ROW_2 = [
  { name: "Node.js", icon: "Server" },
  { name: "Express.js", icon: "Route" },
  { name: "PostgreSQL", icon: "Database" },
  { name: "MongoDB", icon: "Leaf" },
  { name: "Tailwind CSS", icon: "Wind" },
  { name: "Docker", icon: "Container" },
  { name: "GitHub", icon: "Github" },
  { name: "Prompt Engineering", icon: "MessageSquare" },
];

export const SKILL_GROUPS = [
  {
    label: "AI / LLM",
    color: "#7C5CFF",
    skills: [
      "LangChain",
      "LangGraph",
      "RAG",
      "AWS Bedrock",
      "Agentic AI",
      "LLMs",
      "Prompt Engineering",
    ],
  },
  {
    label: "Backend",
    color: "#33E0C7",
    skills: [
      "FastAPI",
      "Golang",
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Microservices",
    ],
  },
  {
    label: "Databases",
    color: "#5FEBD4",
    skills: ["PostgreSQL", "pgvector", "MongoDB", "SQL"],
  },
  {
    label: "Frontend",
    color: "#9B85FF",
    skills: ["React.js", "JavaScript", "Tailwind CSS", "HTML / CSS"],
  },
  {
    label: "Cloud & Tools",
    color: "#C7C2DC",
    skills: ["AWS", "Docker", "GitHub", "Python", "Java"],
  },
];

export const SERVICES = [
  {
    letter: "1",
    title: "Agentic AI Systems",
    description:
      "Multi-agent workflows that plan, act, and recover on their own — built with conditional routing, retries, and state checkpointing so they hold up unattended.",
    tags: "LangGraph · LangChain · Python",
  },
  {
    letter: "2",
    title: "RAG & LLM Integration",
    description:
      "Chatbots and search that answer from your real data, not guesses — vector retrieval, source grounding, and LLM integration done right.",
    tags: "RAG · pgvector · AWS Bedrock",
  },
  {
    letter: "3",
    title: "Fullstack AI Products",
    description:
      "End-to-end products with an AI feature at the core — React frontend, FastAPI or Go backend, and a database schema built to scale.",
    tags: "React · FastAPI · PostgreSQL",
  },
  {
    letter: "4",
    title: "Backend & API Development",
    description:
      "APIs and services engineered for real traffic — clean architecture, proper auth, and database design that doesn't fall over under load.",
    tags: "Go · Node.js · Express",
  },
];

export const PROJECTS = [
  {
    tag: "Agentic AI",
    title: "Multi-Agent Code Pipeline",
    image: "/coding_assistant.png",
    problem:
      "AI-written code shipped with no review, validation, or retry logic.",
    built:
      "A LangGraph multi-agent system with three specialised agents — conditional routing, PostgreSQL state checkpointing, and an automated Pylint-based retry loop running up to 3 times on review failure.",
    result:
      "Production-grade code generation with automated quality gates and zero manual review.",
    stack: ["LangGraph", "LangChain", "FastAPI", "AWS Bedrock", "PostgreSQL"],
  },
  {
    tag: "AI SaaS",
    title: "AI Image Generator",
    image: "/text_to_image.png",
    problem:
      "Needed a platform with real auth, billing, and quota management — not just an API wrapper.",
    built:
      "Full-stack SaaS with a React frontend, Node.js + Express backend, MongoDB, JWT authentication, ClipDrop API integration, and a credit-based payment system.",
    result:
      "Production-ready SaaS with a working payment flow, credit deduction, and user dashboard.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "ClipDrop API"],
  },
  {
    tag: "Education Platform",
    title: "Students Hub Platform",
    image: "/students_hub.png",
    problem:
      "Students had no single place for mentorship, events, and study materials.",
    built:
      "Led frontend development of an educational platform with a responsive React.js UI, Google OAuth, and roadmap modules, working across a 5+ person team.",
    result:
      "A polished, fully responsive platform that handled real mentorship and event workflows end to end.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Google OAuth"],
  },
];

export const EXPERIENCE = [
  {
    period: "Present",
    title: "AI Engineer — Pentabay Softwares",
    description:
      "Building agentic applications and the backend systems behind them — designing agent workflows, integrating LLMs, and engineering the infrastructure that keeps it all running reliably in production.",
    accent: "#7C5CFF",
  },
  {
    period: "Prior",
    title: "Software Developer Intern — Avasoft",
    description:
      "Worked hands-on with Python, FastAPI, LangChain, and LangGraph to build multi-agent products — laying the foundation for the agentic systems I build today.",
    accent: "#33E0C7",
  },
  {
    period: "2022 – 2026",
    title: "B.E. Computer Science — Adhi College of Engineering and Technology",
    description:
      "Graduated with a CGPA of 8.96, while building a strong foundation in data structures and algorithms alongside hands-on project work in fullstack development.",
    accent: "#6B6680",
  },
];

export const ACHIEVEMENTS = [
  { value: "450+", label: "LeetCode problems solved", accent: "#7C5CFF" },
  { value: "1500+", label: "LeetCode rating", accent: "#33E0C7" },
  { value: "1st / 126", label: "Project Expo teams", accent: "#F2F0FA" },
  { value: "5★", label: "SQL rating on HackerRank", accent: "#9B85FF" },
];

export const ARTICLES = [
  {
    title: "Building a Multi-Agent Pipeline with LangGraph",
    excerpt:
      "How conditional routing and checkpointing turn a fragile AI demo into something that survives production.",
    readTime: "6 min read",
  },
  {
    title: "RAG vs Fine-Tuning: What I Learned Shipping Both",
    excerpt:
      "When retrieval beats fine-tuning, and when it genuinely does not — from real client work.",
    readTime: "8 min read",
  },
  {
    title: "Why I Reach for Go in High-Throughput AI APIs",
    excerpt:
      "Benchmarking Go against FastAPI for LLM-backed endpoints under real load.",
    readTime: "5 min read",
  },
];

export const CHAT_STARTERS = [
  "What does Durai work on?",
  "Can Durai build a RAG chatbot for my product?",
  "Is Durai available right now?",
  "How do we get started?",
];

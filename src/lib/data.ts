export const personalInfo = {
  name: 'Aakash Kharb',
  shortName: 'AK',
  tagline: 'आकाश : Sky, in the Clouds ?',
  roles: ['Gen AI', 'Software Logics', 'Cloud Engineering', 'Machine Learning'],
  email: 'akharbrtk2@gmail.com',
  phone: '+91 9416167422',
  location: 'Rohtak, Haryana, India',
  birthday: 'November 27, 2004',
  age: 21,
  website: 'aakash-kharb.github.io/AakashKharb/',
  degree: 'B.Tech in Computer Science Engineering (AI & ML), Maharshi Dayanand University',
  bio: 'My work connects machine learning, biological research, and useful software. From genomic data pipelines to internal platforms and hands-on teaching, I turn complex ideas into tools people can work with.',
  social: {
    github: 'https://github.com/aakash-kharb',
    linkedin: 'https://www.linkedin.com/in/aakash-kharb',
    youtube: 'https://www.youtube.com/@aakash.027',
  },
}

export const education = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science Engineering (AI & ML)',
    institution: 'University Institute of Engineering and Technology, Maharshi Dayanand University',
    location: 'Rohtak, Haryana',
    duration: 'Oct 2022 – Jun 2026',
    cgpa: '3.78 / 4.00 · WES evaluated',
    activities: [
      'Research Gem Award · 2024',
      'Chancellor’s Recognition · Top 10%',
      'Top 1% Batch Brilliance Award',
      'Capstone · ChickpeaOmicsExplorer'
    ],
  },
  {
    degree: 'Senior Secondary',
    field: 'Science, CBSE Board',
    institution: 'Pathania Public School',
    location: 'Rohtak, Haryana',
    duration: '2020 - 2022',
    percentage: '89%',
    activities: [
      'Regional Science & Math Quiz Runner-up',
      'Declamation',
      'National Social Service',
      'Computer Club',
    ],
  },
  {
    degree: 'Secondary',
    field: 'CBSE Board',
    institution: 'Pathania Public School',
    location: 'Rohtak, Haryana',
    duration: '2019 - 2020',
    percentage: '97.6%',
    activities: [
      'English Language Merit Certificate',
      'Science & Math Olympiads',
      'Declamation, Debate',
      {
        main: 'Volunteer',
        sub: ['School Exhibition', 'Annual Sports Meet']
      }
    ],
  },
]

export const skills = {
  development: [
    { name: 'Python', icon: 'FaPython', level: 90 },
    { name: 'C++', icon: 'SiCplusplus', level: 80 },
    { name: 'SQL', icon: 'SiMysql', level: 85 },
    { name: 'R', icon: 'SiR', level: 70 },
    { name: 'MATLAB', icon: 'SiMathworks', level: 75 },
    { name: 'HTML/CSS', icon: 'FaHtml5', level: 90 },
  ],
  cloudDevOps: [
    { name: 'Vertex AI' },
    { name: 'Azure AI Studio' },
    { name: 'GCP', icon: 'SiGooglecloud', level: 85 },
    { name: 'Azure', icon: 'MdCloud', level: 75 },
    { name: 'Docker', icon: 'FaDocker', level: 85 },
    { name: 'Kubernetes', icon: 'SiKubernetes', level: 75 },
  ],
  aiDataScience: [
    { name: 'Explainable AI' },
    { name: 'NumPy' },
    { name: 'SciPy' },
    { name: 'TensorFlow', icon: 'SiTensorflow', level: 85 },
    { name: 'PyTorch', icon: 'SiPytorch', level: 85 },
    { name: 'Scikit-learn', icon: 'FaChartLine', level: 85 },
    { name: 'Pandas', icon: 'FaChartLine', level: 90 },
    { name: 'Neural Networks', icon: 'LuBrainCircuit', level: 85 },
    { name: 'Computer Vision', icon: 'MdRemoveRedEye', level: 80 },
    { name: 'NLP', icon: 'FaComments', level: 80 },
    { name: 'Streamlit', icon: 'SiStreamlit', level: 80 },
  ],
  toolsOS: [
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
    { name: 'Jupyter' },
    { name: 'Google Colab' },
    { name: 'Git', icon: 'FaGitAlt', level: 90 },
    { name: 'GitHub', icon: 'FaGitAlt', level: 90 },
    { name: 'VSCode', icon: 'MdCode', level: 95 },
    { name: 'Selenium', icon: 'SiSelenium', level: 75 },
    { name: 'MLOps', icon: 'MdCloud', level: 75 },
    { name: 'Linux', icon: 'FaLinux', level: 85 },
    { name: 'macOS', icon: 'FaApple', level: 90 },
    { name: 'Windows', icon: 'FaWindows', level: 85 },
  ],
}

export const projects = [
  // Row 1: 2 cards (large + small)
  {
    title: "Chickpea Omics Explorer",
    description: "ML-assisted transcriptomics and multi-omics exploration for Cicer arietinum, connecting SVM gene-expression prediction, automated ETL pipelines, and interactive Django dashboards on GCP.",
    image: "/images/demo-1.webp",
    link: "http://chickpea.mdu.ac.in",
    tags: ["Python", "Django", "GCP", "SVM"],
    category: "research"
  },
  {
    title: "Game Recommendation System",
    description: "Content-based recommendation system using KNN and cosine similarity with feature engineering, MinMaxScaler and one-hot encoding.",
    image: "/images/demo-2.webp",
    link: "https://aakash-game.streamlit.app",
    tags: ["Python", "GCP", "ML"],
    category: "mle"
  },
  // Row 2: 2 cards (small + large)
  {
    title: "Web Terminal",
    description: "macOS Terminal inspired Web App - A browser-based terminal emulator with interactive functionality, file system simulation, light/dark mode, and realistic macOS UI with traffic light controls.",
    image: "/images/demo-3.webp",
    link: "https://aakash-terminal.vercel.app",
    tags: ["JavaScript", "CSS", "Terminal"],
    category: "sw"
  },
  {
    title: "TechWill x Olympics",
    description: "Cloud-integrated web application for Paris 2024 Olympics data with real-time exploration, medal prediction using simulation logic, and intelligent chatbot for event insights. Built with Python and Streamlit, hosted on GCP.",
    image: "/images/demo-5.webp",
    link: "https://aakash-olympics.streamlit.app",
    tags: ["GCP", "Python", "Streamlit", "ML"],
    category: "mle"
  },
  // Row 3: 2 cards (large + small)
  {
    title: "Docx PDF Summarizer",
    description: "Intelligent PDF summarization tool powered by Google's Gemini API. Extracts, analyzes, and simplifies PDF content with interactive visualizations, conversational Q&A, and cloud integration for researchers and professionals.",
    image: "/images/demo-6.webp",
    link: "https://aakash-docx.streamlit.app",
    tags: ["GCP", "Gemini API", "Streamlit"],
    category: "mle"
  },
  {
    title: "WeatherWill",
    description: "Responsive weather application providing current weather conditions, astronomical data (sunrise/sunset, moon phase), air quality metrics (CO, NO₂, O₃, PM2.5), and detailed forecasts for locations worldwide.",
    image: "/images/demo-4.webp",
    link: "https://aakash-kharb.github.io/WeatherWill/",
    tags: ["JavaScript", "API", "CSS"],
    category: "sw"
  },
  // Row 4: 1 large centered card
  {
    title: "Bank Database Management System",
    description: "Python x MySQL tutorial project for managing customer records with database creation, table operations, passbook management, and user-friendly interface via Streamlit for learning DBMS concepts.",
    image: "/images/demo.webp",
    link: "https://aakash-dbms.streamlit.app",
    tags: ["Python", "MySQL", "Streamlit"],
    category: "sw"
  }
];

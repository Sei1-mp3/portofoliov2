import { Project, Skill, Certification } from './types';
import revouCertImg from './assets/images/revou_ccse_certificate_1787870951375.jpg';
import juaraVibeImg from './assets/images/juara_vibecoding_certificate_1787870965632.jpg';

export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC0QbEoyysOrjKTBnBlxcJPieS1FFOer9-kf1GcXD4og17nY1rmoxDtZWe7EOW4r9URoniTzWBeaTq7T-GX4mCyUpCG7ZxHDBWRVqdvY2N3Z18HoWi8Dh-QjVkPQ_IFBwwFycHQzWKz2POg80b5TwKtjSIGU9HTc1EY7OhOpcIDtXxK2H6vrQEXBsKRq_EnSfS6dx2wnnLb84tEoPdtPuAfgwhPNMsmHYH43TEjxBFStYTt1FCknqoW64ObLVHCDjctww';

export const SKILLS_DATA: Skill[] = [
  {
    num: '01',
    title: 'WEB\nDEVELOPMENT',
    description:
      'Building modern, responsive, and user-focused websites with clean structure and thoughtful interactions.',
    iconType: 'code',
    technologies: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
    highlight: 'Semantic markup, modular component architecture, responsive mobile-first layouts, and accessible UI practices.',
  },
  {
    num: '02',
    title: 'FRONT-END\nDEVELOPMENT',
    description:
      'Creating responsive interfaces and interactive experiences for the modern web.',
    iconType: 'frontend',
    technologies: ['React 19', 'Next.js', 'Vite', 'Framer Motion', 'State Management', 'REST APIs'],
    highlight: 'Micro-interactions, state optimization, smooth page transitions, and modern CSS architecture.',
  },
  {
    num: '03',
    title: 'AI-ASSISTED\nDEVELOPMENT',
    description:
      'Using AI as a development partner to accelerate research, coding, debugging, and experimentation.',
    iconType: 'ai',
    technologies: ['Prompt Engineering', 'Gemini API', 'LLM Workflows', 'AI Code Generation', 'Automated Refactoring'],
    highlight: 'Integrating intelligent agentic workflows to build smarter user experiences and streamline developer velocity.',
  },
  {
    num: '04',
    title: 'PYTHON &\nAUTOMATION',
    description:
      'Building scripts, tools, and automation workflows with Python for practical use cases.',
    iconType: 'python',
    technologies: ['Python 3.x', 'Selenium / Playwright', 'Pandas & NumPy', 'Asyncio', 'Scripting & CLI Tools'],
    highlight: 'Automated data scraping, scheduled task execution, document processing, and background utility pipelines.',
  },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    num: '01',
    name: 'CCSE (CHECK POINT CERTIFIED SECURITY EXPERT & SOFTWARE ENGINEERING)',
    organization: 'REVOU (PT REVOLUSI CITA EDUKASI)',
    year: '2026',
    credentialId: 'CCSE-100826-01-1-00076',
    issueDate: '14 August 2026',
    skills: [
      'Software Engineering Fundamentals',
      'Security Architecture & Web Systems',
      'Frontend Basics (HTML/CSS/JS)',
      'Algorithmic Problem Solving',
    ],
    description:
      'Certified online Coding Camp credential (CCSE) awarded by RevoU (PT Revolusi Cita Edukasi), validating foundational competencies in software engineering, security principles, and computational architecture under CEO Matteo Sutto.',
    verificationUrl: 'https://revou.co/certificates/CCSE-100826-01-1-00076',
    imageUrl: revouCertImg,
  },
  {
    num: '02',
    name: 'JUARA VIBECODER (WINNER OF VIBECODER COMPETITION)',
    organization: 'GOOGLE DEVELOPER GROUPS',
    year: '2026',
    credentialId: 'JVC2605-82GM-64S7',
    issueDate: 'May 2026',
    skills: [
      'Vibe Coding Methodology',
      'AI-Driven Rapid Prototyping',
      'Prompt Engineering & Agentic Workflows',
      'Full-Stack Web Generation',
    ],
    description:
      'Certificate of excellence and completion presented by Google Developer Groups for dedication and winning participation in the #JuaraVibeCoding Study Jam ("Code Less, Build More"), recognizing innovative AI-accelerated web application development and creative project delivery.',
    verificationUrl: 'https://goo.gle/jvc-cert-verifier',
    imageUrl: juaraVibeImg,
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'klikaman',
    num: '01',
    category: 'AI · CYBERSECURITY · WEB APP',
    title: 'KLIKAMAN',
    shortDesc:
      'An AI-driven threat intelligence platform engineered to detect and analyze phishing URLs, scam domains, and suspicious digital links in real time.',
    fullDesc:
      'KlikAman is an intelligent cybersecurity web platform built to safeguard everyday internet users and organizations from malicious phishing campaigns, deceptive redirects, and zero-day scam links. Utilizing advanced AI heuristic models and URL tokenization, KlikAman scans submitted links, checks threat telemetry, and generates comprehensive risk scorecards with actionable prevention advice.',
    tags: ['AI Security', 'Phishing Detection', 'Cloud Run', 'React', 'Gemini AI', 'Threat Intel'],
    techStack: ['Cloud Run', 'React 19', 'TypeScript', 'Tailwind CSS', 'Google Gemini AI', 'Cybersecurity Heuristics'],
    features: [
      'Real-time deep URL structure inspection and domain reputation scoring',
      'AI-powered pattern matching for deceptive lookalike domains and credential harvesting forms',
      'Instant threat severity breakdown (Safe, Suspicious, Dangerous) with risk factors',
      'Detailed safety recommendations and threat prevention guidelines for users',
    ],
    githubUrl: 'https://github.com/satriaseiasmara/klikaman',
    liveUrl: 'https://klikaman-330894614088.asia-southeast1.run.app',
    codeSnippet: `// KlikAman AI Phishing Threat Inspector
export async function analyzePhishingThreat(targetUrl: string): Promise<ThreatReport> {
  const urlAnalysis = parseUrlHeuristics(targetUrl);
  
  const prompt = \`Analyze the following URL and domain structure for phishing and fraud indicators:
Target URL: \${targetUrl}
Hostname: \${urlAnalysis.hostname}
Entropy Score: \${urlAnalysis.entropy}
Subdomains: \${urlAnalysis.subdomains.join(', ')}

Return threat assessment:
1. Threat Level (SAFE, SUSPICIOUS, PHISHING)
2. Risk Score (0-100)
3. Identified Vectors & Anomalies
4. Protection Recommendation\`;

  const report = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return parseThreatReport(report.text);
}`,
    accentColor: '#ef4444',
  },
  {
    id: 'jokkow-project',
    num: '02',
    category: 'E-COMMERCE · DIGITAL GIFTS · WEB STORE',
    title: 'JOKKOW PROJECT',
    shortDesc:
      'A modern digital gift and creative merchandise online store delivering custom digital gifts, bespoke artwork, and seamless catalog ordering.',
    fullDesc:
      'Jokkow Project is an interactive web-based storefront and digital marketplace designed for custom gifts, digital keepsakes, and personalized creative designs. Featuring a frictionless product catalog, custom gifting configurator, order tracking, and mobile-first responsive checkout, Jokkow Project connects creative makers with customers seeking memorable personalized presents.',
    tags: ['E-Commerce', 'Vercel', 'Next.js / React', 'Tailwind CSS', 'Digital Gifts', 'Storefront'],
    techStack: ['Next.js', 'React', 'Vercel Deployment', 'Tailwind CSS', 'Interactive Catalog', 'Direct WhatsApp API'],
    features: [
      'Dynamic digital gift catalog showcasing customizable products and personalized gifts',
      'Interactive gift customization and preview for bespoke artwork and messages',
      'Frictionless mobile checkout flow with direct WhatsApp order integration',
      'Ultra-fast global edge performance deployed on Vercel with responsive design',
    ],
    githubUrl: 'https://github.com/satriaseiasmara/jokkowproject',
    liveUrl: 'https://jokkowproject-eyzur5hur-satriaseiasmara-8099s-projects.vercel.app/',
    codeSnippet: `// Jokkow Project - Digital Gift Order & Customization Pipeline
export interface DigitalGiftOrder {
  itemId: string;
  recipientName: string;
  theme: 'aesthetic' | 'vintage' | 'minimalist' | 'celebration';
  customMessage: string;
  deliveryFormat: 'digital_card' | 'interactive_link' | 'print_ready';
}

export function generateDirectCheckoutLink(order: DigitalGiftOrder): string {
  const message = \`Halo Jokkow Project! Saya ingin memesan Digital Gift:
• Item ID: \${order.itemId}
• Nama Penerima: \${order.recipientName}
• Tema: \${order.theme}
• Format: \${order.deliveryFormat}
• Pesan: "\${order.customMessage}"\`;

  return \`https://wa.me/6281234567890?text=\${encodeURIComponent(message)}\`;
}`,
    accentColor: '#ec4899',
  },
];

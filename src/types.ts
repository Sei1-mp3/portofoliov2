export interface Project {
  id: string;
  num: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: string;
  accentColor?: string;
}

export interface Skill {
  num: string;
  title: string;
  description: string;
  iconType: 'code' | 'frontend' | 'ai' | 'python';
  technologies: string[];
  highlight: string;
}

export interface Certification {
  num: string;
  name: string;
  organization: string;
  year: string;
  credentialId: string;
  issueDate: string;
  expiryDate?: string;
  skills: string[];
  description: string;
  verificationUrl: string;
  imageUrl?: string;
}

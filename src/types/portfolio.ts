export type ProjectCategory = 'all' | 'fullstack' | 'mobile';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'mobile';
  summary: string;
  description: string;
  architecture: string[];
  stack: string[];
  highlights: string[];
  challenges: string;
  role: string;
  demoUrl?: string;
  githubUrl?: string;
  isPrivateRepo?: boolean;
  privateRepoReason?: string;
  isMobileApp?: boolean;
  demoStatusLabel?: string;
  imageUrl: string;
  imageFit?: 'cover' | 'contain';
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export type TechLayer = 'client' | 'backend' | 'database' | 'devops';

export interface TechItem {
  name: string;
  category: 'frontend' | 'mobile' | 'backend' | 'tools';
  layer: TechLayer;
  iconKey: string;
  color: string;
  experienceYears?: string;
  usageContext: string;
  projectLinks?: string[];
  roleTag?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  badge?: string;
  category?: 'education' | 'bootcamp' | 'project' | 'security';
  description: string;
  highlights?: string[];
  tech: string[];
}

export interface ProfileData {
  name: string;
  tagline: string;
  education: string;
  status: string;
  bio: string;
  experienceStart: string;
  avatarUrl: string;
  interests: string[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
}

export interface Profile {
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website: string;
  photo: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface About {
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  paragraphs: string[];
  stats: Stat[];
}

export interface Skill {
  name: string;
  category: string;
}

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface Project {
  name: string;
  period: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
  linkLabel?: string;
  demoLink?: string;
  demoLabel?: string;
  highlight?: boolean;
  highlightLabel?: string;
  status?: string;
  screenshots?: ProjectScreenshot[];
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  honors: string;
}

export interface Resume {
  profile: Profile;
  about: About;
  skills: Skill[];
  projectsIntro: string;
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

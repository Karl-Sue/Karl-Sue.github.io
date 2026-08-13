interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface ProjectsSectionProps {
  projects: Project[];
}
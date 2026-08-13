export interface Role {
  position: string;
  startDate: string; // YYYY-MM
  endDate: string;   // YYYY-MM or "present"
  type?: string;
  location?: string;
  description?: string;
  achievements?: string[];
  skills?: string[];
}

interface Experience {
  company: string;
  locationType?: string;
  roles: Role[];
}

export interface ExperienceSectionProps {
  experiences: Experience[];
}
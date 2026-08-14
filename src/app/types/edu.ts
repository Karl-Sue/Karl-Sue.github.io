interface Education {
    school: string;
    degree: string;
    field: string;
    period: string;
    description?: string;
    logo?: string;
}

export interface EducationSectionProps {
  education: Education[];
}
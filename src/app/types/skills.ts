interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}
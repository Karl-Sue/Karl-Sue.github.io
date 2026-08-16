import { useEffect } from "react";
import { ProfileHeader } from "../components/ProfileHeader";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { incrementProfileViews } from "../utils/worker";

const profileData = {
  name: "Karl Hoang",
  title: "Junior Software Engineer | Aspiring DevOps Engineer | AWS Certified Developer – Associate",
  location: "Perth, WA",
  email: "tuankhanh17032003@gmail.com",
  phone: "+61478038909",
  linkedIn: "https://www.linkedin.com/in/tuan-khanh-hoang-1a8a9b275/",
  github: "https://github.com/Karl-Sue",
  imageUrl: "/profile.jpg",
  bio: `I am a Software Engineering student at the University of Western Australia (UWA) with a focus on backend development, cloud-native architectures, and DevOps. As an AWS Certified Developer – Associate, I have practical experience designing cloud solutions utilizing Lambda, DynamoDB, IAM, and CloudWatch, along with CI/CD integration. Recently, I have also developed hands-on proficiency with Microsoft Azure through enterprise-focused academic projects, working with Logic Apps, Azure App Service, and Azure Static Web Apps. Passionate about Golang, Python, automation, and distributed systems, I am seeking opportunities to contribute to real-world production pipelines and scalable backend infrastructure.`,
};

const skillCategories = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", level: "Beginner" as const },
      { name: "TypeScript", level: "Intermediate" as const },
      { name: "Next.js", level: "Intermediate" as const },
      { name: "Tailwind CSS", level: "Beginner" as const },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", level: "Beginner" as const },
      { name: "Python", level: "Intermediate" as const },
      { name: "Golang", level: "Beginner" as const },
      { name: "C#", level: "Beginner" as const },
      { name: "PostgreSQL", level: "Beginner" as const },
      { name: "MongoDB", level: "Beginner" as const },
      { name: "MySQL", level: "Intermediate" as const },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: "Intermediate" as const },
      { name: "Docker", level: "Intermediate" as const },
      { name: "Kubernetes", level: "Beginner" as const },
      { name: "CI/CD", level: "Beginner" as const },
      { name: "Git Actions", level: "Intermediate" as const },
      { name: "Azure", level: "Beginner" as const },
    ],
  },
  {
    category: "Tools & Methodologies",
    skills: [
      { name: "Git", level: "Intermediate" as const },
      { name: "Agile/Scrum", level: "Beginner" as const },
      { name: "Testing (Jest/Cypress)", level: "Intermediate" as const },
      { name: "Figma", level: "Intermediate" as const },
    ],
  },
];

export function AboutPage() {
  useEffect(() => {
    // Check if user has already visited in this session
    if (!sessionStorage.getItem("has_viewed_profile")) {
      sessionStorage.setItem("has_viewed_profile", "true");
      incrementProfileViews();
    }
  }, []);

  return (
    <div>
      <ProfileHeader {...profileData} />
      <AboutSection bio={profileData.bio} />
      <SkillsSection skillCategories={skillCategories} />
    </div>
  );
}

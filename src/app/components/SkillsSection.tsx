import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

import { SkillsSectionProps } from '../types';

const getIconUrl = (tech: string) => {
  const deviconMap: Record<string, string> = {
    "react": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "nextjs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "tailwind css": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "tailwindcss": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "nodejs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "golang": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    "go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    "c#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    "csharp": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    "postgresql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "postgres": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "mongodb": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "mysql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    "aws": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "amazon web services": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "amazonwebservices": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    "docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    "git actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    "gitaction": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    "github actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    "azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "microsoft azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "microsoftazure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    "jest": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    "cypress": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg",
    "testing (jest/cypress)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg"
  };
  
  const key = tech.toLowerCase().trim();
  return deviconMap[key] || null;
};

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const getLevelColor = (level?: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Advanced":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Intermediate":
        return "bg-green-100 text-green-800 border-green-300";
      case "Beginner":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold mb-8 text-gray-900">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="font-serif text-xl font-semibold mb-3 text-gray-900">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => {
                  const iconUrl = getIconUrl(skill.name);
                  return (
                    <Badge
                      key={skillIdx}
                      variant="outline"
                      className={`inline-flex items-center gap-1.5 ${getLevelColor(skill.level)}`}
                    >
                      {iconUrl && (
                        <img 
                          src={iconUrl} 
                          alt={skill.name} 
                          className="w-3.5 h-3.5 object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      {skill.name}
                      {skill.level && (
                        <span className="ml-1 text-xs opacity-75">
                          ({skill.level})
                        </span>
                      )}
                    </Badge>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

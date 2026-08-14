import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

import { ProjectsSectionProps } from '../types';

const getIconUrl = (tech: string) => {
  const deviconMap: Record<string, string> = {
    "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "nextjs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "react": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "selenium": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
    "fastapi": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    "go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    "golang": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    "mongodb": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "postgresql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "postgres": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    "docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "digital ocean": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original.svg",
    "kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
    "grpc": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grpc/grpc-original.svg",
    "redis": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
    "mysql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    "gitaction": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    "github actions": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
    "azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "microsoft azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    "django": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    "sqlite": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
    "dotnet": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
    ".net": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
    "tailwind css": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "flask": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg"
  };

  const key = tech.toLowerCase().trim();
  return deviconMap[key] || null;
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20 transition-all duration-300 hover:-translate-y-1.5"
            >
              
              {project.image && (
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mt-3 mb-6 text-[15px]">
                    {project.description}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, techIdx) => {
                      const iconUrl = getIconUrl(tech);
                      return (
                        <Badge 
                          key={techIdx} 
                          variant="secondary"
                          className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200/80 border-none px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                        >
                          {iconUrl && (
                            <img 
                              src={iconUrl} 
                              alt={tech} 
                              className="w-3.5 h-3.5 object-contain"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          )}
                          {tech}
                        </Badge>
                      );
                    })}
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-lg transition-all duration-150 hover:translate-y-[1px] active:translate-y-[2px] active:bg-gray-200"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3.5 py-2 rounded-lg transition-all duration-150 hover:translate-y-[1px] active:translate-y-[2px] active:bg-gray-200"
                      >
                        <Github className="w-4 h-4 text-gray-800" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

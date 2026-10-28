import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Server, Cloud, Terminal, Workflow, Kanban, ExternalLink, Github, Sparkles } from "lucide-react";
import { SkillsSectionProps } from '../types';
import { projects } from "../data/projects";

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
  "testing (jest/cypress)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
  "agile/scrum": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
  "agile": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
  "scrum": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
};

const getIconUrl = (tech: string) => {
  const key = tech.toLowerCase().trim();
  return deviconMap[key] || null;
};

const getSkillFallbackIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("ci/cd") || lower.includes("pipeline")) return Workflow;
  if (lower.includes("agile") || lower.includes("scrum")) return Kanban;
  return Code2;
};


const getProjectsForSkill = (skillName: string) => {
  const key = skillName.toLowerCase().trim();
  return projects.filter(p =>
    p.technologies.some(tech => {
      const t = tech.toLowerCase().trim();
      if (key === "golang" || key === "go") return t === "go" || t === "golang";
      if (key === "python") return t === "python" || t === "django" || t === "flask";
      if (key === "react") return t === "react" || t.includes("next");
      if (key === "next.js" || key === "nextjs") return t.includes("next");
      if (key === "tailwind css" || key === "tailwindcss") return t.includes("tailwind");
      if (key === "node.js" || key === "nodejs") return t.includes("node");
      if (key === "git actions" || key === "github actions") return t.includes("action") || t.includes("gitaction");
      if (key === "c#") return t === "c#" || t === ".net" || t.includes("dotnet");
      if (key === "testing (jest/cypress)") return t.includes("jest") || t.includes("cypress") || t.includes("testing");
      return t === key || t.includes(key) || key.includes(t);
    })
  );
};

const getCategoryMeta = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes("front")) {
    return {
      icon: Code2,
      subtitle: "Client Applications & UI",

    };
  }
  if (lower.includes("back")) {
    return {
      icon: Server,
      subtitle: "APIs, Runtimes & Data",

    };
  }
  if (lower.includes("cloud") || lower.includes("devops")) {
    return {
      icon: Cloud,
      subtitle: "Infrastructure & CI/CD",

    };
  }
  return {
    icon: Terminal,
    subtitle: "Workflow, Testing & Design",

  };
};

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills-section" className="pt-10 pb-14 border-t border-gray-200 bg-white scroll-mt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900">
              Skills & Technologies
            </h2>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-500">
              Technical Competencies & Toolchain
            </p>
          </div>
          <span className="text-xs font-medium text-gray-500 mt-2 sm:mt-0">
            {totalSkills} Skills Across {skillCategories.length} Domains
          </span>
        </div>

        {/* Natural Row Layout */}
        <div className="divide-y divide-gray-200">
          {skillCategories.map((category, idx) => {
            const { icon: CategoryIcon, subtitle } = getCategoryMeta(category.category);

            // Bring skills with associated projects to the front across all domains.
            // In Backend Development, ensure Python and Golang are the top priority.
            const sortedSkills = [...category.skills].sort((a, b) => {
              const aName = a.name.toLowerCase().trim();
              const bName = b.name.toLowerCase().trim();

              if (category.category.toLowerCase().includes("back")) {
                const aPriority = aName === "python" ? 1 : aName === "golang" || aName === "go" ? 2 : 99;
                const bPriority = bName === "python" ? 1 : bName === "golang" || bName === "go" ? 2 : 99;
                if (aPriority !== bPriority) return aPriority - bPriority;
              }

              const aProjects = getProjectsForSkill(a.name).length;
              const bProjects = getProjectsForSkill(b.name).length;

              if (aProjects > 0 && bProjects === 0) return -1;
              if (bProjects > 0 && aProjects === 0) return 1;
              if (aProjects !== bProjects) return bProjects - aProjects;

              return 0;
            });

            return (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 md:gap-8 items-start py-7 first:pt-2 last:pb-2"
              >
                {/* Domain Title Column */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center shrink-0 mt-0.5 text-gray-900"
                  >
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-snug">
                      {category.category}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {subtitle} <span className="text-gray-300 mx-1">•</span> {category.skills.length} tools
                    </p>
                  </div>
                </div>

                {/* CV Skill Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {sortedSkills.map((skill, skillIdx) => {
                    const iconUrl = getIconUrl(skill.name);
                    const FallbackIcon = getSkillFallbackIcon(skill.name);
                    const relevantProjects = getProjectsForSkill(skill.name);
                    const hasProjects = relevantProjects.length > 0;
                    const isPopupOpen = activePopup === skill.name;

                    return (
                      <div
                        key={skillIdx}
                        className={`relative group/popover ${isPopupOpen ? "z-40" : "z-10"}`}
                        onMouseEnter={() => hasProjects && setActivePopup(skill.name)}
                        onMouseLeave={() => hasProjects && setActivePopup(null)}
                      >
                        <div
                          className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200/90 bg-white hover:border-gray-300 hover:bg-gray-50/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-150 ${
                            hasProjects ? "cursor-pointer hover:border-blue-400" : "cursor-default"
                          }`}
                        >
                          <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                            {iconUrl ? (
                              <img
                                src={iconUrl}
                                alt={skill.name}
                                className="w-4 h-4 object-contain"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <FallbackIcon className="w-3.5 h-3.5 text-gray-500" />
                            )}
                          </div>

                          <span className="text-[13px] font-semibold tracking-tight text-gray-900">
                            {skill.name}
                          </span>

                          {skill.level && (
                            <span
                              className={`text-[10px] font-medium tracking-wide uppercase pl-1.5 border-l border-gray-200 ${
                                skill.level === "Intermediate"
                                  ? "text-blue-700 font-semibold"
                                  : "text-gray-500"
                              }`}
                            >
                              {skill.level}
                            </span>
                          )}
                        </div>

                        {/* Hover Popup for Skills with Projects */}
                        {hasProjects && isPopupOpen && (
                          <div
                            className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 z-50 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200/95 bg-white p-3.5 shadow-xl shadow-gray-900/10 transition-all duration-200 after:absolute after:top-full after:left-0 after:right-0 after:h-3 after:content-['']"
                          >
                            {/* Downward Pointer Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white drop-shadow-xs" />

                            {/* Popup Header */}
                            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                {iconUrl && <img src={iconUrl} alt={skill.name} className="w-4 h-4 object-contain" />}
                                <span className="text-xs font-bold text-gray-900">
                                  {skill.name} Projects
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
                                {relevantProjects.length} {relevantProjects.length === 1 ? "project" : "projects"}
                              </span>
                            </div>

                            {/* Projects List */}
                            <div className="mt-2.5 space-y-2.5">
                              {relevantProjects.slice(0, 3).map((proj, pIdx) => (
                                <div key={pIdx} className="group/item">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-xs font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">
                                      {proj.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {proj.github && (
                                        <a
                                          href={proj.github}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-gray-400 hover:text-gray-800 transition-colors"
                                          title="GitHub Repository"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Github className="w-3.5 h-3.5" />
                                        </a>
                                      )}
                                      {proj.link && (
                                        <a
                                          href={proj.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-gray-400 hover:text-blue-600 transition-colors"
                                          title="Live Demo"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-gray-600 line-clamp-2 mt-0.5 leading-snug">
                                    {proj.description}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Popup Footer */}
                            <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                              <span className="text-gray-400 text-[10px] flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-blue-500" /> Featured work
                              </span>
                              <Link
                                to="/projects"
                                className="font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
                              >
                                View in Projects <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

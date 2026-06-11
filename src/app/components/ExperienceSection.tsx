import { Briefcase } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface Role {
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

interface ExperienceSectionProps {
  experiences: Experience[];
}

const parseYearMonth = (str: string): Date => {
  if (str.toLowerCase() === "present") {
    return new Date();
  }
  const [year, month] = str.split("-").map(Number);
  return new Date(year, month - 1, 1);
};

const getDurationInMonths = (start: Date, end: Date): number => {
  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();
  // Include starting month in duration calculation
  return yearsDiff * 12 + monthsDiff + 1;
};

const formatDuration = (months: number): string => {
  if (months <= 0) return "";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  const parts = [];
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  }
  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`);
  }
  return parts.join(" ");
};

const formatMonthYear = (dateStr: string): string => {
  if (dateStr.toLowerCase() === "present") return "Present";
  const date = parseYearMonth(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const getCompanyDuration = (roles: Role[]): string => {
  if (roles.length === 0) return "";
  const parsedDates = roles.flatMap(r => [parseYearMonth(r.startDate), parseYearMonth(r.endDate)]);
  const minDate = new Date(Math.min(...parsedDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...parsedDates.map(d => d.getTime())));
  const totalMonths = getDurationInMonths(minDate, maxDate);
  return formatDuration(totalMonths);
};

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {experiences.map((exp, idx) => {
          const totalDuration = getCompanyDuration(exp.roles);
          return (
            <Card key={idx} className="p-6 md:p-8 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5 items-start">
                {/* Logo/Icon Container */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center font-serif text-lg font-bold text-blue-600 shadow-sm">
                    {exp.company.charAt(0)}
                  </div>
                </div>
                
                {/* Company Info & Timeline */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight truncate">{exp.company}</h3>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-sm text-gray-500">
                      {totalDuration && <span>{totalDuration}</span>}
                      {totalDuration && exp.locationType && <span>•</span>}
                      {exp.locationType && <span>{exp.locationType}</span>}
                    </div>
                  </div>
                
                {/* Timeline of Roles */}
                <div className="relative pl-6 border-l-2 border-gray-150 space-y-8 mt-6">
                  {exp.roles.map((role, rIdx) => (
                    <div key={rIdx} className="relative group">
                      {/* Timeline Node Point */}
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white bg-gray-300 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-200 shadow-sm" />
                      
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {role.position}
                          </h4>
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap self-start sm:self-auto">
                            {formatMonthYear(role.startDate)} - {formatMonthYear(role.endDate)} &middot; {formatDuration(getDurationInMonths(parseYearMonth(role.startDate), parseYearMonth(role.endDate)))}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 items-center text-sm text-gray-500">
                          {role.type && <span className="font-medium text-gray-700">{role.type}</span>}
                          {role.type && role.location && <span>•</span>}
                          {role.location && <span>{role.location}</span>}
                        </div>

                        {role.description && (
                          <p className="text-[15px] text-gray-600 leading-relaxed pt-1">
                            {role.description}
                          </p>
                        )}

                        {role.achievements && role.achievements.length > 0 && (
                          <ul className="list-disc pl-4 space-y-1.5 text-[14px] text-gray-600 pt-1 leading-relaxed">
                            {role.achievements.map((ach, aIdx) => (
                              <li key={aIdx}>{ach}</li>
                            ))}
                          </ul>
                        )}

                        {role.skills && role.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2 items-center">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Skills:</span>
                            {role.skills.map((skill, sIdx) => (
                              <Badge 
                                key={sIdx} 
                                variant="secondary"
                                className="bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200/50 text-[11px] px-2 py-0.5 rounded-md font-medium"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          );
        })}
      </div>
    </section>
  );
}

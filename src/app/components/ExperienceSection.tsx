import { Role, ExperienceSectionProps } from '../types';

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
      <div className="max-w-5xl mx-auto border-t border-gray-900/15">
        {experiences.map((exp, idx) => {
          const totalDuration = getCompanyDuration(exp.roles);
          return (
            <article key={idx} className="grid gap-8 border-b border-gray-900/15 py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-14">
              <header>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-gray-900">{exp.company}</h3>
                <div className="mt-2 space-y-1 text-xs uppercase tracking-[0.12em] text-gray-500">
                  {totalDuration && <p>{totalDuration}</p>}
                  {exp.locationType && <p>{exp.locationType}</p>}
                </div>
              </header>

              <div className="relative border-l border-gray-900/20">
                {exp.roles.map((role, rIdx) => {
                  const isCurrent = role.endDate.toLowerCase() === "present";
                  return (
                    <div key={rIdx} className={`group relative pl-7 ${rIdx < exp.roles.length - 1 ? "pb-12" : ""}`}>
                      <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#f4f2ee] ${isCurrent ? "bg-gray-900" : "bg-gray-400"}`} />

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-xl font-semibold tracking-tight text-gray-900">{role.position}</h4>
                            {isCurrent && <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-900">Current</span>}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            {role.type && <span>{role.type}</span>}
                            {role.type && role.location && <span aria-hidden="true">/</span>}
                            {role.location && <span>{role.location}</span>}
                          </div>
                        </div>
                        <span className="shrink-0 text-xs uppercase tracking-[0.08em] text-gray-500 sm:text-right">
                          {formatMonthYear(role.startDate)} - {formatMonthYear(role.endDate)}
                          <span className="block normal-case tracking-normal">{formatDuration(getDurationInMonths(parseYearMonth(role.startDate), parseYearMonth(role.endDate)))}</span>
                        </span>
                      </div>

                      {role.description && <p className="mt-5 max-w-2xl text-[15px] leading-7 text-gray-600">{role.description}</p>}

                      {role.achievements && role.achievements.length > 0 && (
                        <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-[14px] leading-6 text-gray-600 marker:text-gray-400">
                          {role.achievements.map((ach, aIdx) => <li key={aIdx}>{ach}</li>)}
                        </ul>
                      )}

                      {role.skills && role.skills.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                          {role.skills.map((skill, sIdx) => <span key={sIdx}>{skill}</span>)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

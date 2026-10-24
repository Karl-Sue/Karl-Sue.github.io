import { GraduationCap } from "lucide-react";

import { EducationSectionProps } from '../types';


export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-0">
      <div className="max-w-5xl">
        {education.map((edu, idx) => (
          <article
            key={idx}
            className={`grid gap-5 border-b border-gray-900/10 py-7 md:grid-cols-[minmax(0,1fr)_180px] md:items-start md:gap-10 ${
              idx === 0 ? "border-l-2 border-blue-600 pl-5" : ""
            }`}
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                {edu.logo ? (
                  <img src={edu.logo} alt={edu.school} className="h-full w-full object-contain p-1" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-xl font-bold tracking-tight text-gray-900 md:text-2xl">{edu.degree}</h3>
                <p className="mt-1 text-[16px] font-medium text-gray-700">{edu.school}</p>
                <p className="mt-0.5 text-sm text-gray-500">{edu.field}</p>
                {edu.description && <p className="mt-3 text-sm font-semibold text-blue-700">{edu.description}</p>}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 md:pt-1 md:text-right">{edu.period}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

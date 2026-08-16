import { GraduationCap } from "lucide-react";
import { Card } from "./ui/card";

import { EducationSectionProps } from '../types';


export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto space-y-4">
          {education.map((edu, idx) => (
            <Card key={idx} className="p-6 border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-xl border border-gray-150 flex items-center justify-center overflow-hidden">
                    {edu.logo ? (
                      <img 
                        src={edu.logo} 
                        alt={edu.school} 
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <GraduationCap className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                    <h3 className="font-serif text-xl font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-[16px] text-gray-700 font-medium">{edu.school}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{edu.field}</p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 bg-gray-50 inline-block px-2.5 py-1 rounded-md border border-gray-100">{edu.description}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
      </div>
    </section>
  );
}

import { GraduationCap, Award, Compass } from "lucide-react";

interface AboutSectionProps {
  bio?: string;
}

const keyFacts = [
  {
    icon: GraduationCap,
    label: "Education",
    primary: "Software Engineering",
    secondary: "University of Western Australia",
  },
  {
    icon: Award,
    label: "Certification",
    primary: "AWS Certified Developer",
    secondary: "Associate Level (Active)",
    badge: "AWS Certified",
  },
  {
    icon: Compass,
    label: "Core Specialization",
    primary: "Cloud & Distributed Systems",
    secondary: "Backend, DevOps & CI/CD Pipelines",
  },
];

const focusAreas = [
  "Backend Engineering",
  "Cloud Architecture",
  "DevOps & Automation",
  "Distributed Systems",
];

export function AboutSection({ bio }: AboutSectionProps) {
  return (
    <section className="pt-12 pb-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header - Harmonized with Skills */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-10 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900">
              About Me
            </h2>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gray-500 font-medium">
              Background & Engineering Philosophy
            </p>
          </div>
          <span className="text-xs text-gray-500 font-medium tracking-wide mt-2 sm:mt-0">
            Perth, WA • Available for Graduate & Junior Roles
          </span>
        </div>

        {/* Executive 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 md:gap-12 items-start">
          {/* Left Column: Typographic Fact Sheet */}
          <div className="space-y-6 md:border-r md:border-gray-100 md:pr-8">
            {keyFacts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div key={idx} className="group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 transition-colors" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      {fact.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-[15px] font-semibold text-gray-900 leading-snug">
                    {fact.primary}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal mt-0.5 leading-relaxed">
                    {fact.secondary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Editorial Narrative & Focus Tags */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4 text-justify [text-justify:inter-word]">
              <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                I am a Software Engineering student at the University of Western Australia, with a dedicated focus on building resilient backend services, cloud-native architectures, and automated DevOps infrastructure.
              </p>

              {/* Supporting Detail Narrative */}
              <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                As an AWS Certified Developer – Associate, I bring hands-on experience architecting serverless solutions with Lambda, DynamoDB, IAM, and CloudWatch. Recently, I have also expanded into enterprise-focused Microsoft Azure workflows, delivering production-oriented solutions using Logic Apps, Azure App Service, and Static Web Apps.
              </p>

              <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                I am deeply passionate about high-concurrency systems in Golang, clean automation with Python, and continuous deployment workflows that eliminate friction between development and operations.
              </p>
            </div>

            {/* Focus Tags */}
            <div className="pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.14em] mr-1">
                Core Focus:
              </span>
              {focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200/80"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

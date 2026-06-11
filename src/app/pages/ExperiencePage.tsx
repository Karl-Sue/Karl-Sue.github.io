import { ExperienceSection } from "../components/ExperienceSection";

const experiences = [
  {
    company: "Teach Learn Grow (TLG)",
    locationType: "On-site",
    roles: [
      {
        position: "Volunteer System Engineer",
        startDate: "2026-05",
        endDate: "present",
        type: "Volunteer",
        location: "Perth, Western Australia, Australia",
        achievements: [
          "Using Python to automate processes, maintain system uptime, and catch faults early.",
          "Partnering closely with internal teams to understand their day-to-day operations and business workflows."
        ],
        skills: ["Python", "Google Cloud Platform (GCP)"]
      },
      {
        position: "System Engineer (Intern)",
        startDate: "2026-02",
        endDate: "2026-05",
        type: "Internship",
        location: "Perth, WA",
        description: "Managed and improved core systems like GCP and Salesforce to keep business operations running smoothly. I focused on connecting different software tools, automating manual tasks using Agile methods, and creating clear technical guides to help the team scale.",
        achievements: [
          "Learn Salesforce development, with its integrated service, role-based control access",
          "Document data model to help the subsequent work",
          "Using Python to automate processes, maintain system uptime, and catch faults early",
          "Troubleshooting current problems with current GCP solution"
        ]
      }
    ]
  },
  {
    company: "Coders for Causes",
    roles: [
      {
        position: "Junior Full Stack Developer",
        startDate: "2025-11",
        endDate: "2026-02",
        description: "Designed and developed a full-stack web application for the University of Western Australia Game Development Club, collaborating within a cross-functional development team to deliver a functional and user-focused solution.",
        achievements: [
          "Designed and implemented the frontend using Figma, translating user requirements into intuitive UI components.",
          "Architected and developed the backend and database layer using the Django framework.",
          "Collaborated closely with frontend and backend developers to ensure seamless system integration.",
          "Identified, debugged, and resolved application issues to meet functional and user experience requirements."
        ]
      }
    ]
  },
  {
    company: "Volunteer Software Engineer",
    roles: [
      {
        position: "Full Stack Developer",
        startDate: "2025-08",
        endDate: "2025-11",
        description: "Developed an internal system enabling employees to access and utilize company research resources.",
        achievements: [
          "Database and Frontend Design: Assisted in designing database schemas with ASP.NET (C#) and setting up the frontend with Next.js.",
          "System Security & Data Integrity: Contributed to improving system security while ensuring data structure accuracy and integrity.",
          "Bug Identification and Resolution: Helped identify existing bugs and implemented effective solutions to improve reliability.",
          "System Design Participation: Collaborated in defining architecture and system-level design decisions."
        ]
      }
    ]
  }
];

export function ExperiencePage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="font-serif text-5xl font-bold mb-8 text-gray-900">Experience</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            A comprehensive overview of my professional journey
          </p>
        </div>
        <ExperienceSection experiences={experiences} />
      </div>
    </div>
  );
}

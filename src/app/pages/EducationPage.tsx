import { EducationSection } from "../components/EducationSection";
import { Award } from "lucide-react";

const education = [
  {
    school: "University of Western Australia",
    degree: "Master of Information Technology",
    field: "Software System",
    period: "Jul 2024 - Jul 2026",
    description: "Graduated · WAM: 78.8/100",
    logo: "/UWA logo.png",
  },
  {
    school: "Macquarie University",
    degree: "Bachelor of Commerce",
    field: "International Business",
    period: "Jul 2023 - Jul 2024",
    description: "WAM: 74.375/100",
    logo: "/MQ logo.png",
  },
  {
    school: "International School of Business",
    degree: "Bachelor of Commerce",
    field: "International Business",
    period: "Jul 2021 - Jul 2023",
    description: "GPA: 3.5/4.0",
    logo: "/ISB logo.png",
  },
];

const certifications = [
  {
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "2025 - 2028",
    logo: "/AWS badge.png",
    verification_id: "c2857a05245f4b8099fec51b17cf6e16",
    url: "https://cp.certmetrics.com/amazon/en/public/verify/credential/c2857a05245f4b8099fec51b17cf6e16",
  }
];

export function EducationPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_250px]">
          <div>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Academic record · 2021–2026</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900">Education</h2>
            </div>
            <EducationSection education={education} />
          </div>

          <aside className="border-l-2 border-blue-600 pl-5 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Professional credential</p>
            {certifications.map((cert, idx) => (
              <div key={idx} className="mt-6">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-1">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.issuer} className="h-full w-full object-contain" />
                  ) : (
                    <Award className="h-7 w-7 text-blue-600" />
                  )}
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug text-gray-900">{cert.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{cert.issuer}</p>
                <p className="mt-1 text-sm text-gray-500">Valid {cert.date}</p>
                {cert.verification_id && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Verify credential →
                  </a>
                )}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

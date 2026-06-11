import { EducationSection } from "../components/EducationSection";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Award } from "lucide-react";

const education = [
  {
    school: "University of Western Australia",
    degree: "Master of Information Technology",
    field: "Software System",
    period: "Jul 2024 - Jul 2026",
    description: "GPA: 6.25/7",
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
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="font-serif text-5xl font-bold mb-8 text-gray-900">Education</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            My academic background and professional certifications
          </p>
        </div>

        <EducationSection education={education} />

        <div className="mt-12">
          <h2 className="text-3xl mb-6 font-serif font-bold text-gray-900">Certifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                      {cert.logo ? (
                        <img 
                          src={cert.logo} 
                          alt={cert.issuer} 
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Award className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{cert.issuer}</p>
                    {cert.verification_id && (
                      <p className="text-xs text-gray-500 mb-3 font-mono">
                        Credential ID:{" "}
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-700 hover:underline select-all font-medium"
                        >
                          {cert.verification_id}
                        </a>
                      </p>
                    )}
                    <Badge variant="secondary">{cert.date}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

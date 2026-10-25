import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Copy, Check, ExternalLink, Clock } from "lucide-react";

const contactInfo = {
  email: "tuankhanh17032003@gmail.com",
  phone: "+61478038909",
  phoneDisplay: "+61 478 038 909",
  location: "Perth, WA",
  timezone: "AWST (UTC+8)",
  linkedIn: "https://www.linkedin.com/in/tuan-khanh-hoang-1a8a9b275/",
  github: "https://github.com/Karl-Sue",
};

export function ContactPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="py-8 sm:py-12 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 sm:mb-10 pb-4 border-b border-gray-200">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900">
              Get in Touch
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gray-500 font-medium">
              Communication Channels & Inquiries
            </p>
          </div>
          <span className="text-xs text-gray-500 font-medium tracking-wide mt-2 sm:mt-0">
            Perth, WA • Open to Graduate & Junior Opportunities
          </span>
        </div>

        {/* 2-Column Executive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-start">
          {/* Left Column: Context & Availability */}
          <div className="space-y-6 md:border-r md:border-gray-200 md:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 text-emerald-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Roles</span>
            </div>

            <div className="space-y-2.5">
              <h2 className="font-serif text-xl font-bold text-gray-900 tracking-tight leading-snug">
                Let's discuss engineering opportunities.
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                Whether you're exploring backend architectures, cloud-native deployments in AWS or Azure, distributed systems in Go/Python, or graduate positions - my inbox is always open.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2.5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Perth, Western Australia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Timezone: {contactInfo.timezone}</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <a
                href={contactInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right Column: Channels & Direct Actions */}
          <div className="space-y-3.5">
            {/* Email Card */}
            <div className="group rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 hover:border-gray-300 hover:shadow-xs transition-all duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg border border-gray-200/80 bg-gray-50 flex items-center justify-center shrink-0 text-gray-700 group-hover:text-blue-600 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all block mt-0.5"
                    >
                      {contactInfo.email}
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Direct inbox for opportunities & inquiries</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0 pl-13 sm:pl-0">
                  <button
                    onClick={() => handleCopy(contactInfo.email, "email")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copiedKey === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    <span>Write</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 hover:border-gray-300 hover:shadow-xs transition-all duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg border border-gray-200/80 bg-gray-50 flex items-center justify-center shrink-0 text-gray-700 group-hover:text-blue-600 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      Mobile
                    </p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors block mt-0.5"
                    >
                      {contactInfo.phoneDisplay}
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Available for phone & video calls</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0 pl-13 sm:pl-0">
                  <button
                    onClick={() => handleCopy(contactInfo.phone, "phone")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Copy phone number"
                  >
                    {copiedKey === "phone" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>Call</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="group rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 hover:border-gray-300 hover:shadow-xs transition-all duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg border border-gray-200/80 bg-gray-50 flex items-center justify-center shrink-0 text-gray-700 group-hover:text-blue-600 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      LinkedIn
                    </p>
                    <a
                      href={contactInfo.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate block mt-0.5"
                    >
                      tuan-khanh-hoang
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Professional profile & network</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0 pl-13 sm:pl-0">
                  <a
                    href={contactInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="group rounded-xl border border-gray-200/90 bg-white p-4 sm:p-5 hover:border-gray-300 hover:shadow-xs transition-all duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg border border-gray-200/80 bg-gray-50 flex items-center justify-center shrink-0 text-gray-700 group-hover:text-gray-900 group-hover:bg-gray-100 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                      GitHub
                    </p>
                    <a
                      href={contactInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate block mt-0.5"
                    >
                      github.com/Karl-Sue
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">Open source codebases & repositories</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0 pl-13 sm:pl-0">
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>View Repositories</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

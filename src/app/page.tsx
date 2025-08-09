"use client";
import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  FileText,
  Printer,
  Sparkles,
  Palette,
  CheckCircle2,
} from "lucide-react";

// Fancy, printable React resume with ATS mode and theme toggles.
// Tailwind classes are used throughout; controls are hidden when printing.
// Deploy on Vercel as a Next.js/React page or a Vite build output.

export default function ResumeApp() {
  const [theme, setTheme] = useState<"classic" | "neon" | "slate">("slate");
  const [atsMode, setAtsMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const themeClasses = useMemo(() => {
    if (atsMode) return "bg-white text-zinc-900"; // ATS: keep it simple
    switch (theme) {
      case "classic":
        return "bg-gradient-to-br from-white via-zinc-50 to-zinc-100 text-zinc-900";
      case "neon":
        return "bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-emerald-900 text-white";
      default:
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100";
    }
  }, [theme, atsMode]);

  const chip = (text: string) => (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        atsMode ? "bg-zinc-100 text-zinc-700" : "bg-black/10 dark:bg-white/10"
      }`}
    >
      {text}
    </span>
  );

  const SectionTitle: React.FC<{ label: string }> = ({ label }) => (
    <h3
      className={`mt-8 mb-3 font-semibold tracking-wide ${
        atsMode ? "text-zinc-900" : "text-primary"
      }`}
    >
      {label}
    </h3>
  );

  const Badge: React.FC<{ icon?: React.ReactNode; label: string }> = ({
    icon,
    label,
  }) => (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/10 dark:bg-white/10">
      {icon} {label}
    </span>
  );

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors`}>
      <style>{`
        @page { size: A4; margin: 14mm; }
        @media print {
          .no-print { display: none !important; }
          .print-bg { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          html, body { background: white !important; }
          /* Print legibility + pagination */
          .print-friendly { color: #000 !important; background: #fff !important; }
          .avoid-break { break-inside: avoid; page-break-inside: avoid; }
          .force-break-after { break-after: page; page-break-after: always; }
          .clean-link { color: #000 !important; text-decoration: none !important; }
        }
      `}</style>

      {/* Top control bar (hidden on print) */}
      <div className="no-print sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-3 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 mr-auto">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Michael Palmer — Resume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <select
                aria-label="Theme"
                className="border rounded-md px-2 py-1 bg-white"
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
              >
                <option value="slate">Oil & Gas Slate</option>
                <option value="classic">Classic</option>
                <option value="neon">Neon</option>
              </select>
            </div>
            <label className="inline-flex items-center gap-2 ml-2">
              <input
                type="checkbox"
                checked={atsMode}
                onChange={(e) => setAtsMode(e.target.checked)}
              />
              <span>ATS Mode</span>
            </label>
            <Button variant="secondary" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Print / PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Page */}
      <main
        ref={printRef}
        className="mx-auto max-w-4xl px-6 pb-16 print:pb-0 print-bg print-friendly"
      >
        <header className={`pt-10 pb-6 ${atsMode ? "" : ""}`}>
          <h1
            className={`text-3xl font-bold tracking-tight ${
              atsMode ? "text-zinc-900" : ""
            }`}
          >
            Michael Palmer
          </h1>
          <p
            className={`mt-2 text-sm ${
              atsMode ? "text-zinc-700" : "text-white/80 dark:text-slate-300"
            }`}
          >
            Houston, TX · (980) 333-3936 ·
            {atsMode ? (
              "palmer.mikepalmer@gmail.com"
            ) : (
              <a
                href="mailto:palmer.mikepalmer@gmail.com"
                className="hover:underline"
              >
                palmer.mikepalmer@gmail.com
              </a>
            )}{" "}
            ·
            {atsMode ? (
              "linkedin.com/in/get-palmer"
            ) : (
              <a
                href="https://linkedin.com/in/get-palmer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/get-palmer
              </a>
            )}{" "}
            ·
            {atsMode ? (
              "jobbascript.com"
            ) : (
              <a
                href="https://jobbascript.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                jobbascript.com
              </a>
            )}
          </p>
          {!atsMode && (
            <div className="mt-3 flex flex-wrap gap-2 print:hidden">
              {chip("React")}
              {chip("JavaScript / TypeScript")}
              {chip("Data Visualisation")}
              {chip("Oil & Gas")}
              {chip("Dashboards")}
              {chip("APIs")}
            </div>
          )}
        </header>

        <Card
          className={`${
            atsMode ? "border-zinc-200" : "border-white/10"
          } avoid-break`}
        >
          <CardContent className="p-6">
            <p className="leading-relaxed">
              Front‑end‑focused software engineer with a strong background in
              data visualisation and enterprise applications, particularly in
              the oil and gas sector. Expert in React, modern JavaScript, and
              creating performant, reusable UI components. Combines design
              sensibility with the ability to integrate complex data sources
              into intuitive user interfaces. Experienced collaborating across
              engineering, data science, and business teams to deliver impactful
              tools.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left column */}
          <section className="md:col-span-1 force-break-after">
            <SectionTitle label="Core Skills" />
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Front End:</strong> React (hooks), JavaScript (ES6),
                HTML5, CSS3, Material‑UI, accessibility, state management,
                responsive design
              </li>
              <li>
                <strong>Data Viz:</strong> Dashboard design, Tableau, Power BI,
                Spotfire, Recharts, d3.js, SQL, Python, R‑script
              </li>
              <li>
                <strong>Integration:</strong> REST APIs, Node.js/Express,
                FastAPI (Python), MongoDB, PostgreSQL
              </li>
              <li>
                <strong>Quality & Delivery:</strong> TDD, Jest, CI/CD, Vercel,
                Docker, Agile/Scrum
              </li>
              <li>
                <strong>Collaboration:</strong> Git/GitHub, code reviews,
                Postman/Insomnia
              </li>
            </ul>

            <SectionTitle label="Education" />
            <div className="text-sm space-y-3">
              <div>
                <div className="font-medium">Hack Reactor</div>
                <div>Full‑Stack Software Engineering Immersive, 2021</div>
              </div>
              <div>
                <div className="font-medium">University of Oklahoma</div>
                <div>B.S. Petroleum Engineering, 2014</div>
              </div>
            </div>

            <SectionTitle label="Extras" />
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>
                AI‑assisted workflows for front‑end development and data‑driven
                UI design.
              </li>
              <li>Portfolio and code samples available upon request.</li>
            </ul>
          </section>

          {/* Right column */}
          <section className="md:col-span-2 avoid-break">
            <SectionTitle label="Experience" />
            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-semibold">
                    Frontend React Developer — EOG Resources
                  </h4>
                  <span className="text-xs opacity-80">Remote · 2022</span>
                </div>
                <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                  <li>
                    Designed and implemented data‑visualisation modules for
                    enterprise React apps used across oil & gas operations.
                  </li>
                  <li>
                    Built reusable UI and API service layers adopted by multiple
                    teams, reducing duplication and accelerating delivery.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-semibold">
                    Full Stack Engineer — Galvanise / Hack Reactor
                  </h4>
                  <span className="text-xs opacity-80">Remote · 2020–2022</span>
                </div>
                <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                  <li>
                    Delivered data‑driven UI components and interactive charts
                    in React for internal tools.
                  </li>
                  <li>
                    Standardised component libraries to improve maintainability
                    and speed.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-semibold">
                    Applications Engineer — Baker Hughes
                  </h4>
                  <span className="text-xs opacity-80">
                    Midland, TX · 2018–2020
                  </span>
                </div>
                <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                  <li>
                    Developed interactive dashboards for drill‑bit performance
                    analysis (Tableau, Power BI, Spotfire).
                  </li>
                  <li>
                    Automated data ingestion & transformation with SQL, Python,
                    R‑script, and Power Query.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-semibold">
                    Technical Engineer — Baker Hughes
                  </h4>
                  <span className="text-xs opacity-80">Global · 2014–2018</span>
                </div>
                <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                  <li>
                    Led engineering analysis & bids; contributed to ~$300M
                    project win (Saudi Aramco, Shaybah field).
                  </li>
                  <li>
                    Monitored KPIs and surfaced insights that informed
                    operational decisions across regions.
                  </li>
                </ul>
              </div>
            </div>

            <SectionTitle label="Selected Projects" />
            <div className="space-y-3">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-medium">
                    Clothing Store Q&A — Front‑End Engineer
                  </h4>
                  <span className="text-xs opacity-80">
                    React, Material‑UI, Node.js/Express
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Built dynamic Q&A with advanced filtering, validation, and
                  intuitive UX flows for a production storefront.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-medium">
                    Otter People — Full‑stack & UI Design
                  </h4>
                  <span className="text-xs opacity-80">
                    React, Node.js/Express, MongoDB
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Led front‑end architecture & UI for a geolocation‑based
                  group‑event planner with activity recommendations.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="font-medium">
                    Product Overview API & DB — Backend
                  </h4>
                  <span className="text-xs opacity-80">Node.js, MongoDB</span>
                </div>
                <p className="text-sm mt-1">
                  High‑performance API with 10M+ records, tuned to handle 2,500+
                  rps under load tests.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer badges (hidden in ATS/print) */}
        {!atsMode && (
          <div className="no-print mt-10 flex flex-wrap gap-2 opacity-80">
            <Badge
              icon={<CheckCircle2 className="w-3 h-3" />}
              label="Responsive"
            />
            <Badge
              icon={<CheckCircle2 className="w-3 h-3" />}
              label="Accessible"
            />
            <Badge
              icon={<CheckCircle2 className="w-3 h-3" />}
              label="Printable"
            />
          </div>
        )}
      </main>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  Scan,
  Eye,
  Flame,
  AlertTriangle,
  BarChart3,
  FileText,
  Wrench,
  Shield,
  Home,
  Key,
  Building2,
  ChevronDown,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

// ─── Shared service definitions ───────────────────────────────────────────────

const THERMAL_SURVEY = {
  icon: Scan,
  title: 'Full Thermal Imaging Survey',
  intro: "The core diagnostic service that reveals hidden faults your monitoring app can't see.",
  description:
    'High‑resolution infrared imaging of your entire solar array to detect hotspots, string issues, PID, bypass diode failures, and other thermal anomalies that silently reduce performance or pose safety risks.',
  bullets: [
    'Detects hotspots invisible to monitoring apps',
    'Identifies early‑stage faults before they become expensive',
    'Highlights safety‑related thermal anomalies',
    'Provides a baseline for long‑term system health',
    'Helps validate installer workmanship',
  ],
};

const VISUAL_INSPECTION = {
  icon: Eye,
  title: 'Daylight Visual Inspection',
  intro: "A clear, ground‑truth assessment of your system's physical condition.",
  description:
    'High‑quality daylight imaging to identify cracked modules, shading problems, contamination, loose fixings, and installation defects that affect performance or safety.',
  bullets: [
    'Identifies cracked or delaminated modules',
    'Checks for shading, debris, or contamination',
    'Confirms mounting hardware is secure',
    'Spots cable abrasion or UV damage',
    'Verifies general installation quality',
  ],
};

const FAULT_ID = {
  icon: AlertTriangle,
  title: 'Fault Identification & Classification',
  intro: 'Independent diagnosis of any issues found, explained in plain English.',
  description:
    `Every defect is categorised by type and severity using IEC TS 62446\u20113 guidance, giving you a clear understanding of what's wrong, how serious it is, and what it means for your system.`,
  bullets: [
    'Categorises faults using IEC TS 62446‑3',
    'Distinguishes minor issues from critical ones',
    'Helps you prioritise repairs',
    'Provides clarity on root causes',
    'Supports warranty or installer discussions',
  ],
};

const THERMAL_PERFORMANCE = {
  icon: BarChart3,
  title: 'Thermal Performance Assessment',
  intro: 'Reveals underperforming sections of your system and the likely causes.',
  description:
    'Thermal patterns highlight areas running hotter, cooler, or unevenly — often indicating hidden faults, energy loss, or early‑stage degradation long before they appear in monitoring data.',
  bullets: [
    'Highlights underperforming sections of the array',
    'Reveals mismatch, degradation, or bypass diode issues',
    'Shows thermal imbalance across modules',
    'Helps explain unexpected drops in generation',
    'Provides actionable insights to improve yield',
  ],
};

const ENGINEERING_REPORT = {
  icon: FileText,
  title: 'Engineering‑Grade Diagnostic Report',
  intro: "A clear, professional record of your system's condition.",
  description:
    "You receive a structured report with thermal imagery, defect maps, severity ratings, and technical findings — written in a way homeowners can understand and installers can't dispute.",
  bullets: [
    'Includes thermal imagery and defect maps',
    'Provides severity ratings and technical notes',
    'Written in clear, non‑technical language',
    'Suitable for installers, insurers, and warranty teams',
    'Acts as a long‑term record of system condition',
  ],
};

const CORRECTIVE = {
  icon: Wrench,
  title: 'Corrective Action Recommendations',
  intro: 'Independent guidance on what to fix, who can fix it, and what to prioritise.',
  description:
    'You get practical, unbiased advice on repairs, replacements, and maintenance, helping you avoid unnecessary work and focus on what genuinely improves performance or safety.',
  bullets: [
    'Prioritised list of what to fix first',
    'Independent guidance with no sales agenda',
    'Helps avoid unnecessary or upsold work',
    'Suggests who is best placed to carry out repairs',
    'Includes expected impact on performance or safety',
  ],
};

const WARRANTY = {
  icon: Shield,
  title: 'Warranty & Insurance Evidence Pack',
  intro: 'Documentation that strengthens your position in claims, disputes, or assessments.',
  description:
    'Independent thermal evidence and written findings suitable for warranty claims, installer accountability, insurance assessments, and long‑term system records.',
  bullets: [
    'Provides independent proof of system condition',
    'Supports claims for defective modules or workmanship',
    'Helps resolve disputes with installers',
    'Meets insurer expectations for documentation',
    'Reduces the risk of claim rejection',
  ],
};

// ─── Category data ─────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'homeowner',
    label: 'Homeowner',
    icon: Home,
    services: [
      THERMAL_SURVEY,
      VISUAL_INSPECTION,
      FAULT_ID,
      THERMAL_PERFORMANCE,
      ENGINEERING_REPORT,
      CORRECTIVE,
      WARRANTY,
    ],
  },
  {
    id: 'homebuyer',
    label: 'Homebuyer & Home Seller',
    icon: Key,
    services: [
      {
        icon: Scan,
        title: 'Pre‑Purchase Solar System Assessment',
        intro: "Know exactly what you're buying before you commit.",
        description:
          "Most surveys don't check solar. This assessment reveals hidden defects, safety issues, and performance problems so you can negotiate confidently and avoid costly surprises.",
        bullets: [
          'Reveals hidden faults before you commit',
          'Helps negotiate price based on system condition',
          'Identifies safety issues missed by surveyors',
          'Confirms whether the system is performing as expected',
          'Provides clarity on future maintenance needs',
        ],
      },
      {
        icon: Home,
        title: 'Post‑Purchase PV Health Check',
        intro: 'A full safety and performance check for new homeowners.',
        description:
          "If you've just moved in, this gives you a clear baseline of system condition, highlights any hidden issues, and ensures your solar is safe and working as expected.",
        bullets: [
          'Ensures the system you inherited is safe',
          "Highlights any issues the seller didn't disclose",
          'Establishes a baseline for future performance',
          'Identifies faults that may affect warranties',
          'Gives peace of mind in your new home',
        ],
      },
      {
        icon: FileText,
        title: "Seller's PV Condition Report",
        intro: 'Build buyer confidence with independent proof your system is healthy.',
        description:
          'A professional diagnostic report that helps your property listing stand out and reassures buyers that the solar system is safe, functional, and well‑maintained.',
        bullets: [
          'Builds buyer confidence in your listing',
          'Demonstrates transparency and good maintenance',
          'Helps justify asking price',
          'Reduces buyer objections or renegotiations',
          'Provides a professional document to share with agents',
        ],
      },
      THERMAL_SURVEY,
      VISUAL_INSPECTION,
    ],
  },
  {
    id: 'landlord',
    label: 'Landlord & Business Owner',
    icon: Building2,
    services: [
      {
        icon: Shield,
        title: 'Liability & Compliance Assurance Survey',
        intro: 'A proactive safety and compliance check designed for landlords and business owners.',
        description:
          'Thermal imaging identifies hidden faults that could pose electrical or fire risks, helping you demonstrate due diligence, meet insurance expectations, and protect tenants or staff. While the risk of serious issues is low, insurers increasingly expect evidence that solar systems are safe, functional, and regularly assessed.',
        bullets: [
          'Demonstrates due diligence for tenant or staff safety',
          'Identifies thermal faults that could pose fire risk',
          'Helps meet insurer expectations for evidence',
          'Supports compliance with electrical safety obligations',
          'Reduces exposure to liability claims',
        ],
      },
      THERMAL_SURVEY,
      FAULT_ID,
      THERMAL_PERFORMANCE,
      ENGINEERING_REPORT,
      CORRECTIVE,
      WARRANTY,
    ],
  },
];

// ─── Expandable Service Card ───────────────────────────────────────────────────

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0);
    }
  }, [open]);

  const Icon = service.icon;

  return (
    <div
      className="group bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-200 overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-8 flex items-start gap-6"
        aria-expanded={open}
      >
        {/* Icon */}
        <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center group-hover:from-amber-500/30 group-hover:to-orange-500/20 transition-all duration-200">
          <Icon className="w-6 h-6 text-amber-500" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-amber-500 mb-1">
                {service.intro}
              </p>
              <h3 className="text-xl font-medium text-slate-900 dark:text-white">
                {service.title}
              </h3>
            </div>
            <ChevronDown
              className="w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform duration-300"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </div>
          <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            {service.description}
          </p>
        </div>
      </button>

      {/* Expandable bullets */}
      <div
        ref={bodyRef}
        style={{ height, overflow: 'hidden', transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)' }}
      >
        <ul className="px-8 pb-8 pl-28 space-y-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main Services component ───────────────────────────────────────────────────

export default function Services() {
  const [activeTab, setActiveTab] = useState('homeowner');
  const [animKey, setAnimKey] = useState(0);

  function handleTabChange(id) {
    if (id === activeTab) return;
    setActiveTab(id);
    setAnimKey((k) => k + 1);
  }

  const current = categories.find((c) => c.id === activeTab);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">

      {/* ── Hero ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Ground%20mount%20thermal%20defect.png"
            alt="Solar panels aerial view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/45 to-white/30 dark:from-slate-950/55 dark:via-slate-950/45 dark:to-slate-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.28)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.28)_100%)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Our Services
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-8">
            Diagnostic services built<br />
            <span className="text-slate-600 dark:text-slate-400">around your situation</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether you're a homeowner, buying or selling a property, or managing a rental or commercial
            site — we offer the right thermal diagnostic for your specific needs.
          </p>
        </div>
      </section>

      {/* ── Audience Tabs + Services ── */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">

          {/* Tabs */}
          <div className="text-center mb-10">
            <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-6">
              Select your situation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                const isActive = cat.id === activeTab;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                        : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <CatIcon className="w-5 h-5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service cards — re-keyed on tab change to trigger CSS animation */}
          <div
            key={animKey}
            className="grid md:grid-cols-2 gap-6 animate-fadeSlideIn"
            style={{
              animation: 'fadeSlideIn 0.4s cubic-bezier(0.4,0,0.2,1) both',
            }}
          >
            {current.services.map((service, i) => (
              <ServiceCard key={service.title + activeTab} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Field%20panels%20from%20above.jpeg"
            alt="Modern home with solar"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/40 dark:from-slate-950/60 dark:via-slate-950/50 dark:to-slate-950/40" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">
              The process
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
              How it works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              From first contact to final report — here is exactly what to expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Step 01 — Book */}
            <div className="group flex flex-col p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/80 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-xl font-light text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/25 transition-all duration-200">
                01
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Book</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Get in touch via phone or our contact form. We will discuss your situation, answer any questions, and recommend the most appropriate service for your needs.
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                <a
                  href="https://harroddiagnostics.co.uk/Contact"
                  className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 font-medium transition-colors duration-150"
                >
                  Contact us
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Step 02 — Survey */}
            <div className="group flex flex-col p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/80 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-xl font-light text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/25 transition-all duration-200">
                02
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Survey</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We visit your property and carry out a full drone thermal and visual inspection of your solar installation. The survey is non-intrusive and typically completed within a few hours.
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-500 italic">
                  No access to your roof required
                </span>
              </div>
            </div>

            {/* Step 03 — Analysis */}
            <div className="group flex flex-col p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/80 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-xl font-light text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/25 transition-all duration-200">
                03
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                All thermal and visual data is processed and reviewed. Faults are identified, classified by type and severity, and mapped against your system layout ready for the report.
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-500 italic">
                  Follows IEC TS 62446-3 guidelines
                </span>
              </div>
            </div>

            {/* Step 04 — Report */}
            <div className="group flex flex-col p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/80 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-200">
              <div className="w-14 h-14 mb-6 rounded-full bg-amber-500/15 dark:bg-amber-500/10 flex items-center justify-center text-xl font-light text-amber-600 dark:text-amber-400 group-hover:bg-amber-500/25 transition-all duration-200">
                04
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-3">Report</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                You receive a clear, professional engineering-grade report with thermal imagery, fault maps, severity ratings, and prioritised recommendations — ready to act on immediately.
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                <a
                  href="https://rickharrod.github.io/harroddiagnostics/Sample%20report%20Feb%202026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 font-medium transition-colors duration-150"
                >
                  View sample report
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-t from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
            View our transparent pricing or get in touch for a custom quote.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('Pricing')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 font-medium rounded-full hover:bg-amber-400 transition-all duration-100"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={createPageUrl('Contact')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-full hover:border-gray-400 dark:hover:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-all duration-100"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Keyframe for tab-switch animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}

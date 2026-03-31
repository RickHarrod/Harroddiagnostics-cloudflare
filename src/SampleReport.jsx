import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  ThermometerSun,
  ArrowRight,
  Download,
  Eye,
  Flame,
  Zap,
  Wind,
  Activity,
  Shield,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

// ─── Report mock sections ─────────────────────────────────────────────────────

const reportSections = [
  {
    index: '01',
    title: 'Executive Summary',
    description: 'System health status, key findings, and priority actions at a glance.',
  },
  {
    index: '02',
    title: 'System Information',
    description: 'Installation capacity, configuration, panel count, and inspection conditions.',
  },
  {
    index: '03',
    title: 'Thermal Imagery',
    description: 'Annotated infrared captures for every identified anomaly with ΔT readings.',
  },
  {
    index: '04',
    title: 'Fault Classification',
    description: 'Each defect typed and severity-rated per IEC TS 62446-3.',
  },
  {
    index: '05',
    title: 'Corrective Recommendations',
    description: 'Prioritised repair actions with expected impact on yield and safety.',
  },
  {
    index: '06',
    title: 'Technical Appendix',
    description: 'Methodology, equipment specs, calibration data, and raw thermal files.',
  },
];

// ─── Fault taxonomy ───────────────────────────────────────────────────────────

const faults = [
  {
    icon: Flame,
    severity: 'Critical',
    type: 'Hotspot — Cell Level',
    tempRange: 'ΔT 20–60°C',
    simple: {
      name: 'Overheating cell',
      cause: 'A single cell within a panel is running dangerously hot — usually caused by a cracked cell, contamination, or a manufacturing defect.',
      consequence: 'Left unrepaired this can permanently damage the panel and in extreme cases poses a fire risk.',
    },
    technical: {
      name: 'Cell-level thermal anomaly',
      cause: 'Localised resistive heating within a single cell, typically caused by internal cracking, micro-cracks, or shunting. Classified as Category C under IEC TS 62446-3.',
      consequence: 'Accelerated degradation, potential bypass diode activation, and fire risk at high ΔT. Immediate remedial action recommended.',
    },
  },
  {
    icon: Zap,
    severity: 'Critical',
    type: 'Bypass Diode Failure',
    tempRange: 'ΔT 15–40°C',
    simple: {
      name: 'Failed safety component',
      cause: 'A bypass diode inside the panel has failed. These components protect sections of the panel when shading or faults occur.',
      consequence: 'One third of the panel is effectively inactive, silently reducing your output and potentially overheating the junction box.',
    },
    technical: {
      name: 'Bypass diode short-circuit or open-circuit',
      cause: 'Thermal signature presents as a single cell string within the module operating at significantly elevated temperature. Consistent with diode failure in short-circuit mode or open-circuit causing reverse-bias heating.',
      consequence: 'Loss of approximately 33% module output. Junction box thermal stress and risk of accelerated insulation degradation.',
    },
  },
  {
    icon: Activity,
    severity: 'High',
    type: 'String Underperformance',
    tempRange: 'ΔT 8–20°C',
    simple: {
      name: 'Underperforming panel string',
      cause: 'An entire row of panels is running warmer than the others — often caused by a loose connection, corroded connector, or a failed junction.',
      consequence: 'Your system is quietly losing output. The fault can worsen over time if connectors continue to degrade.',
    },
    technical: {
      name: 'String-level resistive heating',
      cause: 'Uniform thermal elevation across a series string, indicative of increased series resistance. Likely cause: degraded MC4 connector, corroded terminal, or failed combiner fuse.',
      consequence: 'Proportional reduction in string current and system yield. Impedance mismatch may induce MPPT instability in affected inverter channel.',
    },
  },
  {
    icon: ThermometerSun,
    severity: 'Medium',
    type: 'PID Effect',
    tempRange: 'ΔT 4–12°C',
    simple: {
      name: 'Gradual performance loss (PID)',
      cause: 'Potential Induced Degradation — a slow process where voltage stress causes panel cells to lose efficiency over time. Common in older or cheaper panels.',
      consequence: 'Can cause 10–30% output reduction across affected panels if not addressed. Partially reversible with the right inverter settings.',
    },
    technical: {
      name: 'Potential Induced Degradation — shunting type',
      cause: 'Uniform moderate thermal pattern across multiple cells consistent with leakage current pathway formation. Typically associated with high system voltage, poor encapsulant quality, or inadequate grounding.',
      consequence: 'Progressive Pmax reduction. IEC 62804 assessment recommended. Mitigation via module-level PID recovery or inverter-side compensation possible in some configurations.',
    },
  },
  {
    icon: Wind,
    severity: 'Low',
    type: 'Soiling or Shading',
    tempRange: 'ΔT 2–8°C',
    simple: {
      name: 'Dirt or shadow causing losses',
      cause: 'Debris, bird fouling, or nearby objects casting shade are reducing output in specific panels. Often easy to resolve.',
      consequence: 'Localised output reduction. Regular cleaning or trimming nearby vegetation typically resolves this.',
    },
    technical: {
      name: 'Extrinsic shading or soiling — partial module obstruction',
      cause: 'Thermal pattern consistent with non-uniform irradiance across cell strings. Geometrically regular pattern suggests fixed obstruction; irregular pattern suggests soiling accumulation.',
      consequence: 'Bypass diode activation in shaded cell strings, reducing module output proportionally. No component damage expected if transient.',
    },
  },
  {
    icon: Shield,
    severity: 'Monitor',
    type: 'Early-Stage Delamination',
    tempRange: 'ΔT 1–4°C',
    simple: {
      name: 'Panel surface starting to separate',
      cause: 'The protective layers of the panel are beginning to separate — often caused by age, UV exposure, or manufacturing quality. Not yet causing significant output loss.',
      consequence: 'Worth monitoring annually. If moisture ingress occurs the fault will accelerate quickly.',
    },
    technical: {
      name: 'Encapsulant delamination — early stage',
      cause: 'Subtle thermal differential consistent with air gap formation between encapsulant and cell layer. Often detected before visible yellowing or browning. Associated with EVA degradation via acetic acid formation.',
      consequence: 'Minimal immediate yield impact. Monitor for moisture ingress which precipitates rapid power loss and potential electrical hazard. Flag for inclusion in next annual inspection.',
    },
  },
  {
    icon: CheckCircle,
    severity: 'None',
    type: 'Module Operating Normally',
    tempRange: 'ΔT < 2°C',
    simple: {
      name: 'Healthy panel — no action needed',
      cause: 'Uniform temperature distribution across the entire module within acceptable operating parameters.',
      consequence: 'No fault detected. Module is performing as expected.',
    },
    technical: {
      name: 'No thermal anomaly detected',
      cause: 'Homogeneous irradiance absorption and heat dissipation across all cell strings. Temperature differential within IEC TS 62446-3 acceptable thresholds.',
      consequence: 'No remedial action required. Baseline data logged for future comparative analysis.',
    },
  },
];

// ─── Severity config ──────────────────────────────────────────────────────────

const severityConfig = {
  Critical: {
    badge: 'bg-red-500/20 text-red-400',
    border: 'border-red-500/20',
    icon: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  High: {
    badge: 'bg-orange-500/20 text-orange-400',
    border: 'border-orange-500/20',
    icon: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  Medium: {
    badge: 'bg-amber-500/20 text-amber-400',
    border: 'border-amber-500/20',
    icon: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  Low: {
    badge: 'bg-blue-500/20 text-blue-400',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  Monitor: {
    badge: 'bg-purple-500/20 text-purple-400',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  None: {
    badge: 'bg-green-500/20 text-green-400',
    border: 'border-green-500/20',
    icon: 'text-green-500',
    bg: 'bg-green-500/10',
  },
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function SampleReport() {
  const [technical, setTechnical] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">

      {/* ── Hero ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://raw.githubusercontent.com/RickHarrod/harroddiagnostics/refs/heads/main/Drone%20flight%20wide1.jpg"
            alt="Solar array"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/55 to-white/40 dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.35)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.35)_100%)]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Sample Report
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-8">
            What you will receive<br />
            <span className="text-slate-600 dark:text-slate-400">after every inspection</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every Harrod Diagnostics inspection delivers a structured, engineering-grade report
            with clear findings, annotated thermal imagery, and actionable recommendations.
          </p>
        </div>
      </section>

      {/* ── Mock Report Document ── */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">

          {/* Document shell */}
          <div className="rounded-2xl overflow-hidden border border-gray-300 dark:border-slate-700 shadow-2xl shadow-black/10 dark:shadow-black/40">

            {/* Document top bar — mimics a report header */}
            <div className="bg-slate-900 px-8 py-5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Harrod Diagnostics — Thermal Inspection Report</p>
                  <p className="text-slate-400 text-xs mt-0.5">IEC TS 62446-3 Compliant &nbsp;·&nbsp; Confidential</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://rickharrod.github.io/harroddiagnostics/Sample%20report%20Feb%202026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview PDF
                </a>
                <a
                  href="https://raw.githubusercontent.com/RickHarrod/harroddiagnostics/main/Sample%20report%20Feb%202026.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 text-sm font-medium rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>

            {/* Document meta bar */}
            <div className="bg-white dark:bg-slate-800 px-8 py-4 border-b border-gray-200 dark:border-slate-700 flex flex-wrap gap-8">
              {[
                { label: 'Site', value: 'Sample Residential Installation' },
                { label: 'Panels', value: '14 modules / 2 strings' },
                { label: 'Inspection Date', value: 'February 2026' },
                { label: 'Status', value: '2 faults identified' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Section index */}
            <div className="bg-white dark:bg-slate-900 p-8">
              <p className="text-xs font-medium text-amber-500 uppercase tracking-widest mb-6">Report Contents</p>
              <div className="grid md:grid-cols-2 gap-4">
                {reportSections.map((section) => (
                  <div
                    key={section.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50"
                  >
                    <span className="text-xs font-mono text-amber-500 mt-0.5 shrink-0">{section.index}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white mb-0.5">{section.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Fault Classifications ── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">

          {/* Header + toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-3">
                Fault taxonomy
              </p>
              <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-3">
                How faults are classified
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                Every anomaly detected is identified, typed, and severity-rated. Toggle between a plain-English explanation and the technical classification used in the report.
              </p>
            </div>

            {/* Plain / Technical toggle */}
            <button
              onClick={() => setTechnical(!technical)}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-amber-500/50 transition-all duration-200 shrink-0"
            >
              {technical ? (
                <ToggleRight className="w-5 h-5 text-amber-500" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-slate-400" />
              )}
              {technical ? 'Technical view' : 'Plain English view'}
            </button>
          </div>

          {/* Fault cards */}
          <div className="space-y-4">
            {faults.map((fault) => {
              const cfg = severityConfig[fault.severity];
              const FaultIcon = fault.icon;
              const content = technical ? fault.technical : fault.simple;

              return (
                <div
                  key={fault.type}
                  className={`p-6 bg-white dark:bg-slate-800 rounded-xl border ${cfg.border} dark:border-opacity-40 shadow-sm`}
                  style={{ transition: 'all 0.2s' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-5">

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <FaultIcon className={`w-6 h-6 ${cfg.icon}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-base font-medium text-slate-900 dark:text-white">
                          {fault.type}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.badge}`}>
                          {fault.severity}
                        </span>
                        {technical && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-mono">
                            IEC TS 62446-3
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                        {content.name}
                      </p>

                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Cause</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{content.cause}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Consequence</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{content.consequence}</p>
                        </div>
                      </div>
                    </div>

                    {/* Temp range */}
                    <div className="md:text-right shrink-0">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Typical ΔT</p>
                      <p className="text-lg font-light text-slate-900 dark:text-white font-mono">{fault.tempRange}</p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Thermal Imagery ── */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Visual evidence
            </p>
            <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-4">
              Thermal imagery included in every report
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              High-resolution annotated thermal captures clearly showing anomaly locations,
              temperature differentials, and fault boundaries.
            </p>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 relative shadow-xl shadow-black/10">
            <img
              src="https://raw.githubusercontent.com/RickHarrod/harroddiagnostics/refs/heads/main/Harrod%20thermal%20defect%20sample.jpg"
              alt="Thermal capture with identified hotspots"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur px-4 py-2 rounded-lg">
              <p className="text-white text-sm">Example thermal capture — identified defects annotated in report</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">
              Why it matters
            </p>
            <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-4">
              What this report gives you
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                heading: 'Independent evidence',
                body: 'A third-party engineering document carries weight that a monitoring app screenshot never will — with insurers, warranty teams, installers, and solicitors.',
              },
              {
                heading: 'Something to act on',
                body: 'Every finding comes with a prioritised recommendation. You will know exactly what needs fixing, what can wait, and what is fine to leave alone.',
              },
              {
                heading: 'A long-term record',
                body: 'Annual inspection reports build a documented history of your system. That is valuable when selling a property, making a claim, or simply tracking performance over time.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="p-7 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-amber-500 mb-4" />
                <h3 className="text-base font-medium text-slate-900 dark:text-white mb-3">{item.heading}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-t from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
            Ready to get your own report?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
            Book a survey and receive a comprehensive engineering report for your solar installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('Contact')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 font-medium rounded-full hover:bg-amber-400 transition-all duration-100"
            >
              Book a Survey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={createPageUrl('Pricing')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-full hover:border-gray-400 dark:hover:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-all duration-100"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

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
  Sun,
  Droplets,
  Gauge,
  Cloud,
} from 'lucide-react';

// ─── Fault data drawn from the actual Harrod Diagnostics report ───────────────

const faults = [
  {
    icon: Zap,
    severity: 'Critical',
    type: 'Substring in Short Circuit',
    tempRange: 'ΔT 15–35°C',
    summary: 'A section of the module runs noticeably hotter than the surrounding area because one substring is effectively shorted. This creates a broad, elevated-temperature region that can look similar to cell cracks, PID, or mismatch issues.',
    meaning: 'The module is still operating, but one substring is under abnormal electrical stress.',
    action: 'Check the module and bypass diodes under reverse-bias conditions to confirm they are functioning correctly.',
  },
  {
    icon: Zap,
    severity: 'Critical',
    type: 'One Substring in Open Circuit',
    tempRange: 'ΔT 10–25°C',
    summary: 'One substring has lost electrical continuity, causing the bypass diode to activate. This results in a uniformly warm area on part of the module, with heat often visible around the junction box. In some cases, arcing may occur at a failed connection.',
    meaning: 'A connection failure inside the module or junction box is preventing current flow through one substring.',
    action: 'Inspect the junction box, cell connectors, and bypass diode for disconnection or failure.',
  },
  {
    icon: Flame,
    severity: 'Critical',
    type: 'Single Cell With Elevated Temperature',
    tempRange: 'ΔT 10–60°C',
    summary: 'One cell runs significantly hotter than the others. Mild cases show a moderate temperature rise, while severe cases show very high temperatures. The hotspot becomes more pronounced under higher load.',
    meaning: 'Usually caused by a broken or damaged cell. If left unchecked, it can lead to permanent damage to the cell, encapsulation, or even the bypass diode.',
    action: 'Ensure the cell is not being shaded or heavily soiled. If the hotspot persists under clear conditions, further inspection is required.',
  },
  {
    icon: ThermometerSun,
    severity: 'High',
    type: 'Heated Module Junction Box',
    tempRange: 'ΔT 8–20°C',
    summary: 'The junction box is noticeably hotter than nearby junction boxes. The hotspot increases with electrical load.',
    meaning: 'There may be increased contact resistance inside the junction box, or a bypass diode may be conducting when it should not be.',
    action: 'Have the junction box inspected by a PV expert. Use caution — high voltages may be present.',
  },
  {
    icon: Activity,
    severity: 'High',
    type: 'High Transfer Resistance at Cell Connections',
    tempRange: 'ΔT 5–20°C',
    summary: 'A point hotspot forms at a cell connection due to poor or missing soldering, a broken ribbon, or a failed joint. The hotspot intensifies with load.',
    meaning: 'A connection fault is creating resistance heating at a specific cell-to-ribbon junction.',
    action: 'A PV expert should inspect the module to confirm the defect and determine whether repair or replacement is needed.',
  },
  {
    icon: Shield,
    severity: 'Medium',
    type: 'Module with Broken Front Glass',
    tempRange: 'ΔT 2–15°C',
    summary: 'A module with broken glass can show a range of thermal behaviours — from almost normal in the early weeks to clear hotspots later. The pattern often resembles short-circuit behaviour, PID, or cell defects.',
    meaning: 'The module has lost isolation resistance, creating a safety risk and making it vulnerable to moisture ingress and electrical faults.',
    action: 'Handle with caution due to high voltage exposure. Inspect for broken cells and moisture damage, and confirm isolation resistance before any further testing.',
  },
  {
    icon: Wind,
    severity: 'Low',
    type: 'Module with Cells Shaded by Dirt',
    tempRange: 'ΔT 2–8°C',
    summary: 'Dirt, dust, or bird droppings cause localised heating on the module surface. The severity depends on how much rain the site receives and how long the soiling remains.',
    meaning: 'Light, naturally washed dirt is usually harmless. Heavy or persistent soiling in dry climates can cause significant hotspots and long-term damage.',
    action: 'Light soiling: no immediate action — rain will typically clean the module. Heavy or persistent soiling: cleaning is recommended to prevent damage.',
  },
  {
    icon: CheckCircle,
    severity: 'None',
    type: 'Module Operating Normally',
    tempRange: 'ΔT < 2°C',
    summary: 'Uniform temperature distribution across the entire module within acceptable operating parameters. No thermal anomalies detected.',
    meaning: 'The module is performing as expected. No electrical or thermal issues are present at the time of inspection.',
    action: 'No action required. Module data is logged as a baseline for future comparative analysis.',
  },
];

const severityConfig = {
  Critical: { badge: 'bg-red-500/20 text-red-400',    border: 'border-l-red-500',    icon: 'text-red-500',    bg: 'bg-red-500/10'    },
  High:     { badge: 'bg-orange-500/20 text-orange-400', border: 'border-l-orange-500', icon: 'text-orange-400', bg: 'bg-orange-500/10' },
  Medium:   { badge: 'bg-amber-500/20 text-amber-400', border: 'border-l-amber-500',   icon: 'text-amber-500',  bg: 'bg-amber-500/10'  },
  Low:      { badge: 'bg-blue-500/20 text-blue-400',   border: 'border-l-blue-400',    icon: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  None:     { badge: 'bg-green-500/20 text-green-400', border: 'border-l-green-500',   icon: 'text-green-500',  bg: 'bg-green-500/10'  },
};

// ─── Clean result environmental data ─────────────────────────────────────────

const cleanEnv = [
  { icon: Sun,          label: 'Irradiance',   value: '669 W/m²' },
  { icon: ThermometerSun, label: 'Ambient Temp', value: '9.6°C' },
  { icon: Wind,         label: 'Wind Speed',   value: '2.6 m/s (5.8 mph)' },
  { icon: Droplets,     label: 'Humidity',     value: '50%' },
  { icon: Cloud,        label: 'Sky',          value: 'Mostly sunny, thin cirrus' },
  { icon: Gauge,        label: 'Emissivity',   value: '0.95' },
];

const cleanEquipment = [
  { label: 'Drone platform',    value: 'DJI Matrice 4T' },
  { label: 'Thermal camera',    value: 'Integrated 4T — 640×512, 12mm lens' },
  { label: 'Emissivity',        value: '0.95' },
  { label: 'Reflected temp',    value: '9.6°C' },
  { label: 'Capture distance',  value: '5 m' },
  { label: 'Standard',          value: 'IEC TS 62446-3 compliant' },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function SampleReport() {
  const [view, setView] = useState('clean');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">

      {/* ── Hero ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Drone%20flight%20wide1.jpg"
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

      {/* ── Report mock ── */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1 gap-1">
              <button
                onClick={() => setView('clean')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  view === 'clean'
                    ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ✓ Clean result — no faults found
              </button>
              <button
                onClick={() => setView('faults')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  view === 'faults'
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ⚠ Fault reference guide
              </button>
            </div>
          </div>

          {/* Document shell */}
          <div className="rounded-2xl overflow-hidden border border-gray-300 dark:border-slate-700 shadow-2xl shadow-black/10 dark:shadow-black/40">

            {/* Document top bar */}
            <div className="bg-slate-900 px-8 py-5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Harrod Diagnostics — Solar PV Thermographic Inspection Report</p>
                  <p className="text-slate-400 text-xs mt-0.5">IEC TS 62446-3 Compliant &nbsp;·&nbsp; Evidence-based diagnostics &nbsp;·&nbsp; harroddiagnostics.co.uk</p>
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

            {/* Meta bar — changes per view */}
            <div className="bg-white dark:bg-slate-800 px-8 py-4 border-b border-gray-200 dark:border-slate-700 flex flex-wrap gap-8">
              {view === 'clean' ? (
                <>
                  {[
                    { label: 'Report Ref',     value: 'HD-2026021401' },
                    { label: 'Inspection Date', value: '14 February 2026' },
                    { label: 'Site',           value: 'Sample Residential Installation' },
                    { label: 'System Status',  value: 'No faults identified', highlight: true },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className={`text-sm font-medium ${item.highlight ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { label: 'Section',         value: 'Fault Reference Guide' },
                    { label: 'Standard',        value: 'IEC TS 62446-3' },
                    { label: 'Fault types',     value: '7 classifications' },
                    { label: 'Included in',     value: 'Every report' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* ── CLEAN VIEW ── */}
            {view === 'clean' && (
              <div className="bg-white dark:bg-slate-900">

                {/* Summary */}
                <div className="px-8 py-8 border-b border-gray-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-5">Report Summary</p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl bg-green-500/8 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-xs font-semibold text-green-500 uppercase tracking-wide">System Status</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        No thermal, electrical, or safety-related abnormalities were identified. All modules exhibited uniform thermal behaviour under the recorded environmental conditions.
                      </p>
                    </div>
                    <div className="md:col-span-2 p-5 rounded-xl bg-gray-50 dark:bg-slate-800">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Inspection Overview</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        This thermographic inspection provides an evidence-based assessment of the condition and performance of the solar PV system. The survey was conducted in accordance with IEC TS 62446-3, using aerial thermal and RGB imaging to evaluate the array for electrical, thermal, and safety-related abnormalities.
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                        No hotspots, diode patterns, or irregular thermal signatures were observed. The system is operating normally at the time of inspection. All observations are supported by thermal and RGB imagery captured during the visit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visit details */}
                <div className="px-8 py-8 border-b border-gray-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2">Visit Details</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Environmental conditions and equipment used during the inspection, ensuring full traceability and compliance with IEC TS 62446-3.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Environmental Conditions</p>
                      <div className="space-y-3">
                        {cleanEnv.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={item.label} className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                                <ItemIcon className="w-4 h-4 text-amber-500" />
                              </div>
                              <span className="text-sm text-slate-500 dark:text-slate-400 flex-1">{item.label}</span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">{item.value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Equipment Used</p>
                      <div className="space-y-3">
                        {cleanEquipment.map((item) => (
                          <div key={item.label} className="flex items-start justify-between gap-4">
                            <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0">{item.label}</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white text-right">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thermal image */}
                <div className="px-8 py-8">
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-5">Thermal Array Layout</p>
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 relative">
                    <img
                      src="https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Sample%20report%20website%20overhead%20shot.jpg"
                      alt="Thermal array capture"
                      className="w-full object-cover max-h-72"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg">
                      <p className="text-white text-xs">Thermal capture — all modules within normal operating parameters</p>
                    </div>
                  </div>
                  <div className="mt-6 p-5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Inspection Limitations</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      This inspection is a non-intrusive thermographic assessment carried out in accordance with IEC TS 62446-3. Findings are based solely on thermal and visual signatures observed at the time of the survey. This report is not an electrical safety test and should not be considered a substitute for a qualified electrician's assessment.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ── FAULT VIEW ── */}
            {view === 'faults' && (
              <div className="bg-white dark:bg-slate-900">

                <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2">About this section</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                    Every Harrod Diagnostics report includes a fault reference guide so you can understand exactly what each finding means and what to do about it. Below are the fault types we classify, drawn directly from IEC TS 62446-3.
                  </p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {faults.map((fault) => {
                    const cfg = severityConfig[fault.severity];
                    const FaultIcon = fault.icon;
                    return (
                      <div key={fault.type} className={`px-8 py-7 border-l-4 ${cfg.border}`}>
                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                            <FaultIcon className={`w-4 h-4 ${cfg.icon}`} />
                          </div>
                          <h3 className="text-base font-medium text-slate-900 dark:text-white">{fault.type}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.badge}`}>
                            {fault.severity}
                          </span>
                          <span className="ml-auto text-xs font-mono text-slate-400 dark:text-slate-500">{fault.tempRange}</span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5 pl-12">
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Summary</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{fault.summary}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">What it means</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{fault.meaning}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">Recommended Action</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{fault.action}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-8 py-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800">
                  <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                    Fault classifications follow IEC TS 62446-3 recommended practices. Temperature differentials shown are typical ranges — actual values depend on irradiance, ambient conditions, and system configuration at the time of inspection.
                  </p>
                </div>

              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">Why it matters</p>
            <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-4">What this report gives you</h2>
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
                body: 'Annual inspection reports build a documented history of your system — valuable when selling a property, making a claim, or tracking performance over time.',
              },
            ].map((item) => (
              <div key={item.heading} className="p-7 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-amber-500 mb-4" />
                <h3 className="text-base font-medium text-slate-900 dark:text-white mb-3">{item.heading}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
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

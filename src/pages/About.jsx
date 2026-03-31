import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Shield, Target, Award, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: "Independence",
    description: "We don't install, sell, or maintain solar systems. Our only interest is providing accurate diagnostics."
  },
  {
    icon: Target,
    title: "Precision",
    description: "Calibrated thermal sensors, consistent workflows, and methodical analysis following international standards."
  },
  {
    icon: Award,
    title: "Clarity",
    description: "Reports that communicate findings clearly, with actionable recommendations you can actually use."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">

      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Solar%20Field%20home%20page.jpg"
            alt="Solar Field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b
            from-white/65 via-white/55 to-white/40
            dark:from-slate-950/65 dark:via-slate-950/55 dark:to-slate-950/40"
          />
          <div className="absolute inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.35)_100%)]
            dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.35)_100%)]"
          />
        </div>

        {/* Foreground content */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">

            {/* Text */}
            <div className="flex-1">
              <p className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm mb-6">
                About Harrod Diagnostics
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 dark:text-white mb-8 leading-tight">
                Independent diagnostics.<br />
                <span className="text-slate-600 dark:text-slate-400">
                  Engineering‑grade insight.<br />
                  No upselling. No bias.
                </span>
              </h1>
            </div>

            {/* Founder Photo — drop-shadow traces the PNG cutout silhouette */}
            <img
              src="https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/Rick%20Harrod%20Diagnostics.jpg"
              alt="Ricky Harrod"
              className="w-56 md:w-64 lg:w-72 rounded-xl shadow-xl object-cover border border-white/20 dark:border-slate-800/40"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Harrod Diagnostics was founded on a simple belief: solar owners deserve clear, independent 
            answers about the health of their system — without sales pressure, guesswork, or long waits 
            for &ldquo;monitoring data&rdquo; to catch up.
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            The business began with a personal frustration. After installing a large solar array on my 
            own home, I noticed behaviour that didn&apos;t look right — panels shedding snow unevenly and 
            patterns that hinted at possible hotspots or underperforming modules. Remote monitoring showed 
            &ldquo;no issues,&rdquo; and I was advised to wait a year to see if production dipped below forecast. 
            For most homeowners, that&apos;s the end of the road: uncertainty, doubt, and no practical way 
            to challenge a warranty claim.
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            My background in operations and data‑driven decision‑making meant guesswork wasn&apos;t an option 
            — I needed objective evidence. Thermal imaging provided it. What started as an investigation 
            into my own system quickly expanded to family and friends, where I found more faults than 
            expected. It became clear that domestic customers were underserved: thermographic surveys were 
            priced for utility‑scale plants, and the few domestic services available were often 
            prohibitively expensive.
          </p>

          <blockquote className="my-12 px-8 py-6 border-l-4 border-amber-500 bg-white dark:bg-slate-950 rounded-r-2xl">
            <p className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 leading-relaxed italic">
              &ldquo;Harrod Diagnostics was created to close that gap — bringing utility‑scale inspection 
              standards to the homeowners who need them most.&rdquo;
            </p>
          </blockquote>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Today, we provide accessible, engineering‑grade thermographic inspections for domestic and 
            commercial solar assets. We use drone‑mounted radiometric thermal cameras and workflows 
            aligned with IEC TS 62446‑3 — the international standard for PV thermography. That means 
            consistent, defensible results suitable for warranty claims, insurer evidence, and 
            technical assessments.
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Our reports are built for clarity and action:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              'Clear fault classification',
              'Annotated thermal imagery',
              'Straightforward explanations — no jargon without purpose',
              'Specific, practical recommendations',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
            Whether you&apos;re a homeowner seeking peace of mind, a buyer assessing a property, or a 
            landlord ensuring your system is safe and compliant — our goal is the same: objective 
            data you can trust, delivered with transparency and technical rigour.
          </p>

          {/* Founder sign-off */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-slate-800">
            <div className="w-px h-8 bg-amber-500" />
            <div>
              <p className="text-slate-900 dark:text-white font-medium">Ricky Harrod</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">Founder, Harrod Diagnostics</p>
            </div>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1611365892117-00ac6fb2fad2?w=1920&q=80"
            alt="Solar installation detail"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
              How we work
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-12 text-center">
            Standards &amp; Compliance
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-medium text-amber-500 mb-4">IEC TS 62446-3</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our inspection methodology follows the international technical specification for 
                thermographic inspection of PV plants, ensuring reliable and reproducible results.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800">
              <h3 className="text-lg font-medium text-amber-500 mb-4">CAA Certified Drone Operations</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                All flights are conducted by CAA‑certified remote pilots operating within the UK&apos;s 
                commercial drone regulations, with full insurance and documented safety procedures 
                for every mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
            Ready for a thermal survey?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10">
            See exactly what&apos;s happening in your solar system with independent, 
            engineering-grade thermal analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={createPageUrl('Contact')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-slate-950 font-medium rounded-full hover:bg-amber-400 transition-all duration-100"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={createPageUrl('Services')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-full hover:border-gray-400 dark:hover:border-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-all duration-100"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

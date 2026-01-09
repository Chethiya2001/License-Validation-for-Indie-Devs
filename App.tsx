
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Users,
  AlertCircle
} from 'lucide-react';

// --- Sub-components defined outside for performance ---

const Navbar: React.FC = () => (
  <nav className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
      <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
        <ShieldCheck className="text-white w-5 h-5" />
      </div>
      <span>SimpleAuth</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
      <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
      <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
    </div>
  </nav>
);

const WaitlistForm: React.FC<{ variant?: 'hero' | 'bottom' }> = ({ variant = 'hero' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Artificial failure scenario for demonstration (uncomment to test)
      // if (email.includes('fail')) throw new Error('Submission failed');
      
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center gap-3 animate-in fade-in duration-500 max-w-md">
        <CheckCircle className="text-emerald-500 w-5 h-5" />
        <span className="text-sm font-medium">You're on the list. We'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Enter your email"
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-slate-900/5 text-sm transition-all ${
              error ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-slate-900'
            }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all whitespace-nowrap shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Join the Waitlist'
          )}
        </button>
      </form>
      {error && (
        <div className="flex items-center gap-1.5 text-rose-600 animate-in slide-in-from-top-1 fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

const CodeSnippet: React.FC = () => (
  <div className="bg-slate-900 rounded-xl p-1 shadow-2xl shadow-slate-200/50 mt-12 overflow-hidden border border-slate-800">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
      </div>
      <span className="text-xs text-slate-500 font-mono ml-2 uppercase tracking-widest">validate_license.js</span>
    </div>
    <div className="p-6 overflow-x-auto">
      <pre className="mono text-sm leading-relaxed text-slate-300">
        <code>{`const response = await fetch('https://api.simpleauth.com/v1/validate', {
  method: 'POST',
  headers: { 'X-API-KEY': 'your_secret_key' },
  body: JSON.stringify({
    license_key: 'DEV-XXXX-XXXX',
    product_id: 'prod_82hks'
  })
});

const { valid, expiry } = await response.json();

if (!valid) {
  alert('License is invalid or expired.');
  process.exit(1);
}`}</code>
      </pre>
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; id?: string; className?: string }> = ({ title, children, id, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 px-6 max-w-4xl mx-auto ${className}`}>
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10 md:mb-14 text-slate-900">{title}</h2>
    {children}
  </section>
);

const App: React.FC = () => {
  const [stepsVisible, setStepsVisible] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStepsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-16 pb-24 md:pt-20 md:pb-32 px-6 max-w-4xl mx-auto text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 mb-6 tracking-wide uppercase">
          <Terminal className="w-3.5 h-3.5" />
          Pre-launch validation
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
          Stop Piracy. Manage Licenses. Ship Faster.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
          A simple license key & subscription validation API for indie developers selling apps, plugins, templates, or desktop software.
        </p>
        <div className="flex flex-col items-center md:items-start gap-4">
          <WaitlistForm />
          <p className="text-sm text-slate-400 font-medium">
            No free tier. Planned price: <span className="text-slate-900">$10/month</span>.
          </p>
        </div>
        
        <CodeSnippet />
      </header>

      {/* Problem Section */}
      <Section title="Selling software is easy. Managing licenses is not." className="bg-slate-50 border-y border-slate-200 max-w-none">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-8 md:gap-y-10">
            {[
              "Pirated copies spread quickly",
              "Rolling your own license system wastes weeks",
              "Existing solutions are expensive or overkill",
              "License logic distracts from real product development"
            ].map((point, idx) => (
              <div key={idx} className="flex gap-3">
                <XCircle className="text-slate-300 w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5" />
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution Section */}
      <Section title="A focused tool that does one thing well">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-12 md:gap-y-14">
          {[
            { icon: <Zap />, title: "Generate license keys", desc: "Instantly create unique keys for your users via dashboard or API." },
            { icon: <Code2 />, title: "REST API Validation", desc: "Validate licenses with a single HTTP request from any platform." },
            { icon: <ShieldCheck />, title: "Control Status", desc: "Easily activate, revoke, or expire keys in real-time." },
            { icon: <Layers />, title: "Subscription Support", desc: "Built-in handling for recurring validation and expiry dates." },
            { icon: <Terminal />, title: "Webhooks", desc: "Get notified when someone uses an invalid or blacklisted key." },
            { icon: <AlertCircle />, title: "Simple Dashboard", desc: "No bloat. Just manage your products and see your users." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0 text-slate-400 group-hover:text-slate-900 group-hover:bg-slate-100 transition-all duration-300">
                {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5 md:w-6 md:h-6' })}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-bold mb-1 text-slate-900 text-base md:text-lg group-hover:translate-x-0.5 transition-transform duration-300">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" title="How it works" className="bg-slate-50 border-y border-slate-200 max-w-none">
        <div className="max-w-4xl mx-auto" ref={stepsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Create a product",
              "Generate license keys",
              "Integrate the API",
              "Validate on app startup"
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`relative transition-all duration-700 ease-out transform ${
                  stepsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-4xl font-mono font-bold text-slate-200 mb-4">{idx + 1}</div>
                <p className="text-slate-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
          <p className={`mt-12 text-slate-400 font-mono text-sm italic transition-all duration-1000 delay-1000 ${
            stepsVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            “That’s it. No complex setup.”
          </p>
        </div>
      </Section>

      {/* Who It's For */}
      <Section title="Built for the builders">
        <div className="flex flex-wrap gap-3 md:gap-4">
          {[
            { icon: <Users />, label: "Indie Developers" },
            { icon: <ShieldCheck />, label: "Solo Founders" },
            { icon: <Code2 />, label: "Template & Plugin Sellers" },
            { icon: <Layers />, label: "Desktop, Mobile & Web Apps" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-slate-700 font-medium text-sm md:text-base shadow-sm hover:border-slate-300 transition-colors">
              {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4 text-slate-400' })}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Validation */}
      <Section id="pricing" title="Simple pricing" className="text-center md:text-left">
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block">
            <ShieldCheck className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="text-3xl md:text-4xl font-bold mb-4">Planned: $10/month</div>
            <p className="text-slate-400 text-base md:text-lg mb-8 max-w-md">No free tier. Cancel anytime. Simple billing for serious tools.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300 font-mono">
              <span className="flex items-center gap-2 shrink-0"><CheckCircle className="w-4 h-4 text-emerald-500" /> Unlimited Keys</span>
              <span className="flex items-center gap-2 shrink-0"><CheckCircle className="w-4 h-4 text-emerald-500" /> 10 Products</span>
              <span className="flex items-center gap-2 shrink-0"><CheckCircle className="w-4 h-4 text-emerald-500" /> Full API Access</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Validation CTA Section */}
      <Section title="Would you pay $10/month for this?" className="mb-20">
        <div className="max-w-2xl">
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            I’m validating this idea before building. If you've ever struggled to stop piracy or wasted hours rolling your own auth, join the waitlist. 
          </p>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl mb-10 italic text-slate-500 text-sm leading-relaxed border-l-4 border-l-slate-900">
            "I built this because I spent two weeks setting up licensing for my own Mac app. That was two weeks I wasn't shipping features. SimpleAuth solves that."
            <div className="mt-2 font-semibold text-slate-900 not-italic">— Founder's Note</div>
          </div>
          <WaitlistForm variant="bottom" />
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 text-slate-400 text-sm text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <ShieldCheck className="w
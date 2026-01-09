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
  AlertCircle,
  ChevronUp,
  ArrowRight,
  Package,
  Key,
  Webhook,
  Activity,
  Server,
  RefreshCcw,
  ShieldAlert,
  Cpu,
  Globe,
  Monitor,
  Ban,
  Clock,
  DollarSign,
  Coffee
} from 'lucide-react';

// --- Sub-components ---

const Navbar: React.FC = () => (
  <nav className="max-w-4xl mx-auto px-6 py-8 flex justify-between items-center">
    <div className="flex items-center gap-2 font-bold text-xl tracking-tight group cursor-pointer">
      <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
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
      await new Promise(resolve => setTimeout(resolve, 800));
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
        <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" />
        <span className="text-sm font-medium text-slate-700">You're on the list. We'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Enter your email"
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none text-sm ${
              error 
                ? 'border-rose-300 bg-rose-50/30 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                : 'border-slate-200 bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 shadow-sm'
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
          className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap shadow-[0_4px_0_0_rgba(0,0,0,1)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] hover:bg-slate-800 active:shadow-none active:translate-y-[2px]"
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
    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
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

const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; id?: string; className?: string }> = ({ title, subtitle, children, id, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 px-6 max-w-4xl mx-auto ${className}`}>
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-slate-900">{title}</h2>
    {subtitle && <p className="text-slate-500 mb-10 md:mb-14 text-lg leading-relaxed">{subtitle}</p>}
    {children}
  </section>
);

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  
  const [solutionsVisible, setSolutionsVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [problemsVisible, setProblemsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (entry.target === solutionsRef.current) setSolutionsVisible(true);
        if (entry.target === stepsRef.current) setStepsVisible(true);
        if (entry.target === problemsRef.current) setProblemsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (solutionsRef.current) observer.observe(solutionsRef.current);
    if (stepsRef.current) observer.observe(stepsRef.current);
    if (problemsRef.current) observer.observe(problemsRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen relative selection:bg-slate-900 selection:text-white bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-16 pb-24 md:pt-20 md:pb-32 px-6 max-w-4xl mx-auto text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 mb-6 tracking-wide uppercase">
          <Server className="w-3.5 h-3.5" />
          Hosted License Server
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
          Stop Piracy. Manage Licenses. Ship Faster.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
          A simple API to <strong>generate and validate license keys</strong> for your software. No complex setup, just one REST call.
        </p>
        <div className="flex flex-col items-center md:items-start gap-4">
          <WaitlistForm />
          <p className="text-sm text-slate-400 font-medium">
            No free tier. Planned price: <span className="text-slate-900 font-bold">$10/month</span>.
          </p>
        </div>
        
        <CodeSnippet />
      </header>

      {/* Problem Section */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-4xl mx-auto" ref={problemsRef}>
          <h2 className={`text-2xl md:text-3xl font-bold tracking-tight mb-12 text-slate-900 transition-all duration-700 ease-out ${
            problemsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Selling software is easy. Managing licenses is not.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Ban className="w-5 h-5 text-rose-500" />,
                text: "Pirated copies spread quickly without protection."
              },
              {
                icon: <Clock className="w-5 h-5 text-slate-400" />,
                text: "Rolling your own license system wastes weeks of engineering."
              },
              {
                icon: <DollarSign className="w-5 h-5 text-slate-400" />,
                text: "Existing solutions are expensive or absolute overkill."
              },
              {
                icon: <Coffee className="w-5 h-5 text-slate-400" />,
                text: "License logic distracts from your real product development."
              }
            ].map((problem, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-2xl transition-all duration-1000 ease-out ${
                  problemsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {problem.icon}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {problem.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section - Real Example */}
      <Section 
        title="Understand it simply" 
        subtitle="We handle the complexity so you can focus on building features."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full border border-slate-200 shadow-sm text-slate-400">
            <RefreshCcw className="w-5 h-5 animate-spin-slow" />
          </div>
          
          <div className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col">
            <h3 className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Without This App (Today)
            </h3>
            <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-tighter">You must:</p>
            <ul className="space-y-3 flex-1">
              {[
                "Create a database",
                "Generate unique keys",
                "Store activations",
                "Write validation logic",
                "Handle expiry",
                "Secure the API",
                "Maintain it forever"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                   <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                   {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-900 text-white shadow-xl flex flex-col">
            <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> With SimpleAuth
            </h3>
            <p className="text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-tighter">You simply:</p>
            <ul className="space-y-4 flex-1">
              {[
                "Create a product in the dashboard",
                "Generate license keys",
                "Put one API call in your app",
                "Get valid or invalid",
                "That’s it. Zero complexity."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-sm font-medium">
                  <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Simplified How It Works Section */}
      <Section 
        id="how-it-works"
        title="Four steps to go live" 
        subtitle="Minimal setup. Maximum protection. Built for developer productivity."
        className="bg-slate-50/40 border-y border-slate-200 max-w-none"
      >
        <div className="max-w-4xl mx-auto py-4" ref={stepsRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                icon: <Package className="w-5 h-5" />, 
                title: "Create Product", 
                desc: "Define your project in our intuitive web dashboard.",
                num: "01"
              },
              { 
                icon: <Key className="w-5 h-5" />, 
                title: "Generate Keys", 
                desc: "Issue keys manually or automate it with our REST API.",
                num: "02"
              },
              { 
                icon: <Code2 className="w-5 h-5" />, 
                title: "Integrate API", 
                desc: "Add our single-endpoint validation call to your code.",
                num: "03"
              },
              { 
                icon: <Activity className="w-5 h-5" />, 
                title: "Validate", 
                desc: "Instantly confirm license status on every app launch.",
                num: "04"
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col transition-all duration-700 ${
                  stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-sm">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300 tracking-widest">{step.num}</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-sm">{step.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-1000 delay-500 ${stepsVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
              <Zap className="w-4 h-4 text-slate-900" />
              <span>No servers to manage. No complex SDKs. Just one API.</span>
            </div>
            <a href="#root" className="text-sm font-bold text-slate-900 flex items-center gap-2 hover:gap-3 transition-all">
              Ready to start? <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Section>

      {/* Modern Built for Builders Section */}
      <Section title="Built for the builders">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={solutionsRef}>
          {[
            { 
              icon: <Globe className="w-6 h-6" />, 
              label: "Web App Founders", 
              desc: "Protect your SaaS dashboard or premium templates.",
              highlight: "bg-blue-50/50 border-blue-100" 
            },
            { 
              icon: <Monitor className="w-6 h-6" />, 
              label: "Desktop Software Devs", 
              desc: "Simple key validation for macOS, Windows, or Linux apps.",
              highlight: "bg-purple-50/50 border-purple-100" 
            },
            { 
              icon: <Layers className="w-6 h-6" />, 
              label: "Plugin & Template Sellers", 
              desc: "Manage access to your premium themes and plugins.",
              highlight: "bg-orange-50/50 border-orange-100" 
            },
            { 
              icon: <Cpu className="w-6 h-6" />, 
              label: "CLI & Tooling Authors", 
              desc: "Add licensing to your developer tools with ease.",
              highlight: "bg-emerald-50/50 border-emerald-100" 
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`group p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${item.highlight} ${
                solutionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-2 tracking-tight">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Validation */}
      <Section id="pricing" title="Simple pricing" className="text-center md:text-left">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
            <ShieldCheck className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Planned: $10<span className="text-slate-500 font-normal text-xl md:text-2xl">/month</span></div>
            <p className="text-slate-400 text-base md:text-lg mb-8 max-w-md">No free tier. Cancel anytime. Serious tools for serious developers.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300 font-mono border-t border-white/10 pt-6">
              <span className="flex items-center gap-2 shrink-0"><CheckCircle className="w-4 h-4 text-emerald-500" /> Unlimited Keys</span>
              <span className="flex items-center gap-2 shrink-0"><CheckCircle className="w-4 h-4 text-emerald-500" /> 10 Products</span>
              <span className="flex items-center gap-2 shrink-0"><CheckCircle className="w-4 h-4 text-emerald-500" /> Full API Access</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Validation CTA */}
      <Section title="Would you pay $10/month for this?" className="mb-20">
        <div className="max-w-2xl">
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            I’m validating this idea before building. Join the waitlist if this solves a real problem for you. 
          </p>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl mb-10 border-l-4 border-l-slate-900 shadow-sm relative group overflow-hidden">
             <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform">
               <Code2 className="w-24 h-24" />
             </div>
             <p className="italic text-slate-500 text-sm leading-relaxed mb-2">
               "I spent two weeks setting up licensing for my own Mac app. That was two weeks I wasn't shipping features. SimpleAuth solves that."
             </p>
             <span className="font-semibold text-slate-900 uppercase text-[10px] tracking-widest">— Founder's Note</span>
          </div>
          <WaitlistForm variant="bottom" />
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 text-slate-400 text-sm text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <ShieldCheck className="w-4 h-4" />
            <span>SimpleAuth</span>
          </div>
          <p className="max-w-xs md:max-w-none text-xs">Built by an indie developer. Early adopters will influence the roadmap.</p>
          <div className="flex gap-6">
            <a href="https://x.com/simpleauth_io" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">Twitter/X</a>
            <a href="https://github.com/simpleauth-io" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all duration-300 z-50 transform hover:scale-110 active:scale-95 ${
          showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './components/ThemeProvider';

const navigation = [
  { name: 'Home', page: 'Home' },
  { name: 'Services', page: 'Services' },
  { name: 'Pricing', page: 'Pricing' },
  { name: 'About', page: 'About' },
  { name: 'Sample Report', page: 'SampleReport' },
  { name: 'Contact', page: 'Contact' },
];

function LayoutContent({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for stored theme preference, default to dark
    const stored = localStorage.getItem('theme');
    const initialTheme = stored || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const logoSrc = mounted && theme === 'light'
    ? 'https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/New%20HD%20logo%20light%20mode%20SMALL.png'
    : 'https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/New%20HD%20logo%20dark%20mode%20SMALL.png';

  const footerLogoSrc = mounted && theme === 'light'
    ? 'https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/New%20HD%20logo%20dark%20mode%20SMALL.png'
    : 'https://pub-a88ea30b1aa045b4848b3395a9d2b7ca.r2.dev/New%20HD%20logo%20light%20mode%20SMALL.png';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-800/50' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to={createPageUrl('Home')} 
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={logoSrc}
                alt="Harrod Diagnostics"
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`text-sm tracking-wide transition-colors ${
                    currentPageName === item.page 
                      ? 'text-amber-500' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800"
              >
              <div className="px-6 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className={`block text-base tracking-wide transition-colors ${
                      currentPageName === item.page 
                        ? 'text-amber-500' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
                </div>
                </div>
                )}
                </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 dark:bg-white border-t border-slate-800 dark:border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link 
                to={createPageUrl('Home')} 
                className="mb-4 w-fit block"
              >
                <img 
                  src={footerLogoSrc}
                  alt="Harrod Diagnostics"
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-slate-400 dark:text-slate-600 leading-relaxed max-w-md">
                Independent aerial thermal surveys for solar PV systems. 
                Engineering-grade inspection services compliant with IEC TS 62446-3.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white dark:text-slate-900 font-medium mb-4">Explore</h4>
              <ul className="space-y-3">
                {['Services', 'Pricing', 'SampleReport'].map((page) => (
                  <li key={page}>
                    <Link 
                      to={createPageUrl(page)} 
                      className="text-slate-400 dark:text-slate-600 hover:text-amber-500 transition-colors"
                    >
                      {page === 'SampleReport' ? 'Sample Report' : page}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white dark:text-slate-900 font-medium mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="tel:07356208212" 
                    className="text-slate-400 dark:text-slate-600 hover:text-amber-500 transition-colors"
                  >
                    07356 208212
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:hello@harroddiagnostics.co.uk" 
                    className="text-slate-400 dark:text-slate-600 hover:text-amber-500 transition-colors"
                  >
                    hello@harroddiagnostics.co.uk
                  </a>
                </li>
                <li className="text-slate-400 dark:text-slate-600">North West England</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 dark:border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              © {new Date().getFullYear()} Harrod Diagnostics. All rights reserved.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Objective diagnostics. No upselling. No bias.
            </p>
          </div>
        </div>
      </footer>
    </div>
    );
    }

    export default function Layout(props) {
    return (
    <ThemeProvider>
    <LayoutContent {...props} />
    </ThemeProvider>
    );
    }
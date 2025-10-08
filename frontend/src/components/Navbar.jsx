import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Home, BookOpen, Github } from 'lucide-react';
import logo from '../assets/logo.jpg';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const logoRef = useRef();

  useGSAP(() => {
    gsap.from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - CIRCULAR */}
          <Link to="/" className="flex items-center space-x-3" ref={logoRef}>
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/30 hover:ring-blue-500 transition-all">
              <img
                src={logo}
                alt="SocialScribe Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Social Scribe
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI-Powered Content
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/docs"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Docs</span>
            </Link>
            <a
              href="https://github.com/Nabin-09/SocialScribe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* CTA Button */}
          <Link
            to="/#generate"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

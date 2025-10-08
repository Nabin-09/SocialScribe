import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Home, BookOpen, Github, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3" ref={logoRef}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-blue-500/50 hover:ring-blue-400 transition-all">
              <img
                src={logo}
                alt="SocialScribe Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Social Scribe
              </h1>
              <p className="text-xs text-gray-400">
                AI-Powered Content
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/docs"
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Docs</span>
            </Link>
            <a
              href="https://github.com/Nabin-09/SocialScribe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* CTA Button + Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/#generate"
              className="hidden sm:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-700/50">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition py-2"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition py-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Docs</span>
            </Link>
            <a
              href="https://github.com/Nabin-09/SocialScribe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition py-2"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
            <Link
              to="/#generate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

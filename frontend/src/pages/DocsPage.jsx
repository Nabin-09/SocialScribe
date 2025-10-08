import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  BookOpen,
  Download,
  Terminal,
  Rocket,
  Code,
  CheckCircle,
  ArrowRight,
  Github,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function DocsPage() {
  const contentRef = useRef();

  useGSAP(() => {
    gsap.from('.doc-section', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, { scope: contentRef });

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl" ref={contentRef}>
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 doc-section">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
            Documentation
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 px-4">
            Everything you need to get started with SocialScribe
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 doc-section">
          <a
            href="#installation"
            className="p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-blue-500 transition group"
          >
            <Download className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-2 sm:mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-white mb-1 text-sm sm:text-base">
              Installation
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              Set up SocialScribe locally
            </p>
          </a>

          <a
            href="#usage"
            className="p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-purple-500 transition group"
          >
            <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-2 sm:mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-white mb-1 text-sm sm:text-base">
              Quick Start
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              Create your first post
            </p>
          </a>

          <a
            href="https://github.com/Nabin-09/SocialScribe"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-green-500 transition group"
          >
            <Github className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-2 sm:mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-white mb-1 text-sm sm:text-base">
              Source Code
            </h3>
            <p className="text-xs sm:text-sm text-white/70">
              View on GitHub
            </p>
          </a>
        </div>

        {/* Installation Section */}
        <section id="installation" className="mb-8 sm:mb-12 doc-section">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20">
            <div className="flex items-center mb-4 sm:mb-6">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2 sm:mr-3" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Installation
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center">
                  <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 font-bold text-sm sm:text-base">
                    1
                  </span>
                  Clone the Repository
                </h3>
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                  <code className="text-green-400 font-mono text-xs sm:text-sm block">
                    git clone https://github.com/Nabin-09/SocialScribe.git
                    <br />
                    cd SocialScribe
                  </code>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center">
                  <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 font-bold text-sm sm:text-base">
                    2
                  </span>
                  Set Up Backend
                </h3>
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto mb-3">
                  <code className="text-green-400 font-mono text-xs sm:text-sm block">
                    cd backend
                    <br />
                    npm install
                  </code>
                </div>
                <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3">
                  Create a <code className="bg-white/10 px-2 py-1 rounded text-xs">`.env`</code> file:
                </p>
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                  <code className="text-yellow-400 font-mono text-xs sm:text-sm block">
                    MONGODB_URI=your_mongodb_connection_string
                    <br />
                    GEMINI_API_KEY=your_gemini_api_key
                    <br />
                    PORT=5000
                  </code>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center">
                  <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 font-bold text-sm sm:text-base">
                    3
                  </span>
                  Set Up Frontend
                </h3>
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                  <code className="text-green-400 font-mono text-xs sm:text-sm block">
                    cd ../frontend
                    <br />
                    npm install
                  </code>
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center">
                  <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 font-bold text-sm sm:text-base">
                    4
                  </span>
                  Start Development Servers
                </h3>
                <p className="text-white/70 mb-3 text-xs sm:text-sm">
                  Open two terminal windows:
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white/90 mb-1 sm:mb-2">
                      Terminal 1 - Backend:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                      <code className="text-green-400 font-mono text-xs sm:text-sm block">
                        cd backend
                        <br />
                        npm run dev
                      </code>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white/90 mb-1 sm:mb-2">
                      Terminal 2 - Frontend:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                      <code className="text-green-400 font-mono text-xs sm:text-sm block">
                        cd frontend
                        <br />
                        npm run dev
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 sm:p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-300 text-sm sm:text-base">
                      All Done!
                    </p>
                    <p className="text-xs sm:text-sm text-green-400 mt-1">
                      Open <code className="bg-green-900/30 px-2 py-0.5 rounded text-xs">http://localhost:5173</code> in your browser
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section id="usage" className="mb-8 sm:mb-12 doc-section">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20">
            <div className="flex items-center mb-4 sm:mb-6">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mr-2 sm:mr-3" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How to Use
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  1. Create a Campaign Brief
                </h3>
                <ul className="space-y-2 text-white/80 text-sm sm:text-base">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Select your target <strong>platform</strong> (Twitter, LinkedIn, Instagram, Facebook)
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Choose the <strong>tone</strong> (Professional, Casual, Playful, Inspirational)
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Describe your <strong>topic</strong> in the text area
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    Add optional <strong>constraints</strong> (hashtags, mentions, keywords)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  2. Generate AI Drafts
                </h3>
                <p className="text-white/80 mb-2 sm:mb-3 text-sm sm:text-base">
                  Click the <strong>"Generate Drafts"</strong> button. The AI will:
                </p>
                <ul className="space-y-2 text-white/80 text-sm sm:text-base">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Ground content with brand guidelines
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Apply platform-specific constraints
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Run safety checks (toxicity, PII, URL validation)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  3. Review & Edit
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-2">
                  Each generated draft includes:
                </p>
                <ul className="space-y-1 sm:space-y-2 text-white/80 text-sm sm:text-base">
                  <li>• <strong>Risk Badge</strong> - Safety status indicator</li>
                  <li>• <strong>Edit Button</strong> - Modify the generated text</li>
                  <li>• <strong>Character Counter</strong> - Platform-specific limit tracking</li>
                  <li>• <strong>Metadata</strong> - Platform, tone, timestamp</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  4. Approve & Manage
                </h3>
                <p className="text-white/80 mb-2 sm:mb-3 text-sm sm:text-base">
                  Use the filter tabs to view:
                </p>
                <ul className="space-y-1 sm:space-y-2 text-white/80 text-sm sm:text-base">
                  <li>• <strong>All Drafts</strong> - Every generated post</li>
                  <li>• <strong>Approved</strong> - Ready-to-publish content (green cards)</li>
                  <li>• <strong>Pending</strong> - Posts awaiting review</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-8 sm:mb-12 doc-section">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Human-in-the-Loop</h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    AI generates, humans approve. Full control over published content.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Brand Safety</h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    Automated safety checks for toxicity, profanity, and compliance.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Multi-Platform</h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    Optimized for Twitter, LinkedIn, Instagram, and Facebook.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">RAG-Powered</h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    Retrieval-Augmented Generation with brand guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center doc-section">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg text-sm sm:text-base"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-180" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

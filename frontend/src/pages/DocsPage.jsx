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
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl" ref={contentRef}>
        {/* Hero Section */}
        <div className="text-center mb-12 doc-section">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to get started with SocialScribe
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 doc-section">
          <a
            href="#installation"
            className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition group"
          >
            <Download className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Installation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set up SocialScribe locally
            </p>
          </a>

          <a
            href="#usage"
            className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition group"
          >
            <Rocket className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Quick Start
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create your first post
            </p>
          </a>

          <a
            href="https://github.com/Nabin-09/SocialScribe"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 transition group"
          >
            <Github className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Source Code
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View on GitHub
            </p>
          </a>
        </div>

        {/* Installation Section */}
        <section id="installation" className="mb-12 doc-section">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Terminal className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Installation
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                    1
                  </span>
                  Clone the Repository
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 font-mono text-sm">
                    git clone https://github.com/Nabin-09/SocialScribe.git
                    <br />
                    cd SocialScribe
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                    2
                  </span>
                  Set Up Backend
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
                  <code className="text-green-400 font-mono text-sm">
                    cd backend
                    <br />
                    npm install
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Create a <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.env</code> file:
                </p>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-yellow-400 font-mono text-sm">
                    MONGODB_URI=your_mongodb_connection_string
                    <br />
                    GEMINI_API_KEY=your_gemini_api_key
                    <br />
                    PORT=5000
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                    3
                  </span>
                  Set Up Frontend
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 font-mono text-sm">
                    cd ../frontend
                    <br />
                    npm install
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold">
                    4
                  </span>
                  Start Development Servers
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Open two terminal windows:
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Terminal 1 - Backend:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400 font-mono text-sm">
                        cd backend
                        <br />
                        npm run dev
                      </code>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Terminal 2 - Frontend:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400 font-mono text-sm">
                        cd frontend
                        <br />
                        npm run dev
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">
                      All Done!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Open <code className="bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded">http://localhost:5173</code> in your browser
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Section */}
        <section id="usage" className="mb-12 doc-section">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <Code className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How to Use
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  1. Create a Campaign Brief
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Select your target <strong>platform</strong> (Twitter, LinkedIn, Instagram, Facebook)
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Choose the <strong>tone</strong> (Professional, Casual, Playful, Inspirational)
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Describe your <strong>topic</strong> in the text area
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    Add optional <strong>constraints</strong> (hashtags, mentions, keywords)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  2. Generate AI Drafts
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Click the <strong>"Generate Drafts"</strong> button. The AI will:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Ground content with brand guidelines (shown in Knowledge Panel)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Apply platform-specific constraints (character limits, tone)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Run safety checks (toxicity, PII, URL validation)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  3. Review & Edit
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Each generated draft includes:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 mt-3">
                  <li>• <strong>Risk Badge</strong> - Safety status indicator</li>
                  <li>• <strong>Edit Button</strong> - Modify the generated text</li>
                  <li>• <strong>Character Counter</strong> - Platform-specific limit tracking</li>
                  <li>• <strong>Metadata</strong> - Platform, tone, timestamp</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  4. Approve & Manage
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Use the filter tabs to view:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• <strong>All Drafts</strong> - Every generated post</li>
                  <li>• <strong>Approved</strong> - Ready-to-publish content (green cards)</li>
                  <li>• <strong>Pending</strong> - Posts awaiting review</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12 doc-section">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Human-in-the-Loop</h3>
                  <p className="text-sm opacity-90">
                    AI generates, humans approve. Full control over published content.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Brand Safety</h3>
                  <p className="text-sm opacity-90">
                    Automated safety checks for toxicity, profanity, and compliance.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Multi-Platform</h3>
                  <p className="text-sm opacity-90">
                    Optimized for Twitter, LinkedIn, Instagram, and Facebook.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">RAG-Powered</h3>
                  <p className="text-sm opacity-90">
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
          >
            <ArrowRight className="w-5 h-5 transform rotate-180" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

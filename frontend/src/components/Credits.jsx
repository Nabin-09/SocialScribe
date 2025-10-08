import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export default function Credits() {
  return (
    <footer id="credits" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Credits & Attribution</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            SocialScribe is built with modern technologies and inspired by research in
            human-in-the-loop AI systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Technologies */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Technologies</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• React + Vite</li>
              <li>• Node.js + Express</li>
              <li>• MongoDB Atlas</li>
              <li>• Google Gemini AI</li>
              <li>• GSAP Animation</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-green-400">Research Foundation</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• RAG (Retrieval-Augmented Generation)</li>
              <li>• Human-in-the-Loop AI</li>
              <li>• Brand Safety Guardrails</li>
              <li>• IEEE Research Papers</li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Developer</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                Built by <strong>Nabin Sharma</strong>
              </p>
              <p className="text-sm text-gray-400">
                Amity University Greater Noida<br />
                B.Tech CSE (2022-2026)
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com" className="hover:text-blue-400 transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" className="hover:text-blue-400 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:nabin@example.com" className="hover:text-blue-400 transition">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using AI-Assisted Development
          </p>
          <p className="mt-2">© 2025 SocialScribe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

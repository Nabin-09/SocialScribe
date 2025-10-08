import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function EnhancedBriefForm({ onGenerate, isLoading }) {
  const [activeTab, setActiveTab] = useState('brief');
  const [formData, setFormData] = useState({
    platform: 'Twitter',
    tone: 'Professional',
    topic: '',
    constraints: '',
  });

  const buttonRef = useRef();
  const formRef = useRef();

  // Pulse animation for generate button
  useGSAP(() => {
    if (!isLoading && buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.02,
        duration: 1,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }, { dependencies: [isLoading], scope: buttonRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    gsap.to(formRef.current, {
      opacity: 0.5,
      duration: 0.3,
      ease: 'power2.out',
    });

    onGenerate(formData);
  };

  const tones = ['Professional', 'Casual', 'Playful', 'Inspirational'];
  const platforms = ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'];

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-2xl border border-white/20">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-white/20">
        <button
          onClick={() => setActiveTab('brief')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'brief'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          1. Core Brief
        </button>
        <button
          onClick={() => setActiveTab('constraints')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'constraints'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          2. Constraints
        </button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Tab 1: Core Brief */}
        {activeTab === 'brief' && (
          <>
            <div>
              <label className="block font-semibold mb-2 text-white">
                Topic / Description
              </label>
              <textarea
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                placeholder="What is this post about? Be specific..."
                className="w-full p-3 border-2 border-white/30 bg-white/5 text-white placeholder-gray-400 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                maxLength={500}
              />
              <span className="text-sm text-gray-400">
                {formData.topic.length}/500
              </span>
            </div>
          </>
        )}

        {/* Tab 2: Constraints */}
        {activeTab === 'constraints' && (
          <>
            <div>
              <label className="block font-semibold mb-2 text-white">
                Platform
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, platform })
                    }
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      formData.platform === platform
                        ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                        : 'bg-white/5 text-gray-300 border-white/20 hover:border-blue-400'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-white">
                Tone
              </label>
              <div className="grid grid-cols-2 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setFormData({ ...formData, tone })}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      formData.tone === tone
                        ? 'bg-purple-500 text-white border-purple-600 shadow-lg'
                        : 'bg-white/5 text-gray-300 border-white/20 hover:border-purple-400'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-white">
                Additional Constraints
              </label>
              <input
                type="text"
                value={formData.constraints}
                onChange={(e) =>
                  setFormData({ ...formData, constraints: e.target.value })
                }
                placeholder="e.g., Include #AI, mention @company"
                className="w-full p-3 border-2 border-white/30 bg-white/5 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* Generate Button */}
        <button
          ref={buttonRef}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isLoading ? 'Generating Drafts...' : 'Generate Drafts'}
        </button>
      </form>
    </div>
  );
}

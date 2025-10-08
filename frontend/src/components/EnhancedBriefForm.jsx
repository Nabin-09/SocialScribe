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

  // Fade out form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    // Animate form fade
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
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('brief')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'brief'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          1. Core Brief
        </button>
        <button
          onClick={() => setActiveTab('constraints')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'constraints'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
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
              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Topic / Description
              </label>
              <textarea
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                placeholder="What is this post about? Be specific..."
                className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition"
                maxLength={500}
              />
              <span className="text-sm text-gray-500">
                {formData.topic.length}/500
              </span>
            </div>
          </>
        )}

        {/* Tab 2: Constraints */}
        {activeTab === 'constraints' && (
          <>
            <div>
              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
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
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
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
                        ? 'bg-teal-500 text-white border-teal-600 shadow-lg'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-teal-400'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Additional Constraints
              </label>
              <input
                type="text"
                value={formData.constraints}
                onChange={(e) =>
                  setFormData({ ...formData, constraints: e.target.value })
                }
                placeholder="e.g., Include #AI, mention @company"
                className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </>
        )}

        {/* Generate Button */}
        <button
          ref={buttonRef}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isLoading ? 'Generating Drafts...' : 'Generate Drafts'}
        </button>
      </form>
    </div>
  );
}

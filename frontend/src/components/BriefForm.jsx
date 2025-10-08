import { useState } from 'react';

export default function BriefForm({ onGenerate, isLoading }) {
  const [formData, setFormData] = useState({
    platform: 'Twitter',
    tone: 'Professional',
    topic: '',
    constraints: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    onGenerate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Campaign Brief</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Platform Selection */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({...formData, platform: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Twitter</option>
            <option>LinkedIn</option>
            <option>Instagram</option>
            <option>Facebook</option>
          </select>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Tone</label>
          <div className="grid grid-cols-2 gap-3">
            {['Professional', 'Casual', 'Playful', 'Inspirational'].map(tone => (
              <label key={tone} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                <input
                  type="radio"
                  value={tone}
                  checked={formData.tone === tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="font-medium">{tone}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Topic Input */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Topic/Description</label>
          <textarea
            value={formData.topic}
            onChange={(e) => setFormData({...formData, topic: e.target.value})}
            placeholder="What is this post about?"
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
          />
          <span className="text-sm text-gray-500">{formData.topic.length}/500</span>
        </div>

        {/* Constraints Input */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Additional Constraints (Optional)</label>
          <input
            type="text"
            value={formData.constraints}
            onChange={(e) => setFormData({...formData, constraints: e.target.value})}
            placeholder="e.g., Include #AI, mention @company"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Generating...' : '✨ Generate Post'}
        </button>
      </form>
    </div>
  );
}

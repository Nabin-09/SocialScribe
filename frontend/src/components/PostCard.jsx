import { useState } from 'react';

const platformLimits = {
  Twitter: 280,
  LinkedIn: 3000,
  Instagram: 2200,
  Facebook: 63206
};

const platformIcons = {
  Twitter: '🐦',
  LinkedIn: '💼',
  Instagram: '📸',
  Facebook: '👥'
};

export default function PostCard({ post, onSave, onDelete }) {
  const [editedText, setEditedText] = useState(post.finalText || post.generatedText);
  const [isEditing, setIsEditing] = useState(false);

  const charLimit = platformLimits[post.platform];
  const isOverLimit = editedText.length > charLimit;

  const handleSave = () => {
    onSave(post._id, editedText);
    setIsEditing(false);
  };

  const handleApprove = () => {
    onSave(post._id, editedText, true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {platformIcons[post.platform]} {post.platform}
          </span>
          <span className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {post.tone}
          </span>
        </div>
        {post.approved && (
          <span className="text-green-600 font-medium text-sm">✓ Approved</span>
        )}
      </div>

      {/* Topic */}
      <p className="text-sm text-gray-600 mb-3">
        <strong>Topic:</strong> {post.topic}
      </p>

      {/* Post Content */}
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={6}
        />
      ) : (
        <p className="p-3 bg-gray-50 rounded-lg mb-2 whitespace-pre-wrap text-gray-800">
          {editedText}
        </p>
      )}

      {/* Character Count */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-sm font-medium ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
          {editedText.length} / {charLimit} characters
        </span>
        <span className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={isOverLimit}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditedText(post.finalText || post.generatedText);
                setIsEditing(false);
              }}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              ✏️ Edit
            </button>
            {!post.approved && (
              <button
                onClick={handleApprove}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                ✓ Approve
              </button>
            )}
            <button
              onClick={() => onDelete(post._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
}

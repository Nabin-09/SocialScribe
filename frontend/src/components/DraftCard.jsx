import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Edit2, CheckCircle, Trash2, AlertCircle } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const platformLimits = {
  Twitter: 280,
  LinkedIn: 3000,
  Instagram: 2200,
  Facebook: 63206,
};

const platformIcons = {
  Twitter: '🐦',
  LinkedIn: '💼',
  Instagram: '📸',
  Facebook: '👥',
};

const assessRisk = (text) => {
  const hasURLs = /https?:\/\//.test(text);
  const hasProfanity = /\b(bad|worst|terrible)\b/i.test(text);
  
  if (hasProfanity) return { level: 'high', label: 'Review Required', color: 'red' };
  if (hasURLs) return { level: 'medium', label: 'URL Check', color: 'yellow' };
  return { level: 'low', label: 'Safe', color: 'green' };
};

export default function DraftCard({ post, onSave, onDelete }) {
  const [editedText, setEditedText] = useState(post.finalText || post.generatedText);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef();
  const actionsRef = useRef();

  const risk = assessRisk(editedText);
  const charLimit = platformLimits[post.platform];
  const isOverLimit = editedText.length > charLimit;

  // Hover animation - only for non-approved posts
  useGSAP(() => {
    if (isHovered && !post.approved) {
      gsap.to(cardRef.current, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
      if (actionsRef.current) {
        gsap.to(actionsRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      if (!post.approved && actionsRef.current) {
        gsap.to(actionsRef.current, {
          y: 10,
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        });
      }
    }
  }, { dependencies: [isHovered, post.approved], scope: cardRef });

  const handleApprove = () => {
    onSave(post._id, editedText, true);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-4 sm:p-6 rounded-xl border-2 relative transition-all ${
        post.approved
          ? 'bg-green-50 border-green-500 shadow-lg shadow-green-500/20'
          : 'bg-white/90 backdrop-blur-sm border-gray-300 hover:border-blue-400 shadow-md'
      }`}
    >
      {/* Approved Badge */}
      {post.approved && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold bg-green-600 text-white">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">Approved</span>
            <span className="sm:hidden">✓</span>
          </span>
        </div>
      )}

      {/* Risk Badge - Only for pending */}
      {!post.approved && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span
            className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold ${
              risk.color === 'green'
                ? 'bg-green-100 text-green-700'
                : risk.color === 'yellow'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{risk.label}</span>
            <span className="sm:hidden">{risk.color === 'green' ? '✓' : '⚠'}</span>
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center mb-3 flex-wrap gap-2">
        <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
          post.approved
            ? 'bg-green-200 text-green-900'
            : 'bg-blue-100 text-blue-800'
        }`}>
          <span className="mr-1">{platformIcons[post.platform]}</span>
          <span className="hidden sm:inline">{post.platform}</span>
        </span>
        <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm ${
          post.approved
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {post.tone}
        </span>
      </div>

      {/* Topic */}
      <p className={`text-xs sm:text-sm mb-3 ${
        post.approved ? 'text-green-800 font-medium' : 'text-gray-600'
      }`}>
        <strong>Topic:</strong> {post.topic}
      </p>

      {/* Post Content */}
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-3 border-2 border-blue-400 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm sm:text-base"
          rows={6}
        />
      ) : (
        <p className={`p-3 sm:p-4 rounded-lg mb-2 whitespace-pre-wrap min-h-[100px] sm:min-h-[120px] text-sm sm:text-base ${
          post.approved
            ? 'bg-green-100 text-gray-900 font-medium'
            : 'bg-gray-50 text-gray-800'
        }`}>
          {editedText}
        </p>
      )}

      {/* Character Count */}
      <div className="flex justify-between items-center mb-3 text-xs sm:text-sm">
        <span className={`font-medium ${
          isOverLimit ? 'text-red-600' : post.approved ? 'text-green-700' : 'text-gray-600'
        }`}>
          {editedText.length} / {charLimit}
        </span>
        <span className={`text-xs ${post.approved ? 'text-green-600' : 'text-gray-500'}`}>
          {new Date(post.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {/* Actions - Pending Posts */}
      {!post.approved && (
        <div
          ref={actionsRef}
          className="flex gap-2 opacity-0"
          style={{ transform: 'translateY(10px)' }}
        >
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  onSave(post._id, editedText);
                  setIsEditing(false);
                }}
                disabled={isOverLimit}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition flex items-center justify-center gap-1 text-sm sm:text-base"
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Save</span>
                <span className="sm:hidden">✓</span>
              </button>
              <button
                onClick={() => {
                  setEditedText(post.finalText || post.generatedText);
                  setIsEditing(false);
                }}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition text-sm sm:text-base"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-1 text-sm sm:text-base"
              >
                <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Edit</span>
                <span className="sm:hidden">✏️</span>
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-1 text-sm sm:text-base"
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Approve</span>
                <span className="sm:hidden">✓</span>
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Actions - Approved Posts (Only Delete) */}
      {post.approved && (
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(post._id)}
            className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      )}
    </div>
  );
}

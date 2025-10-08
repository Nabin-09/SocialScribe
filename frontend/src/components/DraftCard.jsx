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

  // Hover animation
  useGSAP(() => {
    if (isHovered && !post.approved) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(actionsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: post.approved ? '0 10px 30px rgba(34, 197, 94, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
      if (!post.approved) {
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
    
    // Animate to green
    gsap.to(cardRef.current, {
      backgroundColor: 'rgb(240, 253, 244)',
      borderColor: 'rgb(34, 197, 94)',
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-6 rounded-lg shadow-md border-2 relative transition-all ${
        post.approved
          ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Risk Badge */}
      {!post.approved && (
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
              risk.color === 'green'
                ? 'bg-green-100 text-green-700'
                : risk.color === 'yellow'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <AlertCircle className="w-3 h-3 mr-1" />
            {risk.label}
          </span>
        </div>
      )}

      {/* Approved Badge */}
      {post.approved && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approved
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center mb-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 ${
          post.approved
            ? 'bg-green-200 text-green-800'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        }`}>
          {platformIcons[post.platform]} {post.platform}
        </span>
        <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
          {post.tone}
        </span>
      </div>

      {/* Topic */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        <strong>Topic:</strong> {post.topic}
      </p>

      {/* Post Content */}
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-3 border-2 border-blue-300 dark:border-blue-600 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
          rows={6}
        />
      ) : (
        <p className={`p-4 rounded-lg mb-2 whitespace-pre-wrap min-h-[120px] ${
          post.approved
            ? 'bg-green-100 dark:bg-green-900/30 text-gray-800 dark:text-gray-200'
            : 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
        }`}>
          {editedText}
        </p>
      )}

      {/* Character Count */}
      <div className="flex justify-between items-center mb-3">
        <span className={`text-sm font-medium ${
          isOverLimit ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {editedText.length} / {charLimit} characters
        </span>
        <span className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Actions */}
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
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Save
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
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Approved - minimal actions */}
      {post.approved && (
        <div className="flex gap-2">
          <button
            onClick={() => onDelete(post._id)}
            className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center justify-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';
import EnhancedBriefForm from './components/EnhancedBriefForm';
import FilterTabs from './components/FilterTabs';
import DraftCard from './components/DraftCard';
import KnowledgePanel from './components/KnowledgePanel';
import LoadingSpinner from './components/LoadingSpinner';
import Credits from './components/Credits';
import {
  generatePost,
  getAllPosts,
  updatePost,
  deletePost,
} from './services/api';

gsap.registerPlugin(useGSAP);

function App() {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [error, setError] = useState(null);

  const draftsRef = useRef([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on active filter
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'approved') return post.approved;
    if (activeFilter === 'pending') return !post.approved;
    return true; // 'all'
  });

  // Count posts
  const counts = {
    all: posts.length,
    approved: posts.filter((p) => p.approved).length,
    pending: posts.filter((p) => !p.approved).length,
  };

  // Stagger animation for drafts
  useGSAP(() => {
    if (filteredPosts.length > 0 && !isLoading) {
      gsap.from(draftsRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }
  }, { dependencies: [filteredPosts.length, isLoading, activeFilter] });

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data.posts);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handleGenerate = async (briefData) => {
    setIsLoading(true);
    setShowKnowledge(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const data = await generatePost(briefData);
      setPosts([data.post, ...posts]);
      setShowKnowledge(false);
    } catch (err) {
      setError('Failed to generate post. Please try again.');
      console.error(err);
      setShowKnowledge(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (postId, finalText, approve = false) => {
    try {
      const data = await updatePost(postId, {
        finalText,
        approved: approve,
      });
      setPosts(posts.map((p) => (p._id === postId ? data.post : p)));
    } catch (err) {
      alert('Failed to save changes');
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Delete this post?')) return;

    try {
      await deletePost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      alert('Failed to delete post');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section with Form */}
      <section id="home" className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Title */}
          <div className="text-center mb-12">
            <h2 className="text-6xl font-black text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Create Compelling Content
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Generate brand-safe social media posts with AI assistance and human oversight.
              Your content, your control.
            </p>
          </div>

          {/* Core Brief Form */}
          <div id="generate" className="max-w-2xl mx-auto">
            <EnhancedBriefForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Drafts Section */}
      <section className="px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-700 max-w-2xl mx-auto">
              ⚠️ {error}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <LoadingSpinner />
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4 font-medium">
                Grounding with brand assets and generating drafts...
              </p>
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No drafts yet. Create your first campaign brief above!
              </p>
            </div>
          )}

          {!isLoading && posts.length > 0 && (
            <>
              {/* Filter Tabs */}
              <div className="flex justify-center mb-8">
                <FilterTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={counts}
                />
              </div>

              {/* Drafts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post._id}
                    ref={(el) => (draftsRef.current[index] = el)}
                  >
                    <DraftCard
                      post={post}
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No {activeFilter} posts found.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Knowledge Panel */}
      <KnowledgePanel isVisible={showKnowledge} />

      {/* Credits Section */}
      <Credits />
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedGradientText from '../components/AnimatedGradientText';
import EnhancedBriefForm from '../components/EnhancedBriefForm';
import FilterTabs from '../components/FilterTabs';
import DraftCard from '../components/DraftCard';
import KnowledgePanel from '../components/KnowledgePanel';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  generatePost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../services/api';

gsap.registerPlugin(useGSAP);

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [error, setError] = useState(null);

  const draftsRef = useRef([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'approved') return post.approved;
    if (activeFilter === 'pending') return !post.approved;
    return true;
  });

  const counts = {
    all: posts.length,
    approved: posts.filter((p) => p.approved).length,
    pending: posts.filter((p) => !p.approved).length,
  };

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
    <>
      {/* Hero Section - FIXED SPACING */}
      <section id="home" className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 sm:mb-20">
            {/* Animated Gradient Hero Text - EXTRA BOTTOM SPACING */}
            <div className="mb-20 sm:mb-24 md:mb-28 pb-8">
              <AnimatedGradientText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight px-2 sm:px-4 pb-4">
                Built for AI Intelligence.
              </AnimatedGradientText>
            </div>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-lg mb-2 sm:mb-3 px-4">
              Generate brand-safe social media posts with AI assistance and human oversight.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto px-4">
              Your content, your control.
            </p>
          </div>

          <div id="generate" className="max-w-2xl mx-auto">
            <EnhancedBriefForm
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Drafts Section - RESPONSIVE */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="container mx-auto max-w-7xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-lg border border-red-500/50 max-w-2xl mx-auto backdrop-blur-sm text-sm sm:text-base">
              ⚠️ {error}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <LoadingSpinner />
              <p className="text-center text-white/80 mt-4 font-medium text-sm sm:text-base px-4">
                Grounding with brand assets and generating drafts...
              </p>
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <div className="text-5xl sm:text-6xl mb-4">📝</div>
              <p className="text-white/70 text-base sm:text-lg">
                No drafts yet. Create your first campaign brief above!
              </p>
            </div>
          )}

          {!isLoading && posts.length > 0 && (
            <>
              {/* Filter Tabs - RESPONSIVE */}
              <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
                <FilterTabs
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={counts}
                />
              </div>

              {/* Drafts Grid - RESPONSIVE */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
                  <p className="text-white/70 text-base sm:text-lg">
                    No {activeFilter} posts found.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <KnowledgePanel isVisible={showKnowledge} />
    </>
  );
}

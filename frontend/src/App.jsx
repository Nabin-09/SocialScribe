import { useState, useEffect } from 'react';
import BriefForm from './components/BriefForm';
import HistoryList from './components/HistoryList';
import LoadingSpinner from './components/LoadingSpinner';
import { generatePost, getAllPosts, updatePost, deletePost } from './services/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

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
    setError(null);
    try {
      const data = await generatePost(briefData);
      setPosts([data.post, ...posts]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to generate post. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (postId, finalText, approve = false) => {
    try {
      const data = await updatePost(postId, { 
        finalText, 
        approved: approve 
      });
      setPosts(posts.map(p => p._id === postId ? data.post : p));
    } catch (err) {
      alert('Failed to save changes');
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Delete this post?')) return;
    
    try {
      await deletePost(postId);
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) {
      alert('Failed to delete post');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            SocialScribe 🚀
          </h1>
          <p className="text-gray-600 text-lg">
            AI-Powered Social Media Post Generator
          </p>
        </div>

        {/* Brief Form */}
        <BriefForm onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
            ⚠️ {error}
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="mt-8">
            <LoadingSpinner />
            <p className="text-center text-gray-600 mt-2">Generating your post...</p>
          </div>
        )}

        {/* History List */}
        <div className="mt-8">
          <HistoryList
            posts={posts}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

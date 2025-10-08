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
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-12 px-6

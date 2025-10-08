import PostCard from './PostCard';

export default function HistoryList({ posts, onSave, onDelete }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-500 text-lg">No posts yet. Generate your first post above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        📚 Generated Posts 
        <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {posts.length}
        </span>
      </h2>
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

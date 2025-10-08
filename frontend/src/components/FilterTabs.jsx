import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function FilterTabs({ activeFilter, onFilterChange, counts }) {
  const indicatorRef = useRef();

  const filters = [
    { id: 'all', label: 'All Drafts', icon: FileText, count: counts.all },
    { id: 'approved', label: 'Approved', icon: CheckCircle, count: counts.approved },
    { id: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
  ];

  useGSAP(() => {
    const activeIndex = filters.findIndex((f) => f.id === activeFilter);
    gsap.to(indicatorRef.current, {
      x: activeIndex * 150,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, { dependencies: [activeFilter] });

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 inline-flex">
      {/* Active indicator */}
      <div
        ref={indicatorRef}
        className="absolute top-1 left-1 w-[142px] h-[calc(100%-8px)] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md transition-transform"
        style={{ transform: 'translateX(0)' }}
      />

      {/* Filter buttons */}
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative z-10 flex items-center space-x-2 px-6 py-3 rounded-md font-medium transition-colors ${
            activeFilter === filter.id
              ? 'text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <filter.icon className="w-4 h-4" />
          <span>{filter.label}</span>
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
              activeFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}

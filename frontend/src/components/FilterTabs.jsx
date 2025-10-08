import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FileText, CheckCircle, Clock } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function FilterTabs({ activeFilter, onFilterChange, counts }) {
  const indicatorRef = useRef();

  const filters = [
    { id: 'all', label: 'All', fullLabel: 'All Drafts', icon: FileText, count: counts.all },
    { id: 'approved', label: 'Approved', fullLabel: 'Approved', icon: CheckCircle, count: counts.approved },
    { id: 'pending', label: 'Pending', fullLabel: 'Pending', icon: Clock, count: counts.pending },
  ];

  useGSAP(() => {
    const activeIndex = filters.findIndex((f) => f.id === activeFilter);
    const buttonWidth = window.innerWidth < 640 ? 100 : 142; // Adjust for mobile
    gsap.to(indicatorRef.current, {
      x: activeIndex * buttonWidth,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, { dependencies: [activeFilter] });

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-1 inline-flex border border-white/20">
      {/* Active indicator */}
      <div
        ref={indicatorRef}
        className="absolute top-1 left-1 w-[92px] sm:w-[142px] h-[calc(100%-8px)] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md transition-transform"
        style={{ transform: 'translateX(0)' }}
      />

      {/* Filter buttons */}
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative z-10 flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-colors text-xs sm:text-base ${
            activeFilter === filter.id
              ? 'text-white'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <filter.icon className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">{filter.fullLabel}</span>
          <span className="sm:hidden">{filter.label}</span>
          <span
            className={`ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-bold ${
              activeFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-gray-300'
            }`}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
}

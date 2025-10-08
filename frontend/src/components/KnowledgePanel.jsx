import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FileText, TrendingUp, Shield } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function KnowledgePanel({ isVisible }) {
  const panelRef = useRef();
  const itemsRef = useRef([]);

  useGSAP(() => {
    if (isVisible) {
      // Slide up from bottom
      gsap.fromTo(
        panelRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // Stagger items in
      gsap.from(itemsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2,
      });
    } else if (panelRef.current) {
      // Slide down when hidden
      gsap.to(panelRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }, { dependencies: [isVisible], scope: panelRef });

  if (!isVisible) return null;

  const sources = [
    { icon: FileText, title: 'Brand Voice Guide', color: 'text-blue-500' },
    { icon: TrendingUp, title: 'Top Performer (Q3)', color: 'text-green-500' },
    { icon: Shield, title: 'Fact-Checked Source', color: 'text-purple-500' },
  ];

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 left-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 w-80 border-l-4 border-blue-500 z-50"
    >
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2" />
        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
          Grounding Sources
        </h4>
      </div>
      
      <div className="space-y-2">
        {sources.map((source, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <source.icon className={`w-4 h-4 ${source.color} mr-2`} />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {source.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

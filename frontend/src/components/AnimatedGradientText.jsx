import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function AnimatedGradientText({ children, className = '' }) {
  const textRef = useRef();

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <h2
      ref={textRef}
      className={`font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient ${className}`}
      style={{
        backgroundSize: '200% auto',
        animation: 'gradient 3s linear infinite',
      }}
    >
      {children}
    </h2>
  );
}

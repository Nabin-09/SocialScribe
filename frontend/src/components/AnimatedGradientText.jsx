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
      className={`font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient ${className}`}
      style={{
        backgroundSize: '200% auto',
        animation: 'gradient 3s linear infinite',
        textShadow: '0 0 40px rgba(96, 165, 250, 0.5)',
      }}
    >
      {children}
    </h2>
  );
}

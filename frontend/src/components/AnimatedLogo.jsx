import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/logo.jpg';

gsap.registerPlugin(useGSAP);

export default function AnimatedLogo() {
  const logoRef = useRef();
  const containerRef = useRef();
  const glowRef = useRef();

  useGSAP(() => {
    // Master timeline
    const tl = gsap.timeline();

    // Entrance animation
    tl.from(logoRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    })
    // Glow pulse
    .from(glowRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.5')
    // Continuous floating
    .to(logoRef.current, {
      y: -15,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    // Continuous glow pulse
    .to(glowRef.current, {
      scale: 1.1,
      opacity: 0.6,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    }, '-=2');

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative flex justify-center items-center py-8">
      {/* Glow effect behind logo */}
      <div
        ref={glowRef}
        className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-30 blur-3xl"
      />
      
      {/* Logo */}
      <div
        ref={logoRef}
        className="relative w-48 h-48 md:w-64 md:h-64 z-10"
      >
        <img
          src={logo}
          alt="SocialScribe Logo"
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 15px 40px rgba(59, 130, 246, 0.4))'
          }}
        />
      </div>
    </div>
  );
}

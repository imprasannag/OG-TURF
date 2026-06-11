import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show logo/text after a short delay or video progress
    const revealTimer = setTimeout(() => setIsRevealed(true), 2000);
    
    // Auto-dismiss after 6 seconds if video doesn't end sooner
    const endTimer = setTimeout(() => setIsVisible(false), 7000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(endTimer);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* VIDEO BACKGROUND (Full Screen Cover) */}
          <div className="absolute inset-0 bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source src="/vi.mp4" type="video/mp4" />
            </video>
            {/* Minimal Vignette for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          </div>

          {/* LOADING INDICATOR (Minimal) */}
          <div className="absolute bottom-12 w-64 h-[1px] bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '100%' }}
               transition={{ duration: 6, ease: "linear" }}
               className="h-full bg-primary"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

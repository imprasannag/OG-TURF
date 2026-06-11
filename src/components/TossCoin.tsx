import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw } from 'lucide-react';

interface TossCoinProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TossCoin({ isOpen, onClose }: TossCoinProps) {
  const [result, setResult] = useState<'HEADS' | 'TAILS' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    // Randomly decide result
    const newResult = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
    
    // Calculate total rotation to land on the correct face
    // Add more variance (7-12 full rotations) for a more intense spin
    const currentRot = Math.floor(rotation / 360) * 360;
    const extraRotations = (Math.floor(Math.random() * 6) + 8) * 360;
    const finalFaceRotation = newResult === 'HEADS' ? 0 : 180;
    const totalRotation = currentRot + extraRotations + finalFaceRotation;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setResult(newResult);
      setIsFlipping(false);
    }, 1200); // Slightly longer for the more intense spin
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm glass-card rounded-[2rem] p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-zinc-400" />
            </button>

            <div className="text-center">
              <h3 className="font-display text-2xl font-black text-white mb-2 uppercase tracking-tighter">Match Toss</h3>
              <p className="text-zinc-500 text-sm mb-12 uppercase tracking-widest font-bold">Heads or Tails?</p>

              <div className="relative h-48 flex items-center justify-center mb-12">
                <motion.div
                  animate={{ 
                    rotateY: rotation,
                    y: isFlipping ? [-50, -150, -50] : 0 
                  }}
                  transition={{ 
                    duration: 1, 
                    ease: "easeInOut",
                    y: { duration: 1, ease: "easeOut" }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-32 h-32 relative"
                >
                  {/* Heads Side (Gold) */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#9E7E38] rounded-full border-4 border-black/10 flex items-center justify-center shadow-[0_0_30px_rgba(253,185,49,0.3)]"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-black/80 font-black text-5xl drop-shadow-lg">H</span>
                  </div>
                  
                  {/* Tails Side (Silver) */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[#E6E6E6] via-[#CCCCCC] to-[#999999] rounded-full border-4 border-black/10 flex items-center justify-center shadow-[0_0_30px_rgba(204,204,204,0.3)]"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-black/60 font-black text-5xl drop-shadow-lg">T</span>
                  </div>
                </motion.div>

                {/* Ground Shadow */}
                <motion.div 
                  animate={{ scale: isFlipping ? [1, 0.4, 1] : 1, opacity: isFlipping ? [0.3, 0.1, 0.3] : 0.3 }}
                  className="absolute bottom-0 w-24 h-4 bg-black/40 rounded-full blur-md"
                />
              </div>

              <AnimatePresence mode="wait">
                {result && !isFlipping ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                  >
                    <span className="text-4xl font-black text-primary neon-text-glow uppercase tracking-tighter">
                      It's {result}!
                    </span>
                  </motion.div>
                ) : (
                   <div className="h-10" />
                )}
              </AnimatePresence>

              <div className="flex gap-4">
                <button
                  onClick={flipCoin}
                  disabled={isFlipping}
                  className="flex-1 bg-primary text-black font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  {result ? <RotateCcw size={18} /> : null}
                  {result ? 'Toss Again' : 'Flip Coin'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

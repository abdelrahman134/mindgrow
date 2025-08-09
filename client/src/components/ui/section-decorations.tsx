import { motion } from 'framer-motion';

interface SectionDecorationsProps {
  variant?: 'light' | 'dark';
}

const SectionDecorations = ({ variant = 'light' }: SectionDecorationsProps) => {
  const opacity = variant === 'light' ? 0.1 : 0.15;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Corner Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 360 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path
            d="M10,10 Q50,10 50,50 Q10,50 10,10"
            fill={`hsl(var(--mindgrow-blue))`}
            opacity={opacity}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 w-24 h-24"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: -360 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke={`hsl(var(--mindgrow-green))`}
            strokeWidth="2"
            opacity={opacity * 2}
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill={`hsl(var(--mindgrow-green))`}
            opacity={opacity}
          />
        </svg>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-6 h-6"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{ 
            background: `hsl(var(--mindgrow-orange))`,
            opacity: opacity * 3
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-8 h-8"
        animate={{
          x: [0, 15, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div 
          className="w-full h-full transform rotate-45"
          style={{ 
            background: `hsl(var(--mindgrow-pink))`,
            opacity: opacity * 2
          }}
        />
      </motion.div>

      {/* Connecting Lines */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <motion.path
          d="M0,50 Q50,20 100,50 Q150,80 200,50"
          fill="none"
          stroke={`hsl(var(--mindgrow-purple))`}
          strokeWidth="1"
          opacity={opacity * 2}
          strokeDasharray="5,10"
          style={{ pathLength: 1 }}
        />
      </motion.svg>

      {/* Bottom Decorations */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-20"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 100">
          <path
            d="M0,80 Q50,40 100,60 Q150,20 200,50 L200,100 L0,100 Z"
            fill={`hsl(var(--mindgrow-yellow))`}
            opacity={opacity}
          />
        </svg>
      </motion.div>

      {/* Particle System */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
            background: `hsl(var(--mindgrow-primary))`,
            opacity: opacity * 3
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );
};

export default SectionDecorations;
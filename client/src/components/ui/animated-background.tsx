import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Circles */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-mindgrow-pink/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-32 right-20 w-24 h-24 bg-mindgrow-blue/10 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="absolute bottom-32 left-32 w-40 h-40 bg-mindgrow-green/10 rounded-full"
        animate={{
          y: [0, -30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-28 h-28 bg-mindgrow-yellow/10 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Floating Lines */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-32 bg-gradient-to-b from-mindgrow-orange/20 to-transparent"
        style={{ transformOrigin: 'center bottom' }}
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/3 w-2 h-24 bg-gradient-to-b from-mindgrow-purple/20 to-transparent"
        style={{ transformOrigin: 'center bottom' }}
        animate={{
          rotate: [0, -15, 15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Curved Lines */}
      <motion.svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          rotate: 360 
        }}
        transition={{
          opacity: { duration: 8, repeat: Infinity },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        <path
          d="M50,100 Q100,50 150,100 Q100,150 50,100"
          fill="none"
          stroke="var(--mindgrow-blue)"
          strokeWidth="2"
          opacity="0.3"
        />
      </motion.svg>

      <motion.svg
        className="absolute bottom-1/4 left-1/4"
        width="150"
        height="150"
        viewBox="0 0 150 150"
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <circle
          cx="75"
          cy="75"
          r="50"
          fill="none"
          stroke="var(--mindgrow-green)"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="10,5"
        />
      </motion.svg>

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-20 right-1/4 w-16 h-16"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full border-2 border-mindgrow-orange/20 rotate-45" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 w-12 h-12"
        animate={{
          rotate: -360,
          y: [0, -10, 0],
        }}
        transition={{
          rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full bg-mindgrow-pink/10 transform rotate-45" />
      </motion.div>

      {/* Small Dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-mindgrow-primary/20 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
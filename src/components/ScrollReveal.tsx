import React from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// Executive easing curve: smooth, responsive, zero-lag settling
const EXECUTIVE_EASE = [0.16, 1, 0.3, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 28,
  scale = 1,
  className = '',
  viewportMargin = '-40px',
  once = true,
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: scale !== 1 ? scale : 1,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        margin: viewportMargin,
      }}
      transition={{
        duration,
        delay,
        ease: EXECUTIVE_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}> = ({ children, className = '', staggerDelay = 0.08, delayChildren = 0.05 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 20 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            ease: EXECUTIVE_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Interactive Card Motion Wrapper with smooth elevation on hover
export const MotionCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverY?: number;
}> = ({ children, className = '', onClick, hoverY = -4 }) => {
  return (
    <motion.div
      whileHover={{
        y: hoverY,
        transition: { duration: 0.25, ease: EXECUTIVE_EASE },
      }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Smooth Collapsible Accordion with AnimatePresence
export const AnimatedAccordionContent: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ isOpen, children, className = '' }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: 'auto',
            transition: {
              height: { duration: 0.3, ease: EXECUTIVE_EASE },
              opacity: { duration: 0.25, delay: 0.05 },
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              height: { duration: 0.25, ease: EXECUTIVE_EASE },
              opacity: { duration: 0.15 },
            },
          }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Executive Scroll Progress Indicator at page top
export const ScrollProgressBar: React.FC<{ accentColor?: string }> = ({
  accentColor = 'from-blue-600 via-indigo-500 to-sky-400',
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${accentColor} origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
    />
  );
};

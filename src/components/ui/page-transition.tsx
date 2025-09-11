import { motion, Variants } from "framer-motion";

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const
    },
  },
};

export function StaggerContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const adjustedVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, y: 0 },
      }
    : itemVariants;

  return (
    <motion.div variants={adjustedVariants} className={className}>
      {children}
    </motion.div>
  );
}

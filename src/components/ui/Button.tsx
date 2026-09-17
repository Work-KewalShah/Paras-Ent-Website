'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant,
  href,
  onClick,
  children,
  className,
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-radius-sm font-body font-medium text-small transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary';

  const variantStyles = {
    primary:
      'bg-accent text-bg-primary hover:bg-accent-hover',
    secondary:
      'border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary',
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: {
          duration: 0.2,
        },
      };

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

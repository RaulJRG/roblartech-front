'use client';

import { motion } from 'framer-motion';

const Section: React.FC<React.PropsWithChildren<{ id?: string; className?: string }>> = ({
  id, className, children,
}) => (
  <motion.section
    id={id}
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.35 }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
  >
    {children}
  </motion.section>
);

export default Section;

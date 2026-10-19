import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
export default function EventCard({
  number,
  name,
  copy,
  link,
  tone,
  index,
}: {
  number: string;
  name: string;
  copy: string;
  link: string;
  tone: string;
  index: number;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), {
    stiffness: 230,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 230,
    damping: 22,
  });
  const glareX = useTransform(pointerX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(pointerY, [-0.5, 0.5], [15, 85]);

  return (
    <motion.article
      whileHover={{ y: -12, scale: 1.025 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className={`event-card tone-${tone}`}
      data-index={index}
    >
      <motion.span className="event-glare" style={{ left: glareX, top: glareY }} />
      <motion.div
        initial={{ x: -42, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: index * 0.08 }}
        className="event-card-top"
      >
        <span className="event-number">{number}</span>
        <span className="event-cross">+</span>
      </motion.div>
      <motion.div
        initial={{ y: 54, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.12 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3>{name}</h3>
        <p>{copy}</p>
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            EXPLORE <ArrowUpRight size={19} />
          </a>
        )}
      </motion.div>
    </motion.article>
  );
}

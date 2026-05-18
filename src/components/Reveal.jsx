"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const Reveal = ({ children, width = "100%" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Анимация сработает только один раз
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ relative: true, width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 }, // Начальное состояние: невидимый и чуть ниже
          visible: { opacity: 1, y: 0 },  // Конечное состояние: видимый и на своем месте
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }} // Длительность и задержка
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
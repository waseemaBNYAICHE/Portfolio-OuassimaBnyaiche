import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import laptopCosmic from "../assets/laptop-cosmic.png";

export default function ComputerScene() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-13, 13]), { stiffness: 110, damping: 18 });
  const rotateX = useSpring(useTransform(y, [-.5, .5], [10, -10]), { stiffness: 110, damping: 18 });
  const [active, setActive] = useState(false);

  return <div ref={ref} className="computer-stage" onPointerMove={(event) => {
    const rect = ref.current?.getBoundingClientRect(); if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - .5); y.set((event.clientY - rect.top) / rect.height - .5); setActive(true);
  }} onPointerLeave={() => { x.set(0); y.set(0); setActive(false); }}>
    <div className="orbit orbit-one"><i /></div><div className="orbit orbit-two"><i /></div>
    <motion.img className="laptop-art" src={laptopCosmic} alt="Ordinateur portable affichant un environnement de développement" style={{ rotateX, rotateY, scaleX:-1,transformPerspective: 1000 }} animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    <motion.div className="floating-card card-react" animate={{ y: [0,-12,0], rotate: [-5,-2,-5] }} transition={{ duration: 4, repeat: Infinity }}><b>⚛</b><span>React<br/><small>Interfaces modernes</small></span></motion.div>
    <motion.div className="floating-card card-typescript" animate={{ y: [8,-8,8], rotate: [4,1,4] }} transition={{ duration: 5.2, repeat: Infinity }}><b>TS</b><span>TypeScript<br/><small>Code robuste</small></span></motion.div>
    <motion.div className="floating-card card-api" animate={{ y: [0,10,0], rotate: [6,3,6] }} transition={{ duration: 4.6, repeat: Infinity }}><b>{active ? "200" : "{ }"}</b><span>Laravel<br/><small>API performante</small></span></motion.div>
    <motion.div className="floating-card card-docker" animate={{ y: [-7,9,-7], rotate: [-3,1,-3] }} transition={{ duration: 5.6, repeat: Infinity }}><b>▣</b><span>Docker<br/><small>Déploiement simplifié</small></span></motion.div>
    <div className="stage-shadow" />
  </div>;
}

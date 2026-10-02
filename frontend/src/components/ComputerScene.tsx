import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
    <motion.div className="laptop" style={{ rotateX, rotateY, transformPerspective: 1000 }} animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
      <div className="laptop-screen">
        <div className="screen-camera" />
        <div className="screen-content">
          <div className="code-top"><span /><span /><span /><b>portfolio.tsx</b></div>
          <div className="screen-grid">
            <div className="code-lines"><i /><i /><i /><i /><i /><i /></div>
            <div className="screen-preview"><small>CREATIVE DEV</small><strong>Build.<br/><em>Imagine.</em><br/>Ship.</strong><span /></div>
          </div>
        </div>
      </div>
      <div className="laptop-base"><div className="keyboard">{Array.from({length: 48},(_,i)=><i key={i}/>)}</div><div className="trackpad" /></div>
      <div className="laptop-lip" />
    </motion.div>
    <motion.div className="floating-card card-react" animate={{ y: [0,-12,0], rotate: [-5,-2,-5] }} transition={{ duration: 4, repeat: Infinity }}><b>⚛</b><span>React<br/><small>Interface</small></span></motion.div>
    <motion.div className="floating-card card-api" animate={{ y: [0,10,0], rotate: [6,3,6] }} transition={{ duration: 4.6, repeat: Infinity }}><b>{active ? "200" : "{ }"}</b><span>Laravel API<br/><small>Connected</small></span></motion.div>
    <div className="stage-shadow" />
  </div>;
}

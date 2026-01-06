import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GeminiIcon, LinkedInIcon, N8nIcon, StripeIcon, OpenAIIcon, SlackIcon } from './BrandIcons';

// Workaround for TypeScript errors with framer-motion props
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;
const MotionDiv = motion.div as any;

// --- Types & Config ---
interface Point {
  x: number;
  y: number;
}

interface NodeData {
  id: string;
  icon: React.FC;
  position: 'left' | 'right';
  offset: { x: number; y: number };
  color: string;
  name: string;
}

const CENTER_X = 400;
const CENTER_Y = 250;
const CHIP_WIDTH = 144;

const nodes: NodeData[] = [
  { id: 'gemini', icon: GeminiIcon, position: 'left', offset: { x: -300, y: -120 }, color: '#4E79F3', name: 'Gemini' },
  { id: 'linkedin', icon: LinkedInIcon, position: 'left', offset: { x: -350, y: 0 }, color: '#0077B5', name: 'LinkedIn' },
  { id: 'n8n', icon: N8nIcon, position: 'left', offset: { x: -300, y: 120 }, color: '#FF6D5A', name: 'n8n' },
  { id: 'stripe', icon: StripeIcon, position: 'right', offset: { x: 300, y: -120 }, color: '#635BFF', name: 'Stripe' },
  { id: 'openai', icon: OpenAIIcon, position: 'right', offset: { x: 350, y: 0 }, color: '#FFFFFF', name: 'OpenAI' },
  { id: 'slack', icon: SlackIcon, position: 'right', offset: { x: 300, y: 120 }, color: '#E01E5A', name: 'Slack' },
];

// --- Sub-components ---

const DataParticles: React.FC = React.memo(() => {
  // Generate random particles once
  const particles = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      // Angle aléatoire autour du centre
      angle: Math.random() * 360,
      // Distance de déplacement
      distance: 100 + Math.random() * 150,
      size: Math.random() * 2 + 1, // 1px à 3px
      duration: 3 + Math.random() * 2, // 3s à 5s
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const targetX = Math.cos(rad) * p.distance;
        const targetY = Math.sin(rad) * p.distance;

        return (
          <MotionDiv
            key={p.id}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(124,58,237,0.8)]"
            style={{
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              willChange: 'transform, opacity'
            }}
            animate={{
              x: [0, targetX],
              y: [0, targetY],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeOut",
              delay: p.delay,
              times: [0, 0.2, 1]
            }}
          />
        );
      })}
    </div>
  );
});

const Chip: React.FC = React.memo(() => (
  <div 
    className="relative z-20 w-36 h-36 rounded-3xl bg-neutral-900 border border-neutral-700 shadow-[0_0_50px_rgba(124,58,237,0.3)] flex flex-col items-center justify-center group overflow-hidden"
    style={{ willChange: 'transform' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-20 flex flex-col justify-between">
      {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-0.5 w-full bg-neutral-700" />)}
    </div>
    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-20 flex flex-col justify-between">
      {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-0.5 w-full bg-neutral-700" />)}
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center text-center p-2">
      <div className="mb-1 w-6 h-6 border border-white/80 rounded-sm relative flex items-center justify-center">
        <div className="w-2 h-2 bg-white/80 rounded-full" />
      </div>
      <span className="text-[10px] font-bold tracking-[0.2em] leading-tight text-white uppercase">
        Intelligence<br/>Academy
      </span>
    </div>
    {/* Optimized Shimmer: purely opacity/transform */}
    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
  </div>
));

const ConnectionLine: React.FC<{ pathD: string; color: string; delay: number }> = React.memo(({ pathD, color, delay }) => {
  return (
    <>
      {/* 1. Glow Layer - Optimized: Using thicker semi-transparent stroke instead of blur filter for better FPS */}
      <path 
        d={pathD} 
        stroke={color} 
        strokeWidth="10" 
        strokeOpacity="0.05" 
        fill="none" 
      />
      <path 
        d={pathD} 
        stroke={color} 
        strokeWidth="4" 
        strokeOpacity="0.1" 
        fill="none" 
      />

      {/* 2. Base Static Line */}
      <path d={pathD} stroke="#1a1a1a" strokeWidth="2" fill="none" />
      
      {/* 3. Animated Data Stream - Using will-change and precise dash-array loop */}
      <MotionPath 
        d={pathD}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 260" // 300 unit cycle (40px visible line, 260px gap)
        strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -300 }} // Moves exactly one cycle length
        transition={{ 
          duration: 2, // Faster for more reactivity
          repeat: Infinity, 
          ease: "linear", 
          delay: delay 
        }}
        style={{ willChange: 'stroke-dashoffset', opacity: 0.9 }}
      />
      
      {/* 4. Leading Particle - Using Native SMIL for smoothest path following */}
       <MotionCircle r="2.5" fill="white">
        <animateMotion 
          dur="2s" 
          repeatCount="indefinite" 
          path={pathD} 
          begin={`${delay}s`} 
          keyPoints="0;1" 
          keyTimes="0;1" 
          calcMode="linear" 
        />
      </MotionCircle>
    </>
  );
});

const NodeItem: React.FC<{ data: NodeData; index: number }> = React.memo(({ data, index }) => {
  const Icon = data.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionDiv
      className="absolute flex items-center justify-center w-16 h-16 md:w-20 md:h-20 cursor-pointer"
      style={{
        left: CENTER_X + data.offset.x,
        top: CENTER_Y + data.offset.y,
        x: '-50%', // Replaces translate transform string for better Framer Motion compat
        y: '-50%',
        zIndex: isHovered ? 50 : 20,
        willChange: 'transform' // Optimization hint
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15, y: '-55%' }} // Adjusted y to account for percentage based positioning
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="relative w-full h-full">
        {/* Base Layer (Static) */}
        <div className="absolute inset-0 bg-neutral-800/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-colors duration-300" />
        
        {/* Glow Layer (Animated Opacity - Performance Optimized) */}
        {/* We use opacity transition on a pre-rendered element instead of animating box-shadow directly */}
        <MotionDiv 
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
             border: `1px solid ${data.color}`,
             background: `linear-gradient(135deg, ${data.color}33 0%, transparent 80%)`,
             boxShadow: `0 0 30px ${data.color}40`, // Static shadow, faded in via opacity
             willChange: 'opacity'
          }}
        />

        <div 
            className="relative z-10 w-1/2 h-1/2 mx-auto my-auto top-1/4 pointer-events-none transition-transform duration-300"
            style={{ 
              // Removed dynamic filter drop-shadow to improve FPS. 
              // Scale handled by CSS transition here for the icon specifically
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
        >
          <Icon />
        </div>

        {/* Tooltip */}
        <div 
          className={`absolute ${data.position === 'left' ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900/95 backdrop-blur border border-neutral-700 rounded-lg text-xs font-medium text-gray-200 shadow-xl pointer-events-none transition-all duration-300`}
          style={{ 
            opacity: isHovered ? 1 : 0,
            transform: `translateY(-50%) translateX(${isHovered ? 0 : (data.position === 'left' ? 10 : -10)}px)`,
            willChange: 'opacity, transform'
          }}
        >
          {data.name} Integration
        </div>
      </div>
    </MotionDiv>
  );
});

// --- Main Component ---

const CircuitDiagram: React.FC = () => {
  
  // Memoize line calculations so they don't run on every render
  const lineData = useMemo(() => {
    return nodes.map((node) => {
      const start = node.position === 'left' 
        ? { x: CENTER_X - CHIP_WIDTH / 2 + 10, y: CENTER_Y }
        : { x: CENTER_X + CHIP_WIDTH / 2 - 10, y: CENTER_Y };
      
      const end = { x: CENTER_X + node.offset.x, y: CENTER_Y + node.offset.y };
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      // Shorten the line slightly so it doesn't touch the icon
      const ratio = (dist - 40) / dist; 
      const actualEnd = { x: start.x + dx * ratio, y: start.y + dy * ratio };

      const midX = (start.x + actualEnd.x) / 2;
      const cp1 = { x: midX, y: start.y };
      const cp2 = { x: midX, y: actualEnd.y };
      const pathD = `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${actualEnd.x} ${actualEnd.y}`;

      return { id: node.id, pathD, color: node.color };
    });
  }, []); // Empty dependency array as nodes are constant

  return (
    <div className="relative w-[800px] h-[500px] max-w-full scale-[0.6] sm:scale-[0.7] md:scale-90 lg:scale-100 origin-top">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox={`0 0 800 500`} preserveAspectRatio="xMidYMid meet">
        {lineData.map((line, i) => (
          <ConnectionLine key={line.id} pathD={line.pathD} color={line.color} delay={i * 0.3} />
        ))}
      </svg>
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Particle Effects Layer */}
        <DataParticles />
        
        <Chip />
        {/* Static blurred background glow instead of filter on moving elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-purple/30 blur-[60px] rounded-full -z-10 animate-pulse-glow" />
      </div>
      {nodes.map((node, i) => (
        <NodeItem key={node.id} data={node} index={i} />
      ))}
    </div>
  );
};

export default CircuitDiagram;
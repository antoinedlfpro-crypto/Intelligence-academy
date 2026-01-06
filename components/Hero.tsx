import React from 'react';
import { motion } from 'framer-motion';
import CircuitDiagram from './CircuitDiagram';
import { SlackIcon, StripeIcon, HubSpotIcon, SalesforceIcon, OpenAIIcon, GoogleIcon } from './BrandIcons';

// Workaround for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 max-w-7xl mx-auto">
      
      {/* Badge */}
      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <MotionDiv 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
          animate={{ 
            boxShadow: ["0 0 0px rgba(124, 58, 237, 0)", "0 0 12px rgba(124, 58, 237, 0.3)", "0 0 0px rgba(124, 58, 237, 0)"],
            borderColor: ["rgba(255, 255, 255, 0.1)", "rgba(124, 58, 237, 0.4)", "rgba(255, 255, 255, 0.1)"]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
          Intelligence Academy for Teams just launched
          <span className="text-gray-500 ml-1">→</span>
        </MotionDiv>
      </MotionDiv>

      {/* Headline */}
      <MotionH1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tight leading-[1.1] max-w-4xl mx-auto"
      >
        Visual automation,<br /> without the chaos.
      </MotionH1>

      {/* Subhead */}
      <MotionP 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 text-lg md:text-xl text-gray-400 text-center max-w-2xl mx-auto leading-relaxed"
      >
        Intelligence Academy is the visual platform to build and automate workflows — fast, flexible, and code-free.
      </MotionP>

      {/* Visual Diagram Area */}
      <MotionDiv 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full mt-20 relative flex justify-center perspective-[1000px]"
      >
        <CircuitDiagram />
      </MotionDiv>

      {/* Partner Logos (Static footer for hero) */}
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-24 w-full flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
      >
         <div className="w-8 h-8 md:w-10 md:h-10" title="Slack">
            <SlackIcon />
         </div>
         <div className="w-8 h-8 md:w-10 md:h-10" title="Stripe">
            <StripeIcon />
         </div>
         <div className="w-8 h-8 md:w-10 md:h-10" title="HubSpot">
            <HubSpotIcon />
         </div>
         <div className="w-10 h-10 md:w-12 md:h-12" title="Salesforce">
            <SalesforceIcon />
         </div>
         <div className="w-8 h-8 md:w-10 md:h-10" title="OpenAI">
            <OpenAIIcon />
         </div>
         <div className="w-8 h-8 md:w-10 md:h-10" title="Google">
            <GoogleIcon />
         </div>
      </MotionDiv>
      
    </section>
  );
};

export default Hero;
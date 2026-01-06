import React from 'react';
import Hero from '../components/Hero';

const Home: React.FC = () => {
  return (
    <>
      {/* Top ambient glow spécifique à la home */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="relative z-10">
        <Hero />
      </div>
    </>
  );
};

export default Home;
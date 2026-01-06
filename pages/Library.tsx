import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Zap, X } from 'lucide-react';
import { workflows, categories } from '../data/workflows';

// Type hack for framer-motion
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;

const Library: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 1. Filter by Search Term first (used for counts and final display)
  const searchFilteredWorkflows = useMemo(() => {
    return workflows.filter(wf => 
      wf.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      wf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 2. Calculate counts per category based on the search results
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      if (cat === "Tout") {
        counts[cat] = searchFilteredWorkflows.length;
      } else {
        counts[cat] = searchFilteredWorkflows.filter(wf => wf.category === cat).length;
      }
    });
    return counts;
  }, [searchFilteredWorkflows]);

  // 3. Final Filter based on Active Category
  const finalWorkflows = useMemo(() => {
    return searchFilteredWorkflows.filter(wf => 
      activeCategory === "Tout" || wf.category === activeCategory
    );
  }, [activeCategory, searchFilteredWorkflows]);

  // Suggestions logic
  const suggestions = searchTerm.length > 0 
    ? workflows
        .filter(wf => wf.title.toLowerCase().includes(searchTerm.toLowerCase()) || wf.description.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(wf => wf.title)
        .slice(0, 5) // Limit to 5 suggestions
    : [];

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (title: string) => {
    setSearchTerm(title);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <MotionH1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          Nos Accélérateurs d'Intelligence
        </MotionH1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Des workflows pré-construits, testés et optimisés pour économiser 20h/semaine à vos équipes dès demain.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between z-30 relative">
        
        {/* Search with Autocomplete */}
        <div className="relative w-full md:w-96" ref={searchContainerRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher une automation..." 
            className="w-full bg-neutral-900 border border-white/10 rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none focus:border-brand-purple/50 focus:bg-neutral-800 transition-all placeholder-gray-600"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <MotionDiv 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden z-40"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0 flex items-center gap-2"
                  >
                    <Search size={14} className="opacity-50" />
                    {suggestion}
                  </button>
                ))}
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>

        {/* Categories with Dynamic Counts */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => {
            const count = categoryCounts[cat] || 0;
            const isActive = activeCategory === cat;
            const isDisabled = count === 0 && cat !== activeCategory; // Disable if no results unless it's currently selected

            return (
              <button 
                key={cat}
                onClick={() => !isDisabled && setActiveCategory(cat)}
                disabled={isDisabled}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                  ${isActive 
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                    : isDisabled
                      ? 'bg-neutral-900/50 text-gray-600 border border-white/5 cursor-default'
                      : 'bg-neutral-900 text-gray-400 border border-white/10 hover:border-white/30 hover:text-gray-200'
                  }
                `}
              >
                {cat}
                <span className={`
                  text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                  ${isActive 
                    ? 'bg-black/10 text-black' 
                    : isDisabled 
                      ? 'bg-white/5 text-gray-600'
                      : 'bg-white/10 text-gray-500'
                  }
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid with AnimatePresence for filtering */}
      <MotionDiv layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {finalWorkflows.map((wf) => (
            <MotionDiv
              layout
              key={wf.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Link to={`/workflow/${wf.id}`} className="block h-full">
                <div className="group h-full bg-neutral-900/50 border border-white/5 rounded-2xl p-6 hover:bg-neutral-900 hover:border-brand-purple/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden flex flex-col shadow-lg hover:shadow-brand-purple/10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-xl text-brand-purple group-hover:text-white group-hover:bg-brand-purple transition-colors">
                      <wf.icon size={24} />
                    </div>
                    <span className="text-xs font-mono text-gray-500 border border-white/5 px-2 py-1 rounded">
                      {wf.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white">{wf.title}</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-1">
                    {wf.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-brand-glow">
                      <Zap size={14} />
                      <span>Gain: {wf.timeSaved}</span>
                    </div>
                    <span className="text-sm font-medium text-white group-hover:underline decoration-brand-purple underline-offset-4">
                      Voir le détail →
                    </span>
                  </div>
                </div>
              </Link>
            </MotionDiv>
          ))}
        </AnimatePresence>
      </MotionDiv>
      
      {finalWorkflows.length === 0 && (
        <MotionDiv 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center py-20 text-gray-500"
        >
          <p className="text-lg">Aucun workflow ne correspond à votre recherche.</p>
          <button 
            onClick={clearSearch}
            className="mt-4 text-brand-purple hover:underline"
          >
            Réinitialiser la recherche
          </button>
        </MotionDiv>
      )}
    </div>
  );
};

export default Library;
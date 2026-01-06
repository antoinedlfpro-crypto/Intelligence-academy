import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, CheckCircle2, Zap, BarChart, Clock, MessageSquare } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

// Type hack
const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const Audit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'calendar'>('form');
  const [searchParams] = useSearchParams();
  const [challenge, setChallenge] = useState("");

  // Handle URL params for pre-filling
  useEffect(() => {
    const workflowName = searchParams.get('workflow');
    if (workflowName) {
      setChallenge(`Bonjour, je suis intéressé par le modèle "${workflowName}".\n\nJ'aimerais l'adapter pour mon entreprise car nous rencontrons actuellement ce problème : `);
      setActiveTab('form');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* LEFT SIDE: Value Proposition & "The Product" */}
      <div className="w-full lg:w-5/12 pt-10">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-glow border border-brand-purple/20 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            Offre Limitée - Valeur 500€
          </div>
          
          <MotionH1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
            Transformez votre chaos en <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-white">croissance.</span>
          </MotionH1>
          
          <MotionP className="text-lg text-gray-400 mb-10 leading-relaxed">
            Ne laissez pas les tâches manuelles ralentir votre scaling. Obtenez une feuille de route d'automatisation sur-mesure en 24h.
          </MotionP>

          {/* Visual Representation of the Audit Deliverable */}
          <div className="relative group">
             {/* The Card */}
             <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5">
                      <BarChart size={20} className="text-brand-glow" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Votre Rapport d'Audit</div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Prêt en 24h
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Zap, label: "Identification des goulots d'étranglement", color: "text-yellow-400" },
                    { icon: Clock, label: "Calcul du ROI & Temps gagné", color: "text-blue-400" },
                    { icon: CheckCircle2, label: "Architecture Technique Recommandée", color: "text-purple-400" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <item.icon size={16} className={item.color} />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 font-mono">
            <span>Trusted by:</span>
            <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span>ACME Corp</span>
              <span>Stark Ind</span>
              <span>Wayne Ent</span>
            </div>
          </div>

        </MotionDiv>
      </div>

      {/* RIGHT SIDE: Interactive Action Center */}
      <div className="w-full lg:w-7/12 relative">
        <MotionDiv 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10"
        >
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-white/10">
            <button 
              onClick={() => setActiveTab('form')}
              className={`py-4 text-sm font-medium transition-all relative ${activeTab === 'form' ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare size={16} />
                Message Asynchrone
              </div>
              {activeTab === 'form' && <MotionDiv layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple" />}
            </button>
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`py-4 text-sm font-medium transition-all relative ${activeTab === 'calendar' ? 'text-white bg-white/5' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar size={16} />
                Réserver un appel
              </div>
              {activeTab === 'calendar' && <MotionDiv layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple" />}
            </button>
          </div>

          <div className="p-8 min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* FORM VIEW */}
              {activeTab === 'form' && (
                <MotionDiv 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">Dites-nous tout.</h3>
                    <p className="text-sm text-gray-400">Nous analysons votre demande et revenons vers vous avec un plan.</p>
                  </div>

                  <form className="space-y-5 flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label className="text-xs font-medium text-gray-500 mb-1.5 block group-focus-within:text-brand-purple transition-colors">Prénom</label>
                        <input type="text" className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-700" placeholder="Ex: Thomas" />
                      </div>
                      <div className="group">
                        <label className="text-xs font-medium text-gray-500 mb-1.5 block group-focus-within:text-brand-purple transition-colors">Nom</label>
                        <input type="text" className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-700" placeholder="Anderson" />
                      </div>
                    </div>

                    <div className="group">
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block group-focus-within:text-brand-purple transition-colors">Email Professionnel</label>
                      <input type="email" className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-700" placeholder="thomas@matrix.com" />
                    </div>

                    <div className="group">
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block group-focus-within:text-brand-purple transition-colors">Votre challenge actuel</label>
                      <textarea 
                        rows={4} 
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-gray-700 resize-none" 
                        placeholder="Décrivez le processus qui vous prend trop de temps..."
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                      />
                    </div>

                    <button type="button" className="w-full mt-auto bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
                      Obtenir mon audit gratuit
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </MotionDiv>
              )}

              {/* CALENDAR VIEW */}
              {activeTab === 'calendar' && (
                <MotionDiv 
                  key="calendar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col h-full"
                >
                   <div className="mb-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Session Stratégique</h3>
                    <p className="text-sm text-gray-400">Choisissez un créneau de 15 min pour échanger avec un expert.</p>
                  </div>

                  {/* Fake Calendar UI for visual fidelity */}
                  <div className="flex-1 bg-neutral-900 rounded-xl border border-white/5 p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10 pointer-events-none" />
                     
                     <div className="grid grid-cols-7 gap-2 w-full max-w-xs opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(31)].map((_, i) => (
                           <div key={i} className={`h-8 w-8 rounded flex items-center justify-center text-xs ${i === 14 ? 'bg-brand-purple text-white shadow-[0_0_10px_rgba(124,58,237,0.5)]' : 'bg-white/5 text-gray-500'}`}>
                             {i + 1}
                           </div>
                        ))}
                     </div>

                     <div className="absolute z-20 bg-black/80 backdrop-blur border border-white/10 px-6 py-4 rounded-xl flex flex-col items-center">
                        <p className="text-white font-medium mb-3">Intégration Calendly</p>
                        <button className="bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors">
                          Ouvrir le calendrier
                        </button>
                     </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Dispo aujourd'hui
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand-purple" />
                      Visio Google Meet
                    </div>
                  </div>

                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Audit;
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const MotionDiv = motion.div as any;

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          Investissez dans la vitesse.
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Des plans transparents conçus pour évoluer avec vos besoins d'automatisation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        
        {/* Starter */}
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/30 border border-white/10 rounded-3xl p-8 flex flex-col"
        >
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-300 mb-2">Starter</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">Gratuit</span>
              <span className="text-gray-500">/pour toujours</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">Pour explorer la puissance de l'IA.</p>
          </div>
          
          <button className="w-full py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors mb-8">
            Créer un compte
          </button>

          <div className="space-y-4 flex-1">
            {['Accès à 3 workflows basiques', '100 exécutions / mois', 'Support communautaire', 'Intégration Notion basique'].map((feat, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                <Check size={18} className="text-gray-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Pro - Highlighted */}
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 border border-brand-purple shadow-[0_0_50px_rgba(124,58,237,0.15)] rounded-3xl p-8 flex flex-col relative scale-105 z-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-purple text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            Le plus populaire
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-medium text-brand-glow mb-2">Professionnel</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">99€</span>
              <span className="text-gray-500">/mois</span>
            </div>
            <p className="text-sm text-gray-400 mt-4">Pour automatiser sérieusement votre business.</p>
          </div>
          
          <button className="w-full py-3 rounded-lg bg-brand-purple hover:bg-brand-purple/90 text-white font-bold transition-colors mb-8 shadow-lg shadow-brand-purple/20">
            Démarrer l'essai (14 jours)
          </button>

          <div className="space-y-4 flex-1">
            {['Accès illimité à la bibliothèque', '500 exécutions / mois', 'Support prioritaire (Email)', 'Connexions API illimitées', 'Workflows Multi-étapes', 'Setup assisté (1h)'].map((feat, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <Check size={18} className="text-brand-purple shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Enterprise */}
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900/30 border border-white/10 rounded-3xl p-8 flex flex-col"
        >
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-300 mb-2">Organisation</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">Sur Devis</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">Pour les structures complexes.</p>
          </div>
          
          <button className="w-full py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors mb-8">
            Contacter les ventes
          </button>

          <div className="space-y-4 flex-1">
            {['Workflows sur mesure', 'Exécutions illimitées', 'Account Manager dédié', 'SSO & Sécurité avancée', 'SLA Garanti', 'Formation équipe'].map((feat, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                <Check size={18} className="text-gray-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </MotionDiv>

      </div>
    </div>
  );
};

export default Pricing;
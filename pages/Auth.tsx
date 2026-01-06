import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Workaround for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;

const Auth: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Utilisation de la méthode login du contexte
      await login(email);
      
      // Redirection après succès
      navigate('/bibliotheque');
      
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github' | 'linkedin') => {
    setLoading(true);
    // Simulation OAuth via le context login pour l'instant
    try {
      await login(`user-${provider}@example.com`);
      navigate('/bibliotheque');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white font-sans">
      
      {/* LEFT PANEL (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 flex-col justify-between p-12 relative overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-black font-bold text-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6">
            IA
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Intelligence Academy</h2>
        </div>

        <div className="relative z-10 max-w-md">
          <blockquote className="text-xl font-medium leading-relaxed text-gray-200">
            "FIKO a radicalement transformé notre efficacité opérationnelle. Ce qui nous prenait 2 jours est désormais automatisé en 15 minutes."
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500"></div>
            <div>
              <div className="font-bold text-white">Sarah Connor</div>
              <div className="text-sm text-gray-500">CTO, Cyberdyne Systems</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-xs text-gray-600">
          © 2024 Intelligence Academy. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 lg:hidden">
            <Link to="/" className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold text-sm">
                IA
            </Link>
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={isLogin ? 'login-header' : 'signup-header'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-3xl font-bold mb-2">
                  {isLogin ? 'Bon retour parmi nous' : 'Créer un compte'}
                </h1>
                <p className="text-gray-400">
                  {isLogin 
                    ? 'Entrez vos coordonnées pour accéder à votre espace.' 
                    : 'Commencez à automatiser votre business gratuitement.'}
                </p>
              </MotionDiv>
            </AnimatePresence>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-transparent transition-all"
                placeholder="nom@entreprise.com"
                required
              />
            </div>
            
            <div>
               <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Mot de passe</label>
               <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-transparent transition-all pr-10"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
               </div>
            </div>

            {error && (
              <MotionDiv 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2"
              >
                <AlertCircle size={16} />
                {error}
              </MotionDiv>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : (
                <>
                  {isLogin ? 'Se connecter' : "S'inscrire"} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-500">Ou continuer avec</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Google */}
            <button 
                onClick={() => handleOAuth('google')}
                className="flex items-center justify-center py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Connexion avec Google"
            >
               <img src="https://cdn.simpleicons.org/google/white" alt="Google" className="w-5 h-5" />
            </button>
            
            {/* GitHub */}
            <button 
                onClick={() => handleOAuth('github')}
                className="flex items-center justify-center py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Connexion avec GitHub"
            >
               <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className="w-5 h-5" />
            </button>
            
            {/* LinkedIn */}
            <button 
                onClick={() => handleOAuth('linkedin')}
                className="flex items-center justify-center py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Connexion avec LinkedIn"
            >
               <img src="https://cdn.simpleicons.org/linkedin/0077b5" alt="LinkedIn" className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">
                {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}
            </span>
            {' '}
            <button 
                onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                }}
                className="text-white font-medium hover:underline focus:outline-none"
            >
                {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowRight, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { User } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const { login, register } = useAuth();
  const [users, setUsers] = useLocalStorage<User[]>('all_users', []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (type === 'register' && !formData.username) newErrors.username = 'Le nom d\'utilisateur est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit faire au moins 6 caractères';
    }
    if (type === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (type === 'register') {
        const userExists = users.some(u => u.email === formData.email);
        if (userExists) {
          setServerError('Cet email est déjà utilisé');
          setIsSubmitting(false);
          return;
        }

        const newUser: User = {
          id: Date.now().toString(),
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

        setUsers([...users, newUser]);
        register(newUser);
        navigate('/');
      } else {
        const foundUser = users.find(u => u.email === formData.email && u.password === formData.password);
        if (foundUser) {
          login(foundUser);
          navigate('/');
        } else {
          setServerError('Email ou mot de passe incorrect');
        }
      }
    } catch (err) {
      setServerError('Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-4 py-12">
      {/* Background elements */}
      <div className="absolute top-0 left-0 h-full w-full opacity-20 transition-all">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <Link to="/" className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-[0_0_30px_rgba(229,9,20,0.5)]">
              <Play className="fill-white text-white" size={28} />
            </div>
            <span className="font-outfit text-3xl font-extrabold tracking-tight text-white">
              STREAM<span className="text-primary font-light">HUB</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-outfit text-white">
            {type === 'login' ? 'Bon retour parmi nous' : 'Créez votre compte'}
          </h2>
          <p className="mt-2 text-gray-400">
            {type === 'login' ? 'Accédez à vos films et séries préférés' : 'Commencez votre expérience de streaming dès aujourd\'hui'}
          </p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          <AnimatePresence mode='wait'>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 flex items-center gap-2 rounded-xl bg-primary/10 p-4 text-sm text-primary ring-1 ring-primary/20"
              >
                <AlertCircle size={18} />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Nom d'utilisateur</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-primary" size={20} />
                  <input
                    type="text"
                    placeholder="JohnDoe"
                    className={cn(
                      "w-full rounded-xl bg-white/5 py-3 pl-12 pr-4 text-white ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-primary focus:ring-opacity-50",
                      errors.username && "ring-primary/50"
                    )}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                  {errors.username && <p className="mt-1 text-xs text-primary">{errors.username}</p>}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-primary" size={20} />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className={cn(
                    "w-full rounded-xl bg-white/5 py-3 pl-12 pr-4 text-white ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-primary focus:ring-opacity-50",
                    errors.email && "ring-primary/50"
                  )}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="mt-1 text-xs text-primary">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Mot de passe</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-primary" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-xl bg-white/5 py-3 pl-12 pr-4 text-white ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-primary focus:ring-opacity-50",
                    errors.password && "ring-primary/50"
                  )}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <p className="mt-1 text-xs text-primary">{errors.password}</p>}
              </div>
            </div>

            {type === 'register' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Confirmer le mot de passe</label>
                <div className="relative group">
                  <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-primary" size={20} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={cn(
                      "w-full rounded-xl bg-white/5 py-3 pl-12 pr-4 text-white ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-primary focus:ring-opacity-50",
                      errors.confirmPassword && "ring-primary/50"
                    )}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-xs text-primary">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-primary py-3 font-bold text-white shadow-lg transition-all hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                ) : (
                  <>
                    <span>{type === 'login' ? 'Se connecter' : 'Créer un compte'}</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            {type === 'login' ? (
              <p>
                Vous n'avez pas de compte ?{' '}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                  Inscrivez-vous gratuitement
                </Link>
              </p>
            ) : (
              <p>
                Vous avez déjà un compte ?{' '}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Connectez-vous
                </Link>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

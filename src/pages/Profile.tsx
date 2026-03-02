import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MOCK_VIDEOS } from '../data/mockData';
import { User as UserIcon, Mail, Calendar, LogOut, Clock, Film, History, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [watchlist] = useLocalStorage<string[]>('user_watchlist', []);
  const [history] = useLocalStorage<any[]>('watch_history', []);

  const stats = [
    { label: 'Ma Liste', value: watchlist.length, icon: Film, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Visionnés', value: history.length, icon: History, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Temps total', value: `${history.length * 2}h`, icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Niveau', value: 'Cinéphile', icon: TrendingUp, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  return (
    <div className="min-h-screen pb-20 pt-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-primary/20 text-primary ring-1 ring-primary/30 md:h-48 md:w-48">
              <UserIcon size={64} className="md:hidden" />
              <UserIcon size={96} className="hidden md:block" />
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-green-500 ring-4 ring-dark"></div>
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="font-outfit text-4xl font-black md:text-5xl">{user?.username}</h1>
            <p className="mt-2 text-xl text-gray-400">{user?.email}</p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <button className="rounded-xl glass px-6 py-3 font-bold text-white transition-all hover:bg-white/10">
                Modifier le profil
              </button>
              <button 
                onClick={logout}
                className="flex items-center gap-2 rounded-xl bg-primary/10 px-6 py-3 font-bold text-primary transition-all hover:bg-primary/20"
              >
                <LogOut size={20} />
                Se déconnecter
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl glass p-6 shadow-xl"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="mb-8 font-outfit text-2xl font-bold">Activité récente</h2>
          <div className="rounded-3xl glass overflow-hidden ring-1 ring-white/10">
            {history.length > 0 ? (
              <div className="divide-y divide-white/5">
                {history.slice(0, 5).map((entry) => {
                  const video = MOCK_VIDEOS.find(v => v.id === entry.videoId);
                  return (
                    <div key={entry.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-white/5">
                      <img 
                        src={video?.thumbnailUrl} 
                        className="h-16 w-24 rounded-lg object-cover shadow-lg"
                        alt=""
                      />
                      <div className="flex-grow">
                        <h4 className="font-bold text-white">{video?.title}</h4>
                        <p className="text-xs text-gray-500">Visionné le {new Date(entry.watchedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="hidden sm:block">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
                          {video?.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                Aucune activité récente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

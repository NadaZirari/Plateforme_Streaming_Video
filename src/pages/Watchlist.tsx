import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Trash2, Heart, Film } from 'lucide-react';
import { MOCK_VIDEOS } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import VideoCard from '../components/ui/VideoCard';
import { motion, AnimatePresence } from 'framer-motion';

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('user_watchlist', []);

  const videosInWatchlist = MOCK_VIDEOS.filter(video => watchlist.includes(video.id));

  const clearWatchlist = () => {
    if (window.confirm('Voulez-vous vraiment vider votre liste ?')) {
      setWatchlist([]);
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <Heart size={20} className="fill-current" />
              <span className="text-sm font-bold uppercase tracking-wider">Ma Collection</span>
            </div>
            <h1 className="font-outfit text-4xl font-black md:text-5xl">Ma Liste</h1>
            <p className="mt-2 text-gray-400">Retrouvez tous les contenus que vous avez mis de côté.</p>
          </div>
          
          {videosInWatchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-bold text-gray-400 transition-all hover:bg-primary/10 hover:text-primary"
            >
              <Trash2 size={18} />
              Tout supprimer
            </button>
          )}
        </div>

        {videosInWatchlist.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode='popLayout'>
              {videosInWatchlist.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-6 rounded-full bg-white/5 p-10 ring-1 ring-white/10">
              <Film size={64} className="text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white">Votre liste est vide</h3>
            <p className="mt-4 max-w-md text-gray-500">
              Parcourez notre catalogue et ajoutez vos films et séries préférés pour les visionner plus tard.
            </p>
            <Link
              to="/"
              className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95"
            >
              <Play size={20} className="fill-current" />
              Découvrir le catalogue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;

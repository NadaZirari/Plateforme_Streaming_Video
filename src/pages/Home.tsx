import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Play, Info } from 'lucide-react';
import { MOCK_VIDEOS, CATEGORIES } from '../data/mockData';
import VideoCard from '../components/ui/VideoCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('recent'); // recent, rated, popular
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const heroVideo = MOCK_VIDEOS[0]; // Featured video

  const filteredVideos = useMemo(() => {
    return MOCK_VIDEOS.filter(video => {
      const matchesType = !type || video.type.toLowerCase() === type.toLowerCase();
      const matchesCategory = selectedCategory === 'Tous' || video.category === selectedCategory;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'recent') return b.releaseYear - a.releaseYear;
      if (sortBy === 'rated') return b.rating - a.rating;
      return 0;
    });
  }, [type, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {!type && !searchQuery && selectedCategory === 'Tous' && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroVideo.thumbnailUrl}
              alt={heroVideo.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
          </div>
          
          <div className="container relative mx-auto flex h-full flex-col justify-center px-4 pt-20 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary/30">FEATURED</span>
                <span className="text-sm font-medium text-gray-400">{heroVideo.releaseYear} • {heroVideo.category}</span>
              </div>
              <h1 className="font-outfit text-5xl font-black md:text-7xl lg:text-8xl">
                {heroVideo.title}
              </h1>
              <p className="mt-6 line-clamp-3 text-lg text-gray-300 md:text-xl">
                {heroVideo.description}
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-black transition-all hover:scale-105 active:scale-95">
                  <Play className="fill-current" size={24} /> Visionner
                </button>
                <button className="glass flex items-center gap-2 rounded-xl px-8 py-4 font-bold text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95">
                  <Info size={24} /> Plus d'infos
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 lg:px-8">
        {/* Filters and Search */}
        <div className={cn(
          "sticky top-[72px] z-40 mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/5 bg-dark/80 py-6 backdrop-blur-xl md:flex-row",
          (type || searchQuery || selectedCategory !== 'Tous') ? "mt-24" : "-mt-12 rounded-t-3xl"
        )}>
          <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
            <h2 className="font-outfit text-2xl font-bold">
              {type === 'film' ? 'Films' : type === 'serie' ? 'Séries' : 'Catalogue'}
            </h2>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                    selectedCategory === cat 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full rounded-xl bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white ring-1 ring-white/10 transition-all focus:bg-white/10 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Trier</span>
              </button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl glass p-2 shadow-2xl ring-1 ring-white/10"
                  >
                    {[
                      { id: 'recent', label: 'Plus récents' },
                      { id: 'rated', label: 'Mieux notés' },
                    ].map((idx) => (
                      <button
                        key={idx.id}
                        onClick={() => {
                          setSortBy(idx.id);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full rounded-lg px-4 py-2 text-left text-sm transition-colors hover:bg-white/5",
                          sortBy === idx.id ? "text-primary font-bold" : "text-gray-400"
                        )}
                      >
                        {idx.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode='popLayout'>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-white/5 p-6">
              <Search size={48} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white">Aucun résultat trouvé</h3>
            <p className="mt-2 text-gray-500">Essayez d'ajuster vos filtres ou votre recherche.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tous');
              }}
              className="mt-6 font-bold text-primary hover:underline"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

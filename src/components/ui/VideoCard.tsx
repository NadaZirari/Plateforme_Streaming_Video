import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Star, Check } from 'lucide-react';
import type { Video } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, priority = false }) => {
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('user_watchlist', []);
  
  const isInWatchlist = watchlist.includes(video.id);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchlist) {
      setWatchlist(watchlist.filter(id => id !== video.id));
    } else {
      setWatchlist([...watchlist, video.id]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col"
    >
      <Link to={`/video/${video.id}`} className="relative aspect-video overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-all duration-500 group-hover:shadow-primary/20">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading={priority ? "eager" : "lazy"}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110 active:scale-90">
              <Play className="fill-current" size={20} />
            </button>
            <button
              onClick={toggleWatchlist}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 active:scale-90",
                isInWatchlist ? "bg-primary border-primary text-white" : "border-white/50 bg-black/40 text-white hover:border-white"
              )}
            >
              {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
            </button>
            <div className="ml-auto flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-yellow-500 backdrop-blur-sm ring-1 ring-white/10">
              <Star size={12} className="fill-current" />
              {video.rating}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="line-clamp-1 font-outfit text-lg font-bold text-white">{video.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
              <span>{video.type}</span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span className="text-gray-400">{video.releaseYear}</span>
              <span className="h-1 w-1 rounded-full bg-white/30"></span>
              <span className="text-gray-400">{video.duration}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Information below for mobile or non-hover */}
      <div className="mt-3 flex items-start justify-between px-1 group-hover:opacity-0 transition-opacity duration-300">
        <div>
          <h3 className="line-clamp-1 font-outfit text-sm font-semibold text-white/90">{video.title}</h3>
          <p className="mt-1 text-xs text-gray-500">{video.category} • {video.releaseYear}</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-yellow-500/80">
          <Star size={12} className="fill-current" />
          {video.rating}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;

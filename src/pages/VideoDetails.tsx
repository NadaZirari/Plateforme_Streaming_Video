import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, Check, Star, Clock, Calendar, Users, ArrowLeft, ThumbsUp, Share2 } from 'lucide-react';
import { MOCK_VIDEOS } from '../data/mockData';
import type { Video } from '../types';
import VideoCard from '../components/ui/VideoCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const VideoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('user_watchlist', []);
  const [history, setHistory] = useLocalStorage<any[]>('watch_history', []);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  useEffect(() => {
    const foundVideo = MOCK_VIDEOS.find(v => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
      // Add to history
      const historyEntry = {
        id: Date.now().toString(),
        videoId: foundVideo.id,
        watchedAt: new Date().toISOString(),
        completed: false
      };
      setHistory(prev => [historyEntry, ...prev.filter(h => h.videoId !== foundVideo.id)].slice(0, 20));
    } else {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [id, navigate, setHistory]);

  if (!video) return null;

  const isInWatchlist = watchlist.includes(video.id);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      setWatchlist(watchlist.filter(vid => vid !== video.id));
    } else {
      setWatchlist([...watchlist, video.id]);
    }
  };

  const similarVideos = MOCK_VIDEOS.filter(v => v.category === video.category && v.id !== video.id);

  return (
    <div className="min-h-screen pb-20 pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
              {isTrailerPlaying ? (
                <iframe
                  src={`${video.trailerUrl}?autoplay=1`}
                  title={video.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover opacity-60 blur-[2px]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsTrailerPlaying(true)}
                      className="group flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-[0_0_50px_rgba(229,9,20,0.6)] transition-all hover:scale-110 active:scale-95"
                    >
                      <Play className="ml-1 fill-white text-white" size={40} />
                    </button>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 text-center text-white md:text-left">
                    <h1 className="font-outfit text-4xl font-black md:text-6xl">{video.title}</h1>
                    <p className="mt-2 text-primary font-bold tracking-widest uppercase">Bande-Annonce Officielle</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 font-bold text-yellow-500 ring-1 ring-yellow-500/30">
                    <Star size={18} className="fill-current" />
                    {video.rating}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={18} />
                    <span>{video.releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={18} />
                    <span>{video.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleWatchlist}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-6 py-3 font-bold transition-all hover:scale-105 active:scale-95",
                      isInWatchlist 
                        ? "bg-primary text-white" 
                        : "glass text-white hover:bg-white/10"
                    )}
                  >
                    {isInWatchlist ? <Check size={20} /> : <Plus size={20} />}
                    {isInWatchlist ? 'Dans ma liste' : 'Ma liste'}
                  </button>
                  <button className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-all hover:bg-white/10">
                    <ThumbsUp size={20} />
                  </button>
                  <button className="glass flex h-12 w-12 items-center justify-center rounded-xl transition-all hover:bg-white/10">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div>
                  <h2 className="font-outfit text-2xl font-bold">Synopsis</h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-300">
                    {video.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 border-t border-white/5 pt-8 md:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-white/5 p-2 text-primary">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Réalisateur</p>
                      <p className="mt-1 text-white font-semibold">{video.director}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-white/5 p-2 text-accent">
                      <Users className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Distribution</p>
                      <p className="mt-1 text-white font-semibold">{video.cast.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <h2 className="font-outfit text-xl font-bold">Contenus similaires</h2>
            <div className="flex flex-col gap-6">
              {similarVideos.length > 0 ? (
                similarVideos.map(v => (
                  <VideoCard key={v.id} video={v} />
                ))
              ) : (
                <p className="text-gray-500 italic">Aucun contenu similaire trouvé.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;

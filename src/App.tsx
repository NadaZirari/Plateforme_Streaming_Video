import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { Video } from './types';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home.tsx'));
const VideoDetails = lazy(() => import('./pages/VideoDetails.tsx'));
const Watchlist = lazy(() => import('./pages/Watchlist.tsx'));
const Profile = lazy(() => import('./pages/Profile.tsx'));
const AuthPage = lazy(() => import('./pages/auth/AuthPage.tsx'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col bg-dark text-white selection:bg-primary/30">
          <Navbar />
          <main className="flex-grow">
            <Suspense
              fallback={
                <div className="flex h-[80vh] w-full items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-primary"></div>
                </div>
              }
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/register" element={<AuthPage type="register" />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/content/:type" element={<Home />} />
                  <Route path="/video/:id" element={<VideoDetails />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="border-t border-white/5 bg-black/40 py-12 backdrop-blur-md">
            <div className="container mx-auto px-4 text-center">
              <div className="mb-6 flex justify-center gap-8 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">Aide</a>
                <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} STREAMHUB. Créé avec passion pour l'expérience ultime du cinéma.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

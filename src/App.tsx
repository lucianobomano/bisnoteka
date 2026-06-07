import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './components/Books';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import MagazinePage from './pages/MagazinePage';
import PodcastsPage from './pages/PodcastsPage';
import ShopPage from './pages/ShopPage';
import CoursesPage from './pages/CoursesPage';
import FaundrForgePage from './pages/FaundrForgePage';
import FaundrExperiencePage from './pages/FaundrExperiencePage';
import MindsetDisruptivoPage from './pages/MindsetDisruptivoPage';
import BisnotekaPage from './pages/BisnotekaPage';
import IdeaDetailsPage from './pages/IdeaDetailsPage';
import FaundrMagazineLandingPage from './pages/FaundrMagazineLandingPage';
import AdminDashboard from './pages/AdminDashboard';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import MembersLayout from './layouts/MembersLayout';
import MembersDashboardPage from './pages/MembersDashboardPage';
import MembersCoursePlayerPage from './pages/MembersCoursePlayerPage';
import BusinessOnboardingPage from './pages/BusinessOnboardingPage';
import MagazineReaderPage from './pages/MagazineReaderPage';
import BusinessDetailsPage from './pages/BusinessDetailsPage';

// Auth Imports
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route Guard for Protected Pages (e.g. Members Area, Business Creator)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-red-600 border-r-transparent border-b-red-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Route Guard for Auth Pages (Login/Register) - Redirects away if already logged in
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-red-600 border-r-transparent border-b-red-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (user) {
    if (!user.onboardingCompleted) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to="/membros" replace />;
  }
  
  return <>{children}</>;
};

// Route Guard for Onboarding Wizard - Requires active login but must not be completed yet
const OnboardingRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-red-600 border-r-transparent border-b-red-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.onboardingCompleted) {
    return <Navigate to="/membros" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isMembersPage = location.pathname.startsWith('/membros');
  const isReaderPage = location.pathname.startsWith('/ler-revista');
  const isAuthPage = ['/login', '/cadastro', '/onboarding'].includes(location.pathname);
  const hideHeaderFooter = isAdminPage || isMembersPage || isReaderPage || isAuthPage;
 
  return (
    <div className="min-h-screen bg-white">
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          {/* Public Landing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/livros" element={<Books />} />
          <Route path="/sucesso" element={<SuccessStoriesPage />} />
          <Route path="/revista" element={<MagazinePage />} />
          <Route path="/ler-revista/:id" element={<MagazineReaderPage />} />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/loja" element={<ShopPage />} />
          <Route path="/faundr-magazine" element={<FaundrMagazineLandingPage />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/cursos/:id" element={<CourseDetailsPage />} />
          <Route path="/forge" element={<FaundrForgePage />} />
          <Route path="/experience" element={<FaundrExperiencePage />} />
          <Route path="/disruptivo" element={<MindsetDisruptivoPage />} />
          
          {/* Authentication & User Onboarding */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/cadastro" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/onboarding" element={<OnboardingRoute><OnboardingPage /></OnboardingRoute>} />

          {/* Protected Business Generator Tool */}
          <Route path="/criar-negocio" element={<ProtectedRoute><BusinessOnboardingPage /></ProtectedRoute>} />
          <Route path="/bisnoteka" element={<ProtectedRoute><BisnotekaPage /></ProtectedRoute>} />
          <Route path="/bisnoteka/:id" element={<ProtectedRoute><IdeaDetailsPage /></ProtectedRoute>} />
          
          {/* Admin area (could also be protected by a role guard) */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Protected Checkout */}
          <Route path="/checkout/:id" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          
          {/* Members Area */}
          <Route path="/membros" element={<ProtectedRoute><MembersLayout /></ProtectedRoute>}>
            <Route index element={<MembersDashboardPage />} />
            <Route path="curso/:id" element={<MembersCoursePlayerPage />} />
            <Route path="negocio/:id" element={<BusinessDetailsPage />} />
          </Route>
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

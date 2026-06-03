import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isMembersPage = location.pathname.startsWith('/membros');
  const isReaderPage = location.pathname.startsWith('/ler-revista');
  const hideHeaderFooter = isAdminPage || isMembersPage || isReaderPage;

  return (
    <div className="min-h-screen bg-white">
      {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
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
          <Route path="/bisnoteka" element={<BisnotekaPage />} />
          <Route path="/bisnoteka/:id" element={<IdeaDetailsPage />} />
          <Route path="/criar-negocio" element={<BusinessOnboardingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/membros" element={<MembersLayout />}>
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
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;

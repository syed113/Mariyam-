import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme/theme';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CartDrawer } from './components/cart/CartDrawer';
import { BeautyAdvisorChatbot } from './components/ai/BeautyAdvisorChatbot';
import { FindMyShadeModal } from './components/ai/FindMyShadeModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { SeoHead } from './components/common/SeoHead';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BeautyQuizPage } from './pages/BeautyQuizPage';
import { RoutineBuilderPage } from './pages/RoutineBuilderPage';
import { BridalStudioPage } from './pages/BridalStudioPage';
import { GiftingPage } from './pages/GiftingPage';
import { ComparePage } from './pages/ComparePage';
import { SupportPage } from './pages/SupportPage';
import { AccountPage } from './pages/AccountPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ContentHubPage } from './pages/ContentHubPage';
import { ServicesPage } from './pages/ServicesPage';
import { BookingPage } from './pages/BookingPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider>
        <BrowserRouter>
          <SeoHead />
          <ScrollToTop />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pb: { xs: 7, md: 0 } }}>
            <Navbar />
            <Box component="main" sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ProductsPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/quiz" element={<BeautyQuizPage />} />
                <Route path="/routine-builder" element={<RoutineBuilderPage />} />
                <Route path="/bridal-studio" element={<BridalStudioPage />} />
                <Route path="/gifting" element={<GiftingPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/order/:orderId" element={<OrderSuccessPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/journal" element={<ContentHubPage />} />
                <Route path="/journal/:slug" element={<ContentHubPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutContactPage />} />
                <Route path="/contact" element={<AboutContactPage />} />
                <Route path="/tutorials" element={<TutorialsPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Box>
            <Footer />
            <CartDrawer />
            <BeautyAdvisorChatbot />
            <FindMyShadeModal />
            <QuickViewModal />
            <MobileBottomNav />
          </Box>
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default App;

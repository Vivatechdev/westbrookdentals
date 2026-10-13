import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PublicLayout } from './components/common/PublicLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { initializeStorageDefaults } from './services/dataService';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { BookAppointmentPage } from './pages/public/BookAppointmentPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { BookingConfirmationPage } from './pages/public/BookingConfirmationPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AppointmentsPage } from './pages/admin/AppointmentsPage';
import { SchedulePage } from './pages/admin/SchedulePage';
import { ServicesManagementPage } from './pages/admin/ServicesManagementPage';
import { DentistManagementPage } from './pages/admin/DentistManagementPage';
import { ClinicSettingsPage } from './pages/admin/ClinicSettingsPage';

export function App() {
  useEffect(() => {
    initializeStorageDefaults();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/dentists" element={<Navigate to="/" replace />} />
            <Route path="/team" element={<Navigate to="/" replace />} />
            <Route path="/book" element={<BookAppointmentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="services" element={<ServicesManagementPage />} />
            <Route path="dentists" element={<DentistManagementPage />} />
            <Route path="settings" element={<ClinicSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

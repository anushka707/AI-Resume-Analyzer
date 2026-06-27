import { Navigate, Route, Routes } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import PublicLayout from '../layouts/PublicLayout';
import DashboardPage from '../pages/DashboardPage';
import JobComparisonPage from '../pages/JobComparisonPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import ResumeDetailsPage from '../pages/ResumeDetailsPage';
import ResumeHistoryPage from '../pages/ResumeHistoryPage';
import ResumeUploadPage from '../pages/ResumeUploadPage';
import SignupPage from '../pages/SignupPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="upload" element={<ResumeUploadPage />} />
          <Route path="history" element={<ResumeHistoryPage />} />
          <Route path="resume/:id" element={<ResumeDetailsPage />} />
          <Route path="compare" element={<JobComparisonPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}


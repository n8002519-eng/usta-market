import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { MastersPage } from './pages/MastersPage';
import { MasterProfilePage } from './pages/MasterProfilePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { OrderPage } from './pages/OrderPage';
import { BecomeMasterPage } from './pages/BecomeMasterPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/masters" element={<MastersPage />} />
        <Route path="/masters/:id" element={<MasterProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/become-master" element={<BecomeMasterPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { OrderModal } from '../orders/OrderModal';
import { ContactModal } from '../masters/ContactModal';

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-slate-100 selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Global Modals */}
      <OrderModal />
      <ContactModal />
    </div>
  );
};

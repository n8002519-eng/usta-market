import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Wrench, 
  Heart, 
  User, 
  Menu, 
  X, 
  PlusCircle, 
  ShieldAlert, 
  ClipboardList, 
  Grid, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites, orders, openOrderModal } = useApp();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Bosh sahifa' },
    { to: '/masters', label: 'Ustalar' },
    { to: '/categories', label: 'Kategoriyalar' },
    { to: '/become-master', label: "Usta bo'lish" },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-dark-900/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-glow-orange-sm group-hover:shadow-glow-orange transition-all duration-300 transform group-hover:scale-105">
              <Wrench className="w-6 h-6 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  USTA<span className="text-brand-500">MARKET</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  UZ
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Ishonchli ustalar bir joyda
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-dark-800 shadow-sm border border-slate-700/80 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-dark-800/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favorites Icon */}
            <Link
              to="/dashboard?tab=favorites"
              className="relative p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              title="Saqlangan ustalar"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-dark-900 shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Dashboard / Orders */}
            <Link
              to="/dashboard"
              className="relative p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              title="Mening buyurtmalarim va profilim"
            >
              <ClipboardList className="w-5 h-5" />
              {orders.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-dark-900 shadow-sm">
                  {orders.length}
                </span>
              )}
            </Link>

            {/* Admin Badge/Link */}
            <Link
              to="/admin"
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-dark-800 hover:bg-dark-750 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Admin boshqaruv paneli"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Admin
            </Link>

            {/* Quick Order Button */}
            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              onClick={() => openOrderModal()}
              className="shadow-glow-orange-sm text-xs font-semibold py-2.5"
            >
              Xizmat buyurtma
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/dashboard?tab=favorites"
              className="relative p-2 rounded-xl bg-dark-850 text-slate-300"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Menyu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-dark-900/98 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(link.to)
                    ? 'text-white bg-dark-800 font-semibold border border-slate-700'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-dark-850 text-slate-200 text-sm border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-brand-400" />
                <span>Mening buyurtmalarim</span>
              </div>
              <span className="text-xs bg-dark-700 px-2 py-0.5 rounded text-white font-semibold">
                {orders.length}
              </span>
            </Link>

            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-dark-850 text-slate-200 text-sm border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Admin boshqaruv paneli</span>
              </div>
            </Link>

            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              onClick={() => {
                setIsMobileMenuOpen(false);
                openOrderModal();
              }}
              className="w-full mt-2"
            >
              Xizmatga buyurtma berish
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

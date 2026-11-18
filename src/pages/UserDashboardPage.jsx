import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MasterCard } from '../components/masters/MasterCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { 
  ClipboardList, 
  Heart, 
  User, 
  Clock, 
  MapPin, 
  Phone, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Save,
  ArrowRight
} from 'lucide-react';

export const UserDashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orders, masters, favorites, userProfile, updateUserProfile, updateOrderStatus, deleteOrder, openOrderModal } = useApp();

  const tabParam = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(tabParam);

  // Profile edit states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t && t !== activeTab) {
      setActiveTab(t);
    }
  }, [searchParams]);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.fullName || '');
      setPhone(userProfile.phone || '');
      setEmail(userProfile.email || '');
      setCity(userProfile.city || 'Toshkent shahri');
      setAddress(userProfile.address || '');
    }
  }, [userProfile]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      fullName: name,
      phone,
      email,
      city,
      address,
    });
  };

  const favoriteMastersList = masters.filter((m) => favorites.includes(m.id));

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Qabul qilindi':
        return <Badge variant="blue" size="sm">Qabul qilindi</Badge>;
      case 'Bajarildi':
        return <Badge variant="green" size="sm">Bajarildi</Badge>;
      case 'Bekor qilindi':
        return <Badge variant="red" size="sm">Bekor qilindi</Badge>;
      default:
        return <Badge variant="yellow" size="sm">Kutilmoqda</Badge>;
    }
  };

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & User Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              Shaxsiy kabinet
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              Xush kelibsiz, {userProfile?.fullName || 'Foydalanuvchi'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Buyurtmalaringiz holatini kuzating, sevimli ustalarni boshqaring.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => openOrderModal()}
            className="self-start sm:self-auto text-xs font-bold shadow-glow-orange-sm"
          >
            Yangi buyurtma berish
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => handleTabChange('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-brand-500 text-white shadow-glow-orange-sm'
                : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-slate-800'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Mening buyurtmalarim ({orders.length})
          </button>

          <button
            onClick={() => handleTabChange('favorites')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'favorites'
                ? 'bg-brand-500 text-white shadow-glow-orange-sm'
                : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            Saqlangan ustalar ({favorites.length})
          </button>

          <button
            onClick={() => handleTabChange('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-brand-500 text-white shadow-glow-orange-sm'
                : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            Mening profilim
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20">
                          #{order.id}
                        </span>
                        {getStatusBadge(order.status)}
                        <span className="text-xs text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                        <h3 className="font-bold text-white text-base">
                          {order.serviceCategory}
                        </h3>
                        <span className="text-xs text-slate-400">
                          Usta: <strong className="text-slate-200">{order.masterName}</strong>
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                        {order.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{order.location}</span>
                        </div>
                        {order.preferredDate && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>Muddati: {order.preferredDate}</span>
                          </div>
                        )}
                        <div className="text-slate-300 font-semibold">
                          Taxminiy narx: <span className="text-brand-400">{order.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions for this order */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800 w-full md:w-auto justify-end">
                      {order.status === 'Kutilmoqda' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Bekor qilindi')}
                          className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium transition-colors"
                        >
                          Bekor qilish
                        </button>
                      )}

                      {order.status === 'Qabul qilindi' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Bajarildi')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium transition-colors"
                        >
                          Ish bajarildi deb belgilash
                        </button>
                      )}

                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="p-2 rounded-xl bg-dark-800 text-slate-400 hover:text-red-400 hover:bg-dark-700 transition-colors"
                        title="O'chirish"
                        aria-label="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={ClipboardList}
                title="Hozircha buyurtmalar yo'q"
                description="Siz hali hech qanday xizmatga buyurtma bermagansiz. Bizning malakali ustalardan birini tanlang."
                actionLabel="Ustalarni ko'rish"
                onAction={() => handleTabChange('favorites')}
              />
            )}
          </div>
        )}

        {/* TAB 2: FAVORITES */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteMastersList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteMastersList.map((master) => (
                  <MasterCard key={master.id} master={master} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title="Saqlangan ustalar yo'q"
                description="Sizga ma'qul kelgan ustalarni yurakcha belgisini bosish orqali saqlab qo'yishingiz mumkin."
                actionLabel="Ustalarni ko'rish"
                onAction={() => window.location.href = '/masters'}
              />
            )}
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl rounded-3xl glass-card border border-slate-800 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1">
              Shaxsiy ma'lumotlar
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Buyurtma berish jarayonini tezlashtirish uchun ma'lumotlaringizni to'ldiring.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  To'liq ismingiz
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefon raqam
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email manzili
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Shahar
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Doimiy manzil (Tuman, ko'cha)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <Button type="submit" variant="primary" size="md" icon={Save}>
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

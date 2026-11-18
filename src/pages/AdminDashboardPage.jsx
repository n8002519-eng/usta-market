import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categoriesData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { 
  Users, 
  Briefcase, 
  ClipboardList, 
  FileCheck2, 
  Check, 
  X, 
  Tag, 
  Search, 
  ShieldAlert, 
  Plus, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Trash2
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { masters, orders, applications, reviewApplication, updateOrderStatus, deleteOrder } = useApp();

  const [activeTab, setActiveTab] = useState('applications'); // 'applications', 'orders', 'categories', 'masters'
  const [orderFilter, setOrderFilter] = useState('all');
  const [appFilter, setAppFilter] = useState('all');

  // Stats calculation
  const totalMasters = masters.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Kutilmoqda').length;
  const pendingApps = applications.filter(a => a.status === 'kutilmoqda').length;
  const completedOrders = orders.filter(o => o.status === 'Bajarildi').length;

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  const filteredApps = applications.filter(a => {
    if (appFilter === 'all') return true;
    return a.status === appFilter;
  });

  return (
    <div className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Boshqaruv markazi
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              USTA MARKET Admin Paneli
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ustalar arizalarini ko'rib chiqish, buyurtmalar oqimi va xizmatlar toifalarini boshqaring.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Tizim holati:</span>
            <Badge variant="green" size="sm">Jonli (Live)</Badge>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Jami Ustalar</span>
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalMasters}</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> Faol va tasdiqlangan
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Jami Buyurtmalar</span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalOrders}</div>
            <div className="text-[11px] text-blue-400 mt-1 font-medium">
              {completedOrders} ta muvaffaqiyatli yakunlangan
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Usta arizalari</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{applications.length}</div>
            <div className="text-[11px] text-amber-400 mt-1 font-medium">
              {pendingApps} ta tasdiq kutilmoqda
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Kategoriyalar</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{CATEGORIES.length}</div>
            <div className="text-[11px] text-slate-400 mt-1 font-medium">
              10 ta standart yo'nalish
            </div>
          </div>
        </div>

        {/* Admin Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'applications'
                ? 'bg-brand-500 text-white shadow-glow-orange-sm'
                : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-slate-800'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            Usta arizalari
            {pendingApps > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-dark-900 text-[10px] font-black flex items-center justify-center">
                {pendingApps}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-brand-500 text-white shadow-glow-orange-sm'
                : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-slate-800'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Buyurtmalar boshqaruvi ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-brand-500 text-white shadow-glow-orange-sm'
                : 'bg-dark-850 text-slate-300 hover:text-white hover:bg-dark-800 border border-slate-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            Kategoriyalar ({CATEGORIES.length})
          </button>
        </div>

        {/* TAB 1: MASTER APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs text-slate-400">
                Arizalarni tasdiqlash usta profilini darhol portalga qo'shadi.
              </span>
              <div className="flex items-center gap-2">
                {['all', 'kutilmoqda', 'tasdiqlandi', 'rad_etildi'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setAppFilter(filter)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                      appFilter === filter
                        ? 'bg-brand-500 text-white border-brand-500 font-bold'
                        : 'bg-dark-850 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {filter === 'all' ? 'Barchasi' : filter === 'kutilmoqda' ? 'Kutilmoqda' : filter === 'tasdiqlandi' ? 'Tasdiqlangan' : 'Rad etilgan'}
                  </button>
                ))}
              </div>
            </div>

            {filteredApps.length > 0 ? (
              <div className="space-y-3">
                {filteredApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl glass-card border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <img
                        src={app.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80'}
                        alt={app.fullName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-white text-base">{app.fullName}</h4>
                          <span className="text-xs font-mono text-slate-500">#{app.id}</span>
                          {app.status === 'tasdiqlandi' ? (
                            <Badge variant="green" size="xs">Tasdiqlandi</Badge>
                          ) : app.status === 'rad_etildi' ? (
                            <Badge variant="red" size="xs">Rad etildi</Badge>
                          ) : (
                            <Badge variant="yellow" size="xs">Kutilmoqda</Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-brand-400 font-semibold">
                          <span>{app.profession}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">{app.city}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-300">Tajriba: {app.experience}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-white">Narx: {app.startingPrice}</span>
                        </div>

                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {app.description}
                        </p>

                        <div className="text-[11px] text-slate-500 pt-1">
                          Telefon: <strong className="text-slate-300 font-mono">{app.phone}</strong> | Yuborilgan: {new Date(app.submittedAt).toLocaleDateString('uz-UZ')}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                      {app.status === 'kutilmoqda' ? (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={Check}
                            onClick={() => reviewApplication(app.id, 'tasdiqlandi')}
                            className="text-xs font-bold"
                          >
                            Tasdiqlash (Faollashtirish)
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={X}
                            onClick={() => reviewApplication(app.id, 'rad_etildi')}
                            className="text-xs text-rose-400 hover:text-rose-300"
                          >
                            Rad etish
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          Ko'rib chiqilgan
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FileCheck2}
                title="Arizalar mavjud emas"
                description="Hozirda tanlangan filtr bo'yicha hech qanday yangi usta arizasi yo'q."
              />
            )}
          </div>
        )}

        {/* TAB 2: MANAGE ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs text-slate-400">
                Mijozlar buyurtmalari ro'yxati va ularning holati.
              </span>
              <div className="flex items-center gap-2">
                {['all', 'Kutilmoqda', 'Qabul qilindi', 'Bajarildi', 'Bekor qilindi'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-colors ${
                      orderFilter === st
                        ? 'bg-brand-500 text-white border-brand-500 font-bold'
                        : 'bg-dark-850 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'Barchasi' : st}
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-dark-850">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-dark-900 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    <tr>
                      <th className="p-4">ID / Sana</th>
                      <th className="p-4">Mijoz</th>
                      <th className="p-4">Xizmat va Usta</th>
                      <th className="p-4">Manzil</th>
                      <th className="p-4">Holat</th>
                      <th className="p-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-dark-800/40 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-bold text-brand-400 block">{order.id}</span>
                          <span className="text-[11px] text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                          </span>
                        </td>
                        <td className="p-4">
                          <strong className="text-white block">{order.customerName}</strong>
                          <span className="text-[11px] font-mono text-slate-400">{order.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-white block">{order.serviceCategory}</span>
                          <span className="text-[11px] text-slate-400">Usta: {order.masterName}</span>
                        </td>
                        <td className="p-4 max-w-xs truncate" title={order.location}>
                          {order.location}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-dark-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                          >
                            <option value="Kutilmoqda">Kutilmoqda</option>
                            <option value="Qabul qilindi">Qabul qilindi</option>
                            <option value="Bajarildi">Bajarildi</option>
                            <option value="Bekor qilindi">Bekor qilindi</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-dark-700 transition-colors"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                icon={ClipboardList}
                title="Buyurtmalar topilmadi"
                description="Tanlangan holat bo'yicha hech qanday buyurtma mavjud emas."
              />
            )}
          </div>
        )}

        {/* TAB 3: MANAGE CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Xizmat toifalari</h3>
                <p className="text-xs text-slate-400">Platformadagi 10 ta asosiy mutaxassislik yo'nalishlari.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-5 rounded-2xl glass-card border border-slate-800 flex items-start justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.shortDesc}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-brand-400 font-semibold">
                      <span>{cat.count}+ usta ro'yxatdan o'tgan</span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-700 text-slate-300 shrink-0">
                    {cat.startingPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

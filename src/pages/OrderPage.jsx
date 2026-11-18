import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categoriesData';
import { CITIES } from '../data/citiesData';
import { Button } from '../components/common/Button';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Tag
} from 'lucide-react';

export const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { masters, createOrder, userProfile } = useApp();

  const preselectedMasterId = searchParams.get('master');
  const targetMaster = masters.find(m => m.id === preselectedMasterId);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState(targetMaster ? targetMaster.profession : 'Santexnik');
  const [selectedMasterId, setSelectedMasterId] = useState(preselectedMasterId || 'auto');
  const [city, setCity] = useState('Toshkent shahri');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Bugun (zudlik bilan)');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userProfile) {
      setCustomerName(userProfile.fullName || '');
      setPhone(userProfile.phone || '+998 ');
      if (userProfile.city) setCity(userProfile.city);
      if (userProfile.address) setAddress(userProfile.address);
    }
  }, [userProfile]);

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.customerName = "Ismingizni kiriting";
    if (!phone.trim() || phone.length < 9) errs.phone = "To'liq telefon raqamingizni kiriting";
    if (!address.trim()) errs.address = "Aniq manzil yoki mahallani yozing";
    if (!description.trim()) errs.description = "Qilinadigan ishni qisqacha ta'riflang";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const chosenMaster = masters.find(m => m.id === selectedMasterId);

    setTimeout(() => {
      const order = createOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        serviceCategory,
        masterId: chosenMaster ? chosenMaster.id : null,
        masterName: chosenMaster ? chosenMaster.fullName : 'Erkin tanlov (Birinchi bo\'sh usta)',
        location: `${city}, ${address.trim()}`,
        description: description.trim(),
        urgency,
        preferredDate,
        price: chosenMaster ? chosenMaster.startingPrice : "Kelishuv asosida",
      });

      setIsSubmitting(false);
      if (order) {
        navigate('/dashboard?tab=orders');
      }
    }, 450);
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Tezkor buyurtma
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Xizmatga buyurtma rasmiylashtirish
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Ish tafsilotlarini to'ldiring. Usta siz bilan 15 daqiqa ichida bog'lanib, narx va vaqtni tasdiqlaydi.
          </p>
        </div>

        {/* Selected Master Highlight (if any) */}
        {targetMaster && (
          <div className="mb-8 p-4 rounded-2xl glass-card border border-brand-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={targetMaster.avatar}
                alt={targetMaster.fullName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
              />
              <div>
                <span className="text-[11px] text-brand-400 font-bold uppercase tracking-wider block">Tanlangan usta:</span>
                <h4 className="font-bold text-white text-base">{targetMaster.fullName}</h4>
                <p className="text-xs text-slate-300">{targetMaster.profession} • Boshlang'ich: {targetMaster.startingPrice}</p>
              </div>
            </div>
            <Link to="/masters" className="text-xs text-slate-400 hover:text-white underline">
              Boshqa usta tanlash
            </Link>
          </div>
        )}

        {/* Main Form Box */}
        <div className="rounded-3xl glass-card border border-slate-800 p-6 sm:p-10 shadow-premium">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Client Info */}
            <div>
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-500 text-white text-xs font-black flex items-center justify-center">1</span>
                Mijoz ma'lumotlari
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ismingiz <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="To'liq ismingiz"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (errors.customerName) setErrors({ ...errors, customerName: null });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.customerName ? 'border-red-500' : 'border-slate-700 focus:border-brand-500'
                      }`}
                    />
                  </div>
                  {errors.customerName && <p className="text-[11px] text-red-400 mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Telefon raqam <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-brand-500'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Service & Master */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-500 text-white text-xs font-black flex items-center justify-center">2</span>
                Xizmat turi va usta
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Xizmat sohasi <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ustani tanlash
                  </label>
                  <select
                    value={selectedMasterId}
                    onChange={(e) => setSelectedMasterId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                  >
                    <option value="auto">Platforma tavsiya qilgan birinchi bo'sh usta</option>
                    {masters.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.fullName} — {m.profession} ({m.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Location & Details */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-500 text-white text-xs font-black flex items-center justify-center">3</span>
                Manzil va ish tavsifi
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Shahar / Viloyat <span className="text-brand-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                  >
                    {CITIES.filter(c => c !== 'Barcha shaharlar').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Aniq manzil (Tuman, ko'cha, uy raqami) <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Masalan: Yunusobod 14-mavze, 12-uy, 44-xonadon"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors({ ...errors, address: null });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.address ? 'border-red-500' : 'border-slate-700 focus:border-brand-500'
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Ish tavsifi va talablar <span className="text-brand-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Muammo nima va qanday ish bajarilishi kerak? Iloji boricha batafsil yozing..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: null });
                  }}
                  className={`w-full p-3.5 bg-dark-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                    errors.description ? 'border-red-500' : 'border-slate-700 focus:border-brand-500'
                  }`}
                />
                {errors.description && <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>}
              </div>

              {/* Date & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Qulay sana
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tezkorlik darajasi
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-3 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                  >
                    <option value="Bugun (zudlik bilan)">Bugun (zudlik bilan)</option>
                    <option value="1-2 kun ichida">1-2 kun ichida</option>
                    <option value="Shu hafta oxirigacha">Shu hafta oxirigacha</option>
                    <option value="Kelishuv asosida">Kelishuv asosida</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission & Guarantee Notice */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Buyurtma berish mutlaqo bepul. To'lov faqat ish bitgach.</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto font-bold px-8 shadow-glow-orange-sm text-sm"
                icon={Sparkles}
              >
                Buyurtmani rasmiylashtirish
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

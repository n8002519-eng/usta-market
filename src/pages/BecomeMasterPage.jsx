import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categoriesData';
import { CITIES } from '../data/citiesData';
import { Button } from '../components/common/Button';
import { 
  UserPlus, 
  User, 
  Phone, 
  Briefcase, 
  MapPin, 
  Clock, 
  CreditCard, 
  Image, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export const BecomeMasterPage = () => {
  const navigate = useNavigate();
  const { submitApplication } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [profession, setProfession] = useState('Santexnik');
  const [city, setCity] = useState('Toshkent shahri');
  const [experience, setExperience] = useState('5 yil');
  const [startingPrice, setStartingPrice] = useState('100,000 so\'m');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const sampleAvatars = [
    { label: 'Usta 1', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80' },
    { label: 'Usta 2', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80' },
    { label: 'Usta 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80' },
    { label: 'Usta 4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80' },
    { label: 'Usta 5', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80' },
  ];

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = "To'liq ism va familiyangizni kiriting";
    if (!phone.trim() || phone.length < 9) errs.phone = "Telefon raqamingizni to'liq kiriting";
    if (!description.trim() || description.length < 20) {
      errs.description = "Tajribangiz va o'zingiz haqingizda kamida 20 ta belgi yozing";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const selectedCategoryObj = CATEGORIES.find(c => c.name === profession) || CATEGORIES[0];

    setTimeout(() => {
      const created = submitApplication({
        fullName: fullName.trim(),
        phone: phone.trim(),
        profession,
        categorySlug: selectedCategoryObj.slug,
        city,
        experience,
        startingPrice,
        description: description.trim(),
        avatar: avatarUrl,
      });

      setIsSubmitting(false);
      if (created) {
        setIsSuccess(true);
      }
    }, 450);
  };

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3.5 py-1.5 rounded-full border border-brand-500/20">
            Hamkorlik
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-3">
            USTA MARKET ga usta sifatida qo'shiling
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            O'z mijozlar bazangizni kengaytiring, bo'sh vaqtingizni daromadga aylantiring va butun O'zbekistondan real buyurtmalarni oling.
          </p>
        </div>

        {/* Benefits Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Doimiy buyurtmalar oqimi</h4>
              <p className="text-xs text-slate-400 mt-1">Har kuni platformada 500 dan ortiq yangi xizmat so'rovlari yaratiladi.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">0% yashirin to'lovlar</h4>
              <p className="text-xs text-slate-400 mt-1">Ro'yxatdan o'tish bepul. Daromadingiz to'liq o'zingizda qoladi.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Shaxsiy profil va reyting</h4>
              <p className="text-xs text-slate-400 mt-1">Yaxshi bajarilgan har bir ish profilingiz reytingini va ishonchni oshiradi.</p>
            </div>
          </div>
        </div>

        {/* Success Banner or Form */}
        {isSuccess ? (
          <div className="p-8 sm:p-12 rounded-3xl glass-card border border-emerald-500/40 text-center max-w-xl mx-auto animate-fade-in shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Arizangiz muvaffaqiyatli qabul qilindi!</h3>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Moderatorimiz 24 soat ichida ma'lumotlaringizni tekshirib tasdiqlaydi. Tasdiqlangach, profilingiz avtomatik tarzda ustalarning jonli ro'yxatida ko'rinadi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Button variant="primary" size="md" onClick={() => navigate('/admin')}>
                Admin panelida arizani ko'rish
              </Button>
              <Button variant="secondary" size="md" onClick={() => navigate('/masters')}>
                Ustalar ro'yxatiga o'tish
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl glass-card border border-slate-800 p-6 sm:p-10 shadow-premium max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-brand-400" />
                  Usta anketasi
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Barcha yulduzcha (*) bilan belgilangan maydonlarni to'ldiring.
                </p>
              </div>

              {/* Avatar Preview & Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Profil fotosurati (Avatar)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500/50 shadow-md"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-white border border-slate-700 transition-colors inline-block">
                        Kompyuterdan yuklash
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                        />
                      </label>
                      <span className="text-xs text-slate-500">yoki namunalardan tanlang:</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {sampleAvatars.map((av, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setAvatarUrl(av.url)}
                          className={`w-9 h-9 rounded-xl overflow-hidden border transition-all ${
                            avatarUrl === av.url ? 'border-brand-500 ring-2 ring-brand-500/40' : 'border-slate-700 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    F.I.SH (Ism va familiyangiz) <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Masalan: Sardor Aliyev"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: null });
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 bg-dark-900 border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-brand-500'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Telefon raqamingiz <span className="text-brand-500">*</span>
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

              {/* Profession & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mutaxassislik (Soha) <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
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
                    Xizmat ko'rsatish shahri <span className="text-brand-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                    >
                      {CITIES.filter(c => c !== 'Barcha shaharlar').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Experience & Starting Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ish tajribangiz
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                    >
                      <option value="1-2 yil">1-2 yil</option>
                      <option value="3-5 yil">3-5 yil</option>
                      <option value="6-9 yil">6-9 yil</option>
                      <option value="10+ yil">10 yildan ortiq</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Boshlang'ich xizmat narxi
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Masalan: 80,000 so'm"
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Description / Bio */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  O'zingiz va xizmatlaringiz haqida batafsil <span className="text-brand-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Qanday ishlarni bajarasiz? Qanday asbob-uskunalaringiz bor? Mijozlar nega sizni tanlashi kerak?"
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

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Arizangiz 24 soat ichida ko'rib chiqiladi.
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="font-bold px-8 shadow-glow-orange-sm text-sm"
                  icon={Sparkles}
                >
                  Arizani yuborish
                </Button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

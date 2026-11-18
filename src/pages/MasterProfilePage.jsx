import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Phone, 
  Send, 
  Heart, 
  Share2, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Star,
  MessageSquarePlus,
  Maximize2,
  X
} from 'lucide-react';
import { RatingStars } from '../components/common/RatingStars';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const MasterProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { masters, favorites, toggleFavorite, openOrderModal, openContactModal } = useApp();
  const { showSuccess } = useToast();

  const [master, setMaster] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // New review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState([]);

  useEffect(() => {
    const found = masters.find((m) => m.id === id);
    if (found) {
      setMaster(found);
      setLocalReviews(found.reviews || []);
    }
  }, [id, masters]);

  if (!master) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-white mb-2">Usta profili topilmadi</h2>
        <p className="text-xs text-slate-400 mb-6">Ushbu identifikatorga ega usta mavjud emas yoki o'chirilgan bo'lishi mumkin.</p>
        <Link to="/masters">
          <Button variant="primary" size="sm">
            Ustalarga qaytish
          </Button>
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(master.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${master.fullName} — USTA MARKET`,
        text: `${master.fullName} (${master.profession}) xizmatlari. USTA MARKET platformasida buyurtma bering.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccess("Havola nusxalandi", "Profil havolasi nusxalandi.");
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: `r-new-${Date.now()}`,
      author: reviewerName.trim(),
      rating: Number(reviewRating),
      date: "Hozirgina",
      comment: reviewComment.trim(),
    };

    setLocalReviews([newRev, ...localReviews]);
    setShowReviewForm(false);
    setReviewerName('');
    setReviewComment('');
    showSuccess("Sharhingiz qabul qilindi", "Fikringiz uchun tashakkur! Sharh profilingizda e'lon qilindi.");
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Orqaga qaytish
          </button>
        </div>

        {/* Profile Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Box with Cover Image & Avatar */}
            <div className="rounded-3xl glass-card border border-slate-800 overflow-hidden relative shadow-premium">
              {/* Cover Banner */}
              <div className="h-44 sm:h-56 w-full relative">
                <img
                  src={master.coverImage || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80'}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                
                {/* Actions on cover */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl bg-dark-900/80 hover:bg-dark-900 text-white backdrop-blur-md border border-white/10 transition-colors"
                    title="Ulashish"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(master.id)}
                    className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
                      isFav
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-dark-900/80 hover:bg-dark-900 text-white border-white/10'
                    }`}
                    title={isFav ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Avatar & Details */}
              <div className="px-6 pb-6 pt-0 relative">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
                  <div className="relative">
                    <img
                      src={master.avatar}
                      alt={master.fullName}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-dark-900 shadow-2xl"
                    />
                    {master.verified && (
                      <span className="absolute bottom-1 right-1 bg-brand-500 text-white p-1.5 rounded-xl shadow-lg ring-2 ring-dark-900">
                        <CheckCircle2 className="w-4 h-4 fill-brand-500 text-white" />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Phone}
                      onClick={() => openContactModal(master)}
                      className="text-xs"
                    >
                      Aloqa
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Sparkles}
                      onClick={() => openOrderModal(master)}
                      className="text-xs font-bold shadow-glow-orange-sm"
                    >
                      Xizmatga buyurtma
                    </Button>
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {master.fullName}
                    </h1>
                    {master.badge && (
                      <Badge variant="orange" size="sm">
                        {master.badge}
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm font-bold text-brand-400 uppercase tracking-wider">
                    {master.profession}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{master.city}{master.district ? `, ${master.district}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-brand-400" />
                      <span>{master.completedJobs} ta bajarilgan ish</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tajriba: {master.experience}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Description / Bio */}
            <div className="rounded-3xl glass-card border border-slate-800 p-6 sm:p-7">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-400" />
                Usta haqida ma'lumot
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {master.bio}
              </p>
            </div>

            {/* Services & Prices */}
            <div className="rounded-3xl glass-card border border-slate-800 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  Xizmatlar va narxlar
                </h3>
                <span className="text-xs text-slate-400">
                  {master.services?.length || 0} ta xizmat turi
                </span>
              </div>

              <div className="divide-y divide-slate-800">
                {master.services?.map((serv) => (
                  <div key={serv.id || serv.name} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-white">{serv.name}</h4>
                      {serv.description && (
                        <p className="text-xs text-slate-400 mt-0.5">{serv.description}</p>
                      )}
                      {serv.duration && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                          <Clock className="w-3 h-3" /> {serv.duration}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 sm:self-center shrink-0">
                      <span className="text-sm font-black text-brand-400">
                        {serv.price}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openOrderModal({ ...master, serviceName: serv.name })}
                        className="text-xs"
                      >
                        Tanlash
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio / Gallery */}
            {master.portfolio && master.portfolio.length > 0 && (
              <div className="rounded-3xl glass-card border border-slate-800 p-6 sm:p-7">
                <h3 className="text-lg font-bold text-white mb-4">
                  Bajarilgan ishlar fotosuratlari ({master.portfolio.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {master.portfolio.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className="group relative rounded-2xl overflow-hidden aspect-video bg-dark-950 border border-slate-800 cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={`Ish ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="rounded-3xl glass-card border border-slate-800 p-6 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Mijozlar sharhlari ({localReviews.length})
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={master.rating} showNumber={true} size="md" />
                    <span className="text-xs text-slate-400">Umumiy reyting</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={MessageSquarePlus}
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="text-xs self-start sm:self-auto"
                >
                  Sharh qoldirish
                </Button>
              </div>

              {/* Add review form */}
              {showReviewForm && (
                <form
                  onSubmit={handleAddReview}
                  className="p-4 rounded-2xl bg-dark-900 border border-brand-500/30 mb-6 space-y-3 animate-fade-in"
                >
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Usta haqida fikringiz
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                      className="p-2.5 bg-dark-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                      className="p-2.5 bg-dark-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value={5}>5 yulduz - A'lo darajada ★★★★★</option>
                      <option value={4}>4 yulduz - Yaxshi ★★★★☆</option>
                      <option value={3}>3 yulduz - O'rtacha ★★★☆☆</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Qanday ish bajarildi va usta faoliyati sizga yoqdimi?"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    className="w-full p-2.5 bg-dark-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowReviewForm(false)}>
                      Bekor qilish
                    </Button>
                    <Button type="submit" variant="primary" size="sm">
                      Sharhni e'lon qilish
                    </Button>
                  </div>
                </form>
              )}

              {/* Reviews list */}
              <div className="space-y-4 divide-y divide-slate-800/80">
                {localReviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">{rev.author}</span>
                      <span className="text-[11px] text-slate-500">{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} showNumber={false} size="sm" className="mb-2" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Action Card */}
            <div className="sticky top-28 rounded-3xl glass-card border border-brand-500/30 p-6 shadow-premium space-y-5">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Boshlang'ich narx</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {master.startingPrice}
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Buyurtmalarni qabul qilmoqda
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-bold shadow-glow-orange-sm text-sm"
                  onClick={() => openOrderModal(master)}
                  icon={Sparkles}
                >
                  Buyurtma berish
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  className="w-full text-xs font-semibold"
                  onClick={() => openContactModal(master)}
                  icon={Phone}
                >
                  To'g'ridan-to'g'ri qo'ng'iroq
                </Button>
              </div>

              {/* Master Guarantee Perks */}
              <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Xavfsiz va kafolatlangan xizmat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Narx ish boshlanishidan oldin kelishiladi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>To'lov faqat ish bitgach amalga oshiriladi</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[11px] text-slate-400">
                  Savollar bormi? Qo'llab-quvvatlash xizmati: <br />
                  <a href="tel:+998712000000" className="text-brand-400 font-bold hover:underline">
                    +998 (71) 200-00-00
                  </a>
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-dark-800 border border-slate-700 hover:bg-dark-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Kattalashtirilgan rasm"
            className="max-w-4xl max-h-[85vh] w-auto h-auto rounded-2xl object-contain shadow-2xl border border-slate-700"
          />
        </div>
      )}
    </div>
  );
};

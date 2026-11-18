import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categoriesData';
import { User, Phone, MapPin, FileText, Calendar, Clock, Sparkles } from 'lucide-react';

export const OrderModal = () => {
  const { isOrderModalOpen, orderTargetMaster, closeOrderModal, createOrder, userProfile } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('Santexnik');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Tezkor (bugun)');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Prefill when master or user profile changes
  useEffect(() => {
    if (userProfile) {
      setCustomerName(userProfile.fullName || '');
      setPhoneNumber(userProfile.phone || '+998 ');
      setLocation(userProfile.address ? `${userProfile.city}, ${userProfile.address}` : (userProfile.city || 'Toshkent shahri'));
    }
    if (orderTargetMaster) {
      setCategory(orderTargetMaster.profession || 'Santexnik');
    }
    const today = new Date().toISOString().split('T')[0];
    setPreferredDate(today);
  }, [userProfile, orderTargetMaster, isOrderModalOpen]);

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) errs.customerName = "Ismingizni kiriting";
    if (!phoneNumber.trim() || phoneNumber.length < 9) {
      errs.phoneNumber = "To'liq telefon raqamingizni kiriting (masalan: +998 90 123 45 67)";
    }
    if (!location.trim()) errs.location = "Manzil yoki shahar/tumanni ko'rsating";
    if (!description.trim()) errs.description = "Bajarilishi kerak bo'lgan ishni qisqacha yozing";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        customerName: customerName.trim(),
        phone: phoneNumber.trim(),
        serviceCategory: category,
        masterId: orderTargetMaster ? orderTargetMaster.id : null,
        masterName: orderTargetMaster ? orderTargetMaster.fullName : 'Erkin tanlov (Birinchi bo\'sh usta)',
        location: location.trim(),
        description: description.trim(),
        urgency,
        preferredDate,
        price: orderTargetMaster ? orderTargetMaster.startingPrice : "Kelishuv asosida",
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <Modal
      isOpen={isOrderModalOpen}
      onClose={closeOrderModal}
      title={orderTargetMaster ? `${orderTargetMaster.fullName} ga buyurtma berish` : "Xizmatga buyurtma berish"}
      subtitle="Ustaga buyurtma tafsilotlarini yuboring. 15 daqiqa ichida javob olasiz."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {orderTargetMaster && (
          <div className="flex items-center gap-3 p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl">
            <img
              src={orderTargetMaster.avatar}
              alt={orderTargetMaster.fullName}
              className="w-12 h-12 rounded-xl object-cover border border-brand-500/40"
            />
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{orderTargetMaster.fullName}</h4>
              <p className="text-xs text-brand-400 font-medium">{orderTargetMaster.profession} • Boshlang'ich: {orderTargetMaster.startingPrice}</p>
            </div>
            <span className="text-[11px] bg-dark-900 text-slate-300 px-2 py-1 rounded-lg border border-slate-700">
              {orderTargetMaster.city}
            </span>
          </div>
        )}

        {/* 2-col inputs: Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Ismingiz <span className="text-brand-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName) setErrors({ ...errors, customerName: null });
                }}
                placeholder="Masalan: Bekzod"
                className={`w-full pl-9 pr-3 py-2 bg-dark-900 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.customerName ? 'border-red-500 focus:border-red-500' : 'border-slate-700/80 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.customerName && <p className="text-[11px] text-red-400 mt-1">{errors.customerName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Telefon raqamingiz <span className="text-brand-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
                }}
                placeholder="+998 90 123 45 67"
                className={`w-full pl-9 pr-3 py-2 bg-dark-900 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-slate-700/80 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.phoneNumber && <p className="text-[11px] text-red-400 mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Xizmat yo'nalishi <span className="text-brand-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-dark-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Qulay sana
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-dark-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Manzil (Shahar, tuman, ko'cha, xonadon) <span className="text-brand-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location) setErrors({ ...errors, location: null });
              }}
              placeholder="Masalan: Toshkent sh., Chilonzor 9-mavze, 24-uy"
              className={`w-full pl-9 pr-3 py-2 bg-dark-900 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                errors.location ? 'border-red-500 focus:border-red-500' : 'border-slate-700/80 focus:border-brand-500'
              }`}
            />
          </div>
          {errors.location && <p className="text-[11px] text-red-400 mt-1">{errors.location}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Ish tavsifi <span className="text-brand-500">*</span>
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              placeholder="Masalan: Kranni almashtirish kerak, suv oqyapti. Ehtiyot qismlar ustada bo'lsa yaxshi."
              className={`w-full p-3 bg-dark-900 border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                errors.description ? 'border-red-500 focus:border-red-500' : 'border-slate-700/80 focus:border-brand-500'
              }`}
            />
          </div>
          {errors.description && <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>}
        </div>

        {/* Urgency radio pills */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Muddati
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Tezkor (bugun)', '1-2 kun ichida', 'Kelishuvga ko\'ra'].map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setUrgency(opt)}
                className={`text-xs py-2 px-2 rounded-xl border text-center transition-all ${
                  urgency === opt
                    ? 'bg-brand-500/20 text-brand-300 border-brand-500 font-semibold'
                    : 'bg-dark-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button type="button" variant="ghost" size="sm" onClick={closeOrderModal}>
            Bekor qilish
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            icon={Sparkles}
          >
            Buyurtmani yuborish
          </Button>
        </div>
      </form>
    </Modal>
  );
};

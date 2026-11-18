import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Phone, Send, Copy, Check, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const ContactModal = () => {
  const { isContactModalOpen, contactMaster, closeContactModal } = useApp();
  const { showSuccess } = useToast();
  const [copied, setCopied] = useState(false);

  if (!contactMaster) return null;

  const handleCopyPhone = () => {
    if (contactMaster.phone) {
      navigator.clipboard.writeText(contactMaster.phone);
      setCopied(true);
      showSuccess("Nusxalandi", "Telefon raqami buferga nusxalandi!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal
      isOpen={isContactModalOpen}
      onClose={closeContactModal}
      title="Usta bilan to'g'ridan-to'g'ri aloqa"
      subtitle={`${contactMaster.fullName} — ${contactMaster.profession}`}
    >
      <div className="space-y-4 pt-2">
        {/* Master Avatar & Quick Status */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-900 border border-slate-800">
          <img
            src={contactMaster.avatar}
            alt={contactMaster.fullName}
            className="w-12 h-12 rounded-xl object-cover border border-slate-700"
          />
          <div>
            <h4 className="font-bold text-white text-sm">{contactMaster.fullName}</h4>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Qo'ng'iroq uchun ochiq
            </div>
          </div>
        </div>

        {/* Phone Action */}
        <div className="p-4 rounded-xl bg-dark-800 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Telefon raqam:</span>
            <span className="font-mono font-bold text-white text-base tracking-wide">
              {contactMaster.phone}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${contactMaster.phone}`}
              className="inline-flex items-center justify-center font-medium rounded-xl text-xs px-3 py-2.5 gap-2 orange-gradient-btn text-white"
            >
              <Phone className="w-4 h-4" />
              Qo'ng'iroq qilish
            </a>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyPhone}
              icon={copied ? Check : Copy}
              className="text-xs"
            >
              {copied ? "Nusxalandi" : "Nusxa olish"}
            </Button>
          </div>
        </div>

        {/* Telegram Action */}
        {contactMaster.telegram && (
          <a
            href={`https://t.me/${contactMaster.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/30 hover:bg-[#2AABEE]/20 transition-colors text-white text-xs font-semibold group"
          >
            <div className="flex items-center gap-2.5 text-[#2AABEE]">
              <Send className="w-4 h-4" />
              <span>Telegram orqali yozish</span>
            </div>
            <span className="text-slate-400 font-mono text-[11px] group-hover:text-white transition-colors">
              {contactMaster.telegram}
            </span>
          </a>
        )}

        {/* Security / Notice */}
        <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-dark-950/60 p-3 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p>
            Ishonch va sifat uchun buyurtmani rasmiy ravishda saytimiz orqali rasmiylashtirishni tavsiya etamiz.
          </p>
        </div>
      </div>
    </Modal>
  );
};

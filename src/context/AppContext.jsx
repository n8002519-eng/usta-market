import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { localStorageService } from '../services/localStorageService';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { showSuccess, showError, showInfo } = useToast();

  const [masters, setMasters] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Global Modal States
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderTargetMaster, setOrderTargetMaster] = useState(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMaster, setContactMaster] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    try {
      const storedMasters = localStorageService.getMasters();
      const storedOrders = localStorageService.getOrders();
      const storedApps = localStorageService.getApplications();
      const storedFavs = localStorageService.getFavorites();
      const storedUser = localStorageService.getUserProfile();

      setMasters(storedMasters);
      setOrders(storedOrders);
      setApplications(storedApps);
      setFavorites(storedFavs);
      setUserProfile(storedUser);
    } catch (err) {
      console.error('Initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Order modal handlers
  const openOrderModal = useCallback((master = null) => {
    setOrderTargetMaster(master);
    setIsOrderModalOpen(true);
  }, []);

  const closeOrderModal = useCallback(() => {
    setIsOrderModalOpen(false);
    setOrderTargetMaster(null);
  }, []);

  // Contact modal handlers
  const openContactModal = useCallback((master) => {
    setContactMaster(master);
    setIsContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
    setContactMaster(null);
  }, []);

  // Favorites toggle
  const toggleFavorite = useCallback((masterId) => {
    const isNowFavorite = localStorageService.toggleFavorite(masterId);
    setFavorites(localStorageService.getFavorites());

    const target = masters.find(m => m.id === masterId);
    const masterName = target ? target.fullName : 'Usta';

    if (isNowFavorite) {
      showSuccess("Saqlandi", `${masterName} sevimlilar ro'yxatiga qo'shildi!`);
    } else {
      showInfo("O'chirildi", `${masterName} sevimlilar ro'yxatidan olib tashlandi.`);
    }
  }, [masters, showSuccess, showInfo]);

  // Create Order
  const createOrder = useCallback((orderData) => {
    try {
      const created = localStorageService.addOrder(orderData);
      setOrders(localStorageService.getOrders());
      
      // Celebrate with confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6b00', '#ffffff', '#ffa726']
        });
      } catch (e) {
        // ignore if canvas-confetti issues
      }

      showSuccess(
        "Buyurtma qabul qilindi!",
        `Buyurtma #${created.id} muvaffaqiyatli rasmiylashtirildi. Tez orada usta siz bilan bog'lanadi.`
      );
      closeOrderModal();
      return created;
    } catch (err) {
      showError("Xatolik yuz berdi", "Buyurtmani yuborishda muammo bo'ldi. Qaytadan urinib ko'ring.");
      return null;
    }
  }, [showSuccess, showError, closeOrderModal]);

  // Update order status (Admin or User)
  const updateOrderStatus = useCallback((orderId, status) => {
    const updated = localStorageService.updateOrderStatus(orderId, status);
    if (updated) {
      setOrders(localStorageService.getOrders());
      showSuccess("Holat yangilandi", `Buyurtma #${orderId} holati: "${status}" ga o'zgartirildi.`);
    }
  }, [showSuccess]);

  // Delete Order
  const deleteOrder = useCallback((orderId) => {
    localStorageService.deleteOrder(orderId);
    setOrders(localStorageService.getOrders());
    showInfo("O'chirildi", `Buyurtma #${orderId} muvaffaqiyatli o'chirildi.`);
  }, [showInfo]);

  // Submit Master Application
  const submitApplication = useCallback((appData) => {
    try {
      const created = localStorageService.addApplication(appData);
      setApplications(localStorageService.getApplications());

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ff6b00', '#22c55e', '#ffffff']
        });
      } catch (e) {}

      showSuccess(
        "Arizangiz qabul qilindi!",
        "Arizangiz moderator tomonidan ko'rib chiqilgach, profilingiz faollashtiriladi."
      );
      return created;
    } catch (err) {
      showError("Xatolik", "Ariza yuborishda muammo yuz berdi.");
      return null;
    }
  }, [showSuccess, showError]);

  // Review Application (Admin)
  const reviewApplication = useCallback((appId, status) => {
    const updated = localStorageService.updateApplicationStatus(appId, status);
    if (updated) {
      setApplications(localStorageService.getApplications());
      // Refresh masters list as approving an application automatically adds the master to the live listing!
      setMasters(localStorageService.getMasters());

      if (status === 'tasdiqlandi') {
        showSuccess("Ariza tasdiqlandi", "Usta tizimga muvaffaqiyatli qo'shildi va portalda ko'rinadi!");
      } else {
        showInfo("Ariza rad etildi", "Ariza muvaffaqiyatli rad etildi.");
      }
    }
  }, [showSuccess, showInfo]);

  // Update User Profile
  const updateUserProfile = useCallback((profileData) => {
    const updated = localStorageService.updateUserProfile(profileData);
    setUserProfile(updated);
    showSuccess("Profil yangilandi", "Ma'lumotlaringiz muvaffaqiyatli saqlandi.");
  }, [showSuccess]);

  const value = {
    masters,
    orders,
    applications,
    favorites,
    userProfile,
    isLoading,
    toggleFavorite,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    submitApplication,
    reviewApplication,
    updateUserProfile,
    // Modals
    isOrderModalOpen,
    orderTargetMaster,
    openOrderModal,
    closeOrderModal,
    isContactModalOpen,
    contactMaster,
    openContactModal,
    closeContactModal
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

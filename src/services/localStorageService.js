import { INITIAL_MASTERS } from '../data/initialMasters';
import { INITIAL_ORDERS, INITIAL_APPLICATIONS } from '../data/initialOrders';

const KEYS = {
  MASTERS: 'USTA_MARKET_MASTERS_V1',
  ORDERS: 'USTA_MARKET_ORDERS_V1',
  APPLICATIONS: 'USTA_MARKET_APPLICATIONS_V1',
  FAVORITES: 'USTA_MARKET_FAVORITES_V1',
  USER: 'USTA_MARKET_USER_V1',
};

// Safe JSON parse helper
const getFromStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Seed initial data if empty
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(KEYS.MASTERS)) {
    setToStorage(KEYS.MASTERS, INITIAL_MASTERS);
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    setToStorage(KEYS.ORDERS, INITIAL_ORDERS);
  }
  if (!localStorage.getItem(KEYS.APPLICATIONS)) {
    setToStorage(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }
  if (!localStorage.getItem(KEYS.FAVORITES)) {
    setToStorage(KEYS.FAVORITES, ['usta-1', 'usta-2']);
  }
  if (!localStorage.getItem(KEYS.USER)) {
    setToStorage(KEYS.USER, {
      fullName: 'Bekzod To\'rayev',
      phone: '+998 90 123 45 67',
      email: 'bekzod@example.uz',
      city: 'Toshkent shahri',
      address: 'Yunusobod tumani, 12-mavze',
      notificationsEnabled: true
    });
  }
};

export const localStorageService = {
  // MASTERS
  getMasters: () => {
    initializeLocalStorage();
    return getFromStorage(KEYS.MASTERS, INITIAL_MASTERS);
  },

  getMasterById: (id) => {
    const masters = localStorageService.getMasters();
    return masters.find(m => m.id === id) || null;
  },

  addMaster: (newMaster) => {
    const masters = localStorageService.getMasters();
    const updated = [newMaster, ...masters];
    setToStorage(KEYS.MASTERS, updated);
    return newMaster;
  },

  updateMaster: (id, partialData) => {
    const masters = localStorageService.getMasters();
    const updated = masters.map(m => m.id === id ? { ...m, ...partialData } : m);
    setToStorage(KEYS.MASTERS, updated);
    return updated.find(m => m.id === id);
  },

  deleteMaster: (id) => {
    const masters = localStorageService.getMasters();
    const updated = masters.filter(m => m.id !== id);
    setToStorage(KEYS.MASTERS, updated);
    return true;
  },

  // ORDERS
  getOrders: () => {
    initializeLocalStorage();
    return getFromStorage(KEYS.ORDERS, INITIAL_ORDERS);
  },

  addOrder: (orderData) => {
    const orders = localStorageService.getOrders();
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Kutilmoqda',
      ...orderData
    };
    const updated = [newOrder, ...orders];
    setToStorage(KEYS.ORDERS, updated);
    return newOrder;
  },

  updateOrderStatus: (orderId, newStatus) => {
    const orders = localStorageService.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setToStorage(KEYS.ORDERS, updated);
    return updated.find(o => o.id === orderId);
  },

  deleteOrder: (orderId) => {
    const orders = localStorageService.getOrders();
    const updated = orders.filter(o => o.id !== orderId);
    setToStorage(KEYS.ORDERS, updated);
    return true;
  },

  // FAVORITES
  getFavorites: () => {
    initializeLocalStorage();
    return getFromStorage(KEYS.FAVORITES, []);
  },

  toggleFavorite: (masterId) => {
    const favorites = localStorageService.getFavorites();
    let updated;
    const isFav = favorites.includes(masterId);
    if (isFav) {
      updated = favorites.filter(id => id !== masterId);
    } else {
      updated = [...favorites, masterId];
    }
    setToStorage(KEYS.FAVORITES, updated);
    return !isFav;
  },

  isFavorite: (masterId) => {
    const favorites = localStorageService.getFavorites();
    return favorites.includes(masterId);
  },

  // APPLICATIONS
  getApplications: () => {
    initializeLocalStorage();
    return getFromStorage(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  },

  addApplication: (appData) => {
    const apps = localStorageService.getApplications();
    const newApp = {
      id: `APP-${Math.floor(100 + Math.random() * 900)}`,
      submittedAt: new Date().toISOString(),
      status: 'kutilmoqda',
      ...appData
    };
    const updated = [newApp, ...apps];
    setToStorage(KEYS.APPLICATIONS, updated);
    return newApp;
  },

  updateApplicationStatus: (appId, status) => {
    const apps = localStorageService.getApplications();
    const target = apps.find(a => a.id === appId);
    if (!target) return null;

    const updated = apps.map(a => a.id === appId ? { ...a, status } : a);
    setToStorage(KEYS.APPLICATIONS, updated);

    // If approved, automatically add this master to the live MASTERS list!
    if (status === 'tasdiqlandi') {
      const startingPriceNum = parseInt(String(target.startingPrice).replace(/\D/g, ''), 10) || 100000;
      const newMaster = {
        id: `usta-app-${target.id}`,
        fullName: target.fullName,
        profession: target.profession,
        categorySlug: target.categorySlug || 'santexnik',
        city: target.city || 'Toshkent shahri',
        district: 'Markaziy hudud',
        rating: 5.0,
        reviewCount: 0,
        completedJobs: 0,
        startingPrice: target.startingPrice || `${startingPriceNum.toLocaleString()} so'm`,
        startingPriceNum: startingPriceNum,
        experience: target.experience || '3 yil',
        avatar: target.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80',
        coverImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
        verified: true,
        badge: 'Yangi Usta',
        phone: target.phone,
        telegram: '@usta_market_bot',
        isAvailable: true,
        bio: target.description || 'USTA MARKET orqali tasdiqlangan professional usta.',
        services: [
          {
            id: `s-app-${Date.now()}`,
            name: 'Asosiy xizmat',
            price: target.startingPrice || `${startingPriceNum.toLocaleString()} so'm`,
            duration: '1-2 soat',
            description: target.description
          }
        ],
        portfolio: [
          'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
        ],
        reviews: []
      };
      localStorageService.addMaster(newMaster);
    }

    return updated.find(a => a.id === appId);
  },

  // USER PROFILE
  getUserProfile: () => {
    initializeLocalStorage();
    return getFromStorage(KEYS.USER, {
      fullName: 'Bekzod To\'rayev',
      phone: '+998 90 123 45 67',
      email: 'bekzod@example.uz',
      city: 'Toshkent shahri',
      address: 'Yunusobod tumani, 12-mavze',
    });
  },

  updateUserProfile: (profileData) => {
    const current = localStorageService.getUserProfile();
    const updated = { ...current, ...profileData };
    setToStorage(KEYS.USER, updated);
    return updated;
  }
};

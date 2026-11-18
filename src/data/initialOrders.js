export const INITIAL_ORDERS = [
  {
    id: "ORD-9281",
    customerName: "Bekzod To'rayev",
    phone: "+998 90 123 45 67",
    serviceCategory: "Santexnik",
    masterId: "usta-1",
    masterName: "Jamshid Rahimov",
    location: "Toshkent shahri, Yunusobod 12-mavze, 45-uy",
    description: "Hammomda ariston oqib ketmoqda, zudlik bilan ko'rib berish kerak.",
    urgency: "Zudlik bilan (bugun)",
    preferredDate: "2024-11-18",
    status: "Qabul qilindi", // 'Kutilmoqda', 'Qabul qilindi', 'Bajarildi', 'Bekor qilindi'
    price: "200,000 so'm",
    createdAt: "2024-11-18T08:30:00Z"
  },
  {
    id: "ORD-9280",
    customerName: "Gulnoza Azimova",
    phone: "+998 93 987 65 43",
    serviceCategory: "Elektrik",
    masterId: "usta-2",
    masterName: "Alisher Qodirov",
    location: "Toshkent shahri, Chilonzor 7-kvartal, 19-uy",
    description: "Zaldagi katta qandil (lyustra)ni shiftga ilib, pultini ulab berish zarur.",
    urgency: "2-3 kun ichida",
    preferredDate: "2024-11-20",
    status: "Bajarildi",
    price: "120,000 so'm",
    createdAt: "2024-11-16T14:15:00Z"
  },
  {
    id: "ORD-9279",
    customerName: "Oybek Saidov",
    phone: "+998 99 555 12 34",
    serviceCategory: "Konditsioner ustasi",
    masterId: "usta-3",
    masterName: "Dilshodbek Karimov",
    location: "Samarqand shahri, Gagarin ko'chasi 88-uy",
    description: "Konditsioner filtrlarini par bilan tozalash va freon bosimini tekshirish.",
    urgency: "Oddiy",
    preferredDate: "2024-11-21",
    status: "Kutilmoqda",
    price: "150,000 so'm",
    createdAt: "2024-11-18T10:05:00Z"
  },
  {
    id: "ORD-9278",
    customerName: "Sirojiddin Alimov",
    phone: "+998 97 444 88 11",
    serviceCategory: "Mebel ustasi",
    masterId: "usta-4",
    masterName: "Sherzod Jo'rayev",
    location: "Toshkent shahri, Mirzo Ulug'bek, Buyuk Ipak Yo'li",
    description: "Yangi sotib olingan 3 eshikli shkaf-kupeni yig'ib berish kerak.",
    urgency: "Shu hafta",
    preferredDate: "2024-11-19",
    status: "Qabul qilindi",
    price: "250,000 so'm",
    createdAt: "2024-11-17T11:40:00Z"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-101",
    fullName: "Davronbek Salimov",
    phone: "+998 90 987 11 22",
    profession: "Konditsioner ustasi",
    categorySlug: "konditsioner-ustasi",
    city: "Buxoro",
    experience: "6 yil",
    startingPrice: "100,000 so'm",
    description: "Konditsionerlarni montaj qilish, freon quyish va qishki profilaktika bo'yicha uzoq yillik amaliyotga egaman.",
    status: "kutilmoqda", // 'kutilmoqda', 'tasdiqlandi', 'rad_etildi'
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    submittedAt: "2024-11-17T16:20:00Z"
  },
  {
    id: "APP-102",
    fullName: "Anvarjon Qosimov",
    phone: "+998 94 332 55 66",
    profession: "Bo'yoqchi",
    categorySlug: "boyoqchi",
    city: "Toshkent shahri",
    experience: "10 yil",
    startingPrice: "70,000 so'm",
    description: "Sifatli fasad va interyer bo'yoqlari, dekorativ gips va shpatlyovka ishlari.",
    status: "kutilmoqda",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    submittedAt: "2024-11-18T09:10:00Z"
  }
];

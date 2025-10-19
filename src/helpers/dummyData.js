import Resources from "../config/Resources";

export const bannerData = [
  {
    title: "Consult Doctor",
    description:
      "Consult India's top dermatologists digitally, with a combined clinical experience of treating over 50,000 patients.",
    image: Resources.images.home.banner.bannerConsult,
    subText: "AT JUST Rs.249",
    onClickSection: () => console.log("Consult"),
  },
  {
    title: "Hair Loss",
    description:
      "Fix hair thinning or hair loss with personalised plans that work for you. Enjoy thicker & fuller hair like never before.",
    image: Resources.images.home.banner.bannerHair,
    onClickSection: () => console.log("Consult"),
  },
  {
    title: "Skincare",
    description:
      "For skin that is healthy, glowing, and free from any issues, take your pick from the carefully-curated skin care products.",
    image: Resources.images.home.banner.bannerSkin,
    onClickSection: () => console.log("Consult"),
  },
  {
    title: "Arthwa Supplements",
    description:
      "Boost immunity levels and uplift your body's internal health to unlock the secrets of healthy skin and nourished hair.",
    image: Resources.images.home.banner.bannerSupplements,
    onClickSection: () => console.log("Consult"),
  },
  {
    title: "Pediatric Derm Care",
    description:
      "Protect, soothe, and nourish the sensitive skin of your baby with doctor-recommended pediatric care products.",
    image: Resources.images.home.banner.bannerChild,
    onClickSection: () => console.log("Consult"),
  },
];

export const skincareData = [
  // Pigmentation Products
  {
    id: "prod_1",
    category: "Pigmentation",
    name: "Clinically The Ultimate NIA (10% Niacinamide) Serum",
    image: Resources.images.home.skin.pigmentation,
    rating: 4.55,
    price: 1079,
    oldPrice: 1199,
    badge: "SAVE 10%",
    isDoctorsChoice: true,
  },
  {
    id: "prod_2",
    category: "Pigmentation",
    name: "Melanil Anti-Spot Cream",
    image: Resources.images.home.skin.pigmentation,
    rating: 4.65,
    price: 2390,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: false,
  },
  {
    id: "prod_3",
    category: "Pigmentation",
    name: "Sesderma Acglicolic Liposomal Serum",
    image: Resources.images.home.skin.pigmentation,
    rating: 4.58,
    price: 2800,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: false,
  },

  // Acne & Acne Scars Products
  {
    id: "prod_4",
    category: "Acne & Acne Scars",
    name: "Cerave Acne Foaming Cream Cleanser",
    image: Resources.images.home.skin.acneScar,
    rating: 4.7,
    price: 1450,
    oldPrice: 1550,
    badge: "SAVE 6%",
    isDoctorsChoice: true,
  },
  {
    id: "prod_5",
    category: "Acne & Acne Scars",
    name: "Cosrx BHA Blackhead Power Liquid",
    image: Resources.images.home.skin.acneScar,
    rating: 4.8,
    price: 1800,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: false,
  },

  // Eczema Products
  {
    id: "prod_6",
    category: "Eczema",
    name: "Eucerin Eczema Relief Cream",
    image: Resources.images.home.skin.eczema,
    rating: 4.5,
    price: 2100,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: true,
  },

  // Ageing Products
  {
    id: "prod_7",
    category: "Ageing",
    name: "The Ordinary Granactive Retinoid 2%",
    image: Resources.images.home.skin.ageing,
    rating: 4.6,
    price: 1550,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: false,
  },

  // Damaged & Sensitive Skin Products
  {
    id: "prod_8",
    category: "Damaged & Sensitive Skin",
    name: "Bioderma Sensibio AR Anti-Redness Cream",
    image: Resources.images.home.skin.sensitiveSkin,
    rating: 4.8,
    price: 1200,
    oldPrice: 1300,
    badge: "SAVE 7%",
    isDoctorsChoice: false,
  },

  // Under Eye Concerns Products
  {
    id: "prod_9",
    category: "Under Eye Concerns",
    name: "Vichy Mineral 89 Eye Gel",
    image: Resources.images.home.skin.darkCircle,
    rating: 4.7,
    price: 1950,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: true,
  },
];

export const faqCategories = [
  "About Us",
  "Products & Pricing",
  "Shipping & Returns",
  "Consultations",
  "Payment & Billing",
];

export const faqData = {
  "About Us": [
    {
      question: "What is Arthwa?",
      answer:
        "Arthwa is a digital platform for solving all your skin and hair-related concerns. We use the expertise of real experts to give personalized treatment plans that actually work for you. You can also browse through all of these dermatologist-recommended skin & hair products on our online store.",
    },
    {
      question: "How can I get my skin/hair concerns resolved?",
      answer:
        "You can start by taking our free online assessment to get a personalized treatment plan or book an online consultation with our dermatologists.",
    },
    {
      question: "What is a personalised treatment plan?",
      answer:
        "A personalized treatment plan is a tailored regimen of products and/or services recommended by our experts based on your specific skin/hair concerns and history. It may include products available on our store or recommendations for lifestyle changes.",
    },
    {
      question: "What is an online dermatologist consultation?",
      answer:
        "An online dermatologist consultation allows you to connect with a certified dermatologist from the comfort of your home. You can discuss your concerns, get a diagnosis, and receive professional advice and prescriptions if necessary.",
    },
    {
      question:
        "How do I choose between a personalised treatment plan and an online consultation?",
      answer:
        "If you have mild concerns and want product recommendations, a personalized treatment plan might be sufficient. For more complex issues, a diagnosis, or prescription medication, an online consultation is recommended.",
    },
  ],
  "Products & Pricing": [
    {
      question: "Are the products recommended by dermatologists?",
      answer:
        "Yes, all products available on Arthwa are carefully selected and recommended by our panel of dermatologists.",
    },
    {
      question: "What is the price range of products?",
      answer:
        "Our products range from affordable daily essentials to premium specialized treatments. Prices vary depending on the product type and brand.",
    },
    {
      question: "Do you offer discounts or promotions?",
      answer:
        "We frequently offer promotions and discounts. Please check our website or subscribe to our newsletter for the latest updates.",
    },
  ],
  "Shipping & Returns": [
    {
      question: "What are your shipping policies?",
      answer:
        "We offer standard and expedited shipping options. Delivery times and charges vary based on your location. Detailed information is available on our Shipping Policy page.",
    },
    {
      question: "How do I return a product?",
      answer:
        "If you are not satisfied with your purchase, you can return it within 14 days of receipt. Please refer to our Returns Policy for detailed instructions and conditions.",
    },
  ],
  Consultations: [
    {
      question: "How do I book an online consultation?",
      answer:
        "You can book an online consultation directly through our website by selecting an available time slot with one of our dermatologists.",
    },
    {
      question: "What happens during a consultation?",
      answer:
        "During the consultation, you will have a video call with a dermatologist to discuss your concerns, get a diagnosis, and receive a treatment plan.",
    },
  ],
  "Payment & Billing": [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and popular digital payment methods.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, all transactions are processed through secure payment gateways with encryption to protect your personal and financial information.",
    },
  ],
};

export const newsLogos = [
  {
    id: 1,
    src: "https://www.etimg.com/photo/img/et-tech-logo.cms",
    alt: "ET Tech",
  },
  {
    id: 2,
    src: "https://static.timesnownews.com/images/TimesNowLogo.svg",
    alt: "Times Now",
  },
  {
    id: 3,
    src: "https://www.elle.in/wp-content/themes/elle/assets/images/logo.svg",
    alt: "ELLE",
  },
  {
    id: 4,
    src: "https://www.hindustantimes.com/res/images/ht-logo.svg",
    alt: "Hindustan Times",
  },
  {
    id: 5,
    src: "https://inc42.com/wp-content/themes/inc42/images/logo.svg",
    alt: "Inc42",
  },
];

export const skinProductData = [
  {
    id: 1,
    name: "Minimalist 2% Salicylic Acid Face Serum",
    image: "https://www.clinikally.com/cdn/shop/products/Minimalist-2-Salicylic-Acid-Face-Serum.jpg?v=1675231201",
    rating: 4.61,
    price: 599,
    oldPrice: 650,
    badge: "SAVE 8%",
    isDoctorsChoice: true,
    concern: "Acne",
  },
  {
    id: 2,
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    image: "https://www.clinikally.com/cdn/shop/products/The-Ordinary-Niacinamide-10-Zinc-1.jpg?v=1675759322",
    rating: 4.88,
    price: 950,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: true,
    concern: "Pigmentation",
  },
  {
    id: 3,
    name: "Cosrx Advanced Snail 96 Mucin Power Essence",
    image: "https://www.clinikally.com/cdn/shop/products/Cosrx-Advanced-Snail-96-Mucin-Power-Essence.jpg?v=1675862410",
    rating: 4.75,
    price: 1550,
    oldPrice: 1700,
    badge: "SAVE 9%",
    isDoctorsChoice: false,
    concern: "Hydration",
  },
];

export const hairProductData = [
  // Dandruff & Scalp Care
  {
    id: "hair_1",
    category: "Dandruff & Scalp Care",
    name: "Ketoconazole Anti-Dandruff Shampoo",
    image: Resources.images.home.hair.dandruff,
    rating: 4.5,
    price: 350,
    oldPrice: 400,
    badge: "SAVE 12%",
    isDoctorsChoice: true,
  },
  {
    id: "hair_2",
    category: "Dandruff & Scalp Care",
    name: "Sebamed Everyday Shampoo",
    image: Resources.images.home.hair.hairfall,
    rating: 4.7,
    price: 650,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: false,
  },
  // Hair Fall Control
  {
    id: "hair_3",
    category: "Hair Fall Control",
    name: "Minoxidil Solution 5%",
    image: Resources.images.home.hair.messyHair,
    rating: 4.8,
    price: 900,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: true,
  },
  {
    id: "hair_4",
    category: "Hair Fall Control",
    name: "Biotin Hair Growth Supplements",
    image: Resources.images.home.hair.itchyScalp,
    rating: 4.6,
    price: 550,
    oldPrice: 600,
    badge: "SAVE 8%",
    isDoctorsChoice: false,
  },
  // Split Ends & Dry Hair
  {
    id: "hair_5",
    category: "Split Ends & Dry Hair",
    name: "Argan Oil Hair Serum",
    image: Resources.images.home.hair.messyHair,
    rating: 4.4,
    price: 750,
    oldPrice: null,
    badge: null,
    isDoctorsChoice: false,
  },
];

import "@/App.css";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Star, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Diamond,
  Menu as MenuIcon,
  X
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";

// Menu data
const menuData = {
  lahmacun: [
    { name: "Soğanlı Lahmacun", price: "120₺" },
    { name: "Sarımsaklı Antep Lahmacun", price: "120₺" },
  ],
  pide: [
    { name: "Kaşarlı Pide", price: "250₺" },
    { name: "Sucuklu Pide", price: "320₺" },
    { name: "Kuşbaşılı Kaşarlı Pide", price: "350₺" },
    { name: "Kıymalı Pide", price: "300₺" },
    { name: "Kavurmalı Pide", price: "320₺" },
    { name: "Kavurma Kaşarlı Pide", price: "350₺" },
    { name: "Kaşar Sucuklu Pide", price: "300₺" },
    { name: "Karışık Pide", price: "350₺" },
    { name: "Vejeteryan Pide", price: "300₺" },
  ],
  salata: [
    { name: "Çoban Salata", price: "50₺" },
    { name: "Mevsim Salata", price: "50₺" },
  ],
  corba: [
    { name: "Ezogelin", price: "90₺" },
    { name: "Beyran", price: "300₺" },
  ],
  diger: [
    { name: "İçli Köfte", price: "80₺" },
    { name: "Patates Kızartması", price: "50₺" },
    { name: "Kilis Tava", price: "450₺" },
    { name: "Patlıcan Kebap (çift kişilik)", price: "600₺" },
    { name: "Soğan Kebap (çift kişilik)", price: "600₺" },
  ],
  tatlilar: [
    { name: "Baklava", price: "250₺" },
    { name: "Katmer", price: "400₺" },
    { name: "Künefe", price: "150₺" },
    { name: "Havuç Dilimi", price: "250₺" },
    { name: "Sütlaç", price: "80₺" },
  ],
  icecekler: [
    { name: "Kutu İçecekler (Kola, Fanta, Soda, Üzümlü Ayran)", price: "50₺" },
    { name: "Su", price: "20₺" },
  ],
};

// Reviews data
const reviews = [
  {
    name: "Mehmet A.",
    text: "Lahmacun gerçekten nefis, hamuru ince ve gevrek, üstü tam kıvamında. Üsküdar'ın en iyi lahmacunu burada!",
  },
  {
    name: "Ayşe K.",
    text: "Gece geç saatte bile sıcak servis, lezzet bozulmamış. Beyran çorbası harika!",
  },
  {
    name: "Emre T.",
    text: "Künefe ve katmer muhteşemdi. Kesinlikle tavsiye ederim!",
  },
  {
    name: "Fatma S.",
    text: "Fiyat-performans açısından İstanbul'un en iyi mekanlarından biri.",
  },
  {
    name: "Ali R.",
    text: "Pide çeşitleri çok geniş, hepsini denemek istedik. Tekrar geleceğiz!",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Animated Section
const AnimatedSection = ({ children, className = "", id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.section>
  );
};

// Diamond Divider Component
const DiamondDivider = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
    <Diamond className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
  </div>
);

// Floating Action Buttons
const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          data-testid="floating-buttons"
        >
          <motion.a
            href="https://wa.me/905323016334"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn floating-btn-wa"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="whatsapp-floating-btn"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="hidden md:inline text-sm font-medium">WhatsApp</span>
          </motion.a>
          <motion.a
            href="tel:05323016334"
            className="floating-btn floating-btn-call"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid="call-floating-btn"
          >
            <Phone className="w-5 h-5 text-[#C9A84C]" />
            <span className="hidden md:inline text-sm font-medium">Ara</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Header/Navigation
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Menü", href: "#menu" },
    { label: "Hakkımızda", href: "#about" },
    { label: "Yorumlar", href: "#reviews" },
    { label: "İletişim", href: "#contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 header-nav ${
        isScrolled ? "header-scrolled" : "header-hero"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2 md:gap-3 pl-2" data-testid="logo">
            <img src="/logo.png" alt="Gaziantep Kuzu Lahmacun" className="h-8 md:h-10 w-auto object-contain" />
            <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-semibold text-[#C9A84C]">Gaziantep Kuzu Lahmacun</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors font-['Montserrat'] text-sm tracking-wide"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:05323016334"
              className="px-5 py-2 rounded-full border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1E] transition-all text-sm font-['Montserrat']"
              data-testid="nav-cta-btn"
            >
              Rezervasyon
            </a>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[#C9A84C]" data-testid="mobile-menu-btn">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1C1C1E] border-[#C9A84C]/20">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#F5F0E8] text-lg hover:text-[#C9A84C] transition-colors font-['Cormorant_Garamond']"
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="tel:05323016334"
                  className="mt-4 px-6 py-3 rounded-full border border-[#C9A84C] text-[#C9A84C] text-center hover:bg-[#C9A84C] hover:text-[#1C1C1E] transition-all"
                  data-testid="mobile-cta-btn"
                >
                  Rezervasyon Yap
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

// Hero Section
const HeroSection = () => (
  <section
    id="hero"
    className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    data-testid="hero-section"
  >
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1920&q=85')`,
      }}
    />
    <div
      className="absolute inset-0 hero-overlay"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.70) 40%, rgba(0,0,0,0.85) 100%)",
      }}
    />

    {/* Content */}
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.p
        className="font-['Montserrat'] text-[#C9A84C] text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Üsküdar · İstanbul
      </motion.p>

      <motion.h1
        className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 hero-title-gold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Gaziantep Kuzu Lahmacun
      </motion.h1>

      <motion.div
        className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      />

      <motion.p
        className="font-['Montserrat'] text-[#F5F0E8]/90 text-sm md:text-base tracking-[0.15em] uppercase mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        Gerçek Gaziantep Lezzetleri
      </motion.p>

      <motion.p
        className="text-[#B87333] text-sm mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        Gece 02:00'ye kadar açık • 4.7 ⭐ • 92 Google Yorumu
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <a
          href="#menu"
          className="px-8 py-3 rounded-full border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1C1C1E] transition-all font-['Montserrat'] text-sm tracking-wide"
          data-testid="hero-menu-btn"
        >
          Menüyü İncele
        </a>
        <a
          href="https://wa.me/905323016334"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full bg-[#242426] border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-[#1C1C1E] transition-all font-['Montserrat'] text-sm tracking-wide flex items-center justify-center gap-2"
          data-testid="hero-whatsapp-btn"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          WhatsApp Sipariş
        </a>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.a
      href="#menu"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#C9A84C] bounce-slow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      data-testid="scroll-indicator"
    >
      <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C] to-transparent" />
      <ChevronDown className="w-5 h-5" />
    </motion.a>
  </section>
);

// Menu Section
const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tümü" },
    { id: "lahmacun", label: "Lahmacun" },
    { id: "pide", label: "Pide" },
    { id: "salata", label: "Salatalar" },
    { id: "corba", label: "Çorbalar" },
    { id: "diger", label: "Diğer" },
    { id: "tatlilar", label: "Tatlılar" },
    { id: "icecekler", label: "İçecekler" },
  ];

  const categoryHeaders = {
    lahmacun: "— LAHMACUNLAR —",
    pide: "— PİDE ÇEŞİTLERİ —",
    salata: "— SALATALAR —",
    corba: "— ÇORBALAR —",
    diger: "— DİĞER LEZZETLER —",
    tatlilar: "— TATLILAR —",
    icecekler: "— İÇECEKLER —",
  };

  const getGroups = () => {
    if (activeCategory === "all") {
      return Object.entries(menuData).map(([key, items]) => ({ key, header: categoryHeaders[key] || key, items }));
    }
    const items = menuData[activeCategory] || [];
    return [{ key: activeCategory, header: categoryHeaders[activeCategory] || activeCategory, items }];
  };

  return (
    <AnimatedSection id="menu" className="py-16 md:py-24 bg-[#1C1C1E] noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['Cormorant_Garamond'] section-title text-3xl md:text-5xl font-semibold text-[#C9A84C] mb-4" data-testid="menu-title">
            Menümüz
          </h2>
          <DiamondDivider />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" data-testid="menu-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`menu-pill ${activeCategory === cat.id ? "menu-pill-active" : "menu-pill-inactive"}`}
              data-testid={`menu-filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu by groups */}
        <motion.div
          className="space-y-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {getGroups().map(({ key, header, items }) => (
            <div key={key}>
              <div className="menu-category-header">{header}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((item, index) => (
                  <motion.div
                    key={`${key}-${index}`}
                    variants={fadeInUp}
                    className="menu-item-card"
                    data-testid={`menu-item-${index}`}
                  >
                    <span className="menu-item-name">{item.name}</span>
                    <span className="menu-item-dots" />
                    <span className="menu-item-price">{item.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <a
          href="https://wa.me/905323016334"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-cta-whatsapp"
          data-testid="menu-whatsapp-cta"
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span>Tümünü Görüntüle / Sipariş İçin WhatsApp</span>
        </a>
      </div>
    </AnimatedSection>
  );
};

// About Section
const AboutSection = () => {
  const stats = [
    { number: "10+", label: "Yıl Deneyim" },
    { number: "92", label: "Mutlu Yorum" },
    { number: "02:00", label: "Gece Açık" },
  ];

  return (
    <AnimatedSection id="about" className="py-16 md:py-24 bg-[#212121] noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Owner: decorative frame + silhouette + badge */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="about-owner-frame">
                <div className="about-owner-inner">
                  <svg className="about-owner-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="22" r="10" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" fill="none"/>
                    <path d="M16 58c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M32 38v-4M28 34h8M32 28l-2 4M32 28l2 4" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="about-owner-badge">✦ Kurucu</div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-['Cormorant_Garamond'] text-7xl md:text-8xl text-[#C9A84C] leading-none block mb-4">"</span>
            <blockquote className="font-['Cormorant_Garamond'] italic text-[1.2rem] text-[#F5F0E8]/90 leading-[1.75] mb-8" data-testid="about-quote">
              Yılların verdiği tecrübe ve Gaziantep'in eşsiz lezzet mirası ile kurduğumuz bu mutfak, 
              her tabağa yüreğimizi katıyoruz. Kuzu etiyle hazırlanan geleneksel lahmacunumuz, 
              taş fırınımızın sıcaklığında pişen pidelerimiz ve ustalarımızın elinden çıkan tatlılarımız 
              — hepsi sizin için. Üsküdar'a gönlümüzü taşıdık.
            </blockquote>

            {/* Stats: dark cards with gold top border */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="about-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <span className="about-stat-number">{stat.number}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Reviews Section — 3 cards desktop, 1 mobile, arrow nav
const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const fn = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  const maxIndex = isDesktop ? reviews.length - 1 : reviews.length - 1;
  const goPrev = () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const goNext = () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const visibleReviews = isDesktop
    ? [reviews[currentIndex % reviews.length], reviews[(currentIndex + 1) % reviews.length], reviews[(currentIndex + 2) % reviews.length]]
    : [reviews[currentIndex]];

  return (
    <AnimatedSection id="reviews" className="py-16 md:py-24 bg-[#1C1C1E] noise-overlay overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['Cormorant_Garamond'] section-title text-3xl md:text-5xl font-semibold text-[#C9A84C] mb-4" data-testid="reviews-title">
            Misafirlerimiz Ne Diyor?
          </h2>
          <DiamondDivider />
        </div>

        <div className="relative flex items-center gap-4" data-testid="reviews-carousel">
          <button
            type="button"
            onClick={goPrev}
            className="reviews-arrow"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5 text-[#C9A84C]" />
          </button>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
            {visibleReviews.map((review, index) => (
              <div key={`${currentIndex}-${index}`} className="review-card" data-testid={`review-card-${index}`}>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-footer">
                  <span className="review-name">{review.name}</span>
                  <span className="review-google">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="reviews-arrow"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5 text-[#C9A84C]" />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Contact Section
const ContactSection = () => (
  <AnimatedSection id="contact" className="py-16 md:py-24 bg-[#212121] noise-overlay">
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="font-['Cormorant_Garamond'] section-title text-3xl md:text-5xl font-semibold text-[#C9A84C] mb-4" data-testid="contact-title">
          İletişim & Konum
        </h2>
        <DiamondDivider />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="contact-info">
          <div className="contact-item" data-testid="contact-address">
            <Diamond className="contact-icon fill-[#B87333] text-[#B87333]" />
            <p className="text-[#F5F0E8]/90 font-['Inter']">
              Ayazma Cad. Anıl Sk. No:15, Ünalan, Üsküdar / İstanbul
            </p>
          </div>
          <div className="contact-item" data-testid="contact-phone">
            <Diamond className="contact-icon fill-[#B87333] text-[#B87333]" />
            <div className="text-[#F5F0E8]/90 font-['Inter']">
              <p>0532 301 63 34</p>
              <p>0542 498 56 33</p>
            </div>
          </div>
          <div className="contact-item" data-testid="contact-instagram">
            <Diamond className="contact-icon fill-[#B87333] text-[#B87333]" />
            <a href="https://www.instagram.com/gaziantepkuzulahmacun" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/90 hover:text-[#C9A84C] transition-colors font-['Inter']">
              @gaziantepkuzulahmacun
            </a>
          </div>
          <div className="contact-item" data-testid="contact-hours">
            <Diamond className="contact-icon fill-[#B87333] text-[#B87333]" />
            <p className="text-[#F5F0E8]/90 font-['Inter']">Her gün açık — Gece 02:00'ye kadar</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            <a href="tel:05323016334" className="contact-btn" data-testid="contact-call-btn">
              <Phone className="w-4 h-4" />
              Hemen Ara
            </a>
            <a href="https://wa.me/905323016334" target="_blank" rel="noopener noreferrer" className="contact-btn" data-testid="contact-whatsapp-btn">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a href="https://www.instagram.com/gaziantepkuzulahmacun" target="_blank" rel="noopener noreferrer" className="contact-btn" data-testid="contact-instagram-btn">
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
        <div className="contact-map-wrap" data-testid="google-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.1201426778493!2d29.0677371!3d41.0007435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7005dc2ad93%3A0xc78dc9ea1639586e!2sGaziantep%20Kuzu%20Lahmacun!5e0!3m2!1str!2str!4v1771416502746!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.05) brightness(0.9)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gaziantep Kuzu Lahmacun Konum"
          />
        </div>
      </div>
    </div>
  </AnimatedSection>
);

// Footer
const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
      <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-[#C9A84C] mb-4">
        Gaziantep Kuzu Lahmacun
      </h3>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />
      <div className="footer-social">
        <a href="https://www.instagram.com/gaziantepkuzulahmacun" target="_blank" rel="noopener noreferrer" className="footer-social-link" data-testid="footer-instagram">
          <Instagram className="w-4 h-4" />
        </a>
        <a href="https://wa.me/905323016334" target="_blank" rel="noopener noreferrer" className="footer-social-link" data-testid="footer-whatsapp">
          <MessageCircle className="w-4 h-4" />
        </a>
        <a href="tel:05323016334" className="footer-social-link" data-testid="footer-phone">
          <Phone className="w-4 h-4" />
        </a>
      </div>
      <p className="text-[#8A7F72] text-sm mb-4">© 2025 Tüm hakları saklıdır.</p>
      <p className="footer-seo">
        Üsküdar lahmacun | Gaziantep pide İstanbul | Gece açık restoran Üsküdar | En iyi lahmacun İstanbul | Taş fırın pide
      </p>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App bg-[#1C1C1E] min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
        <AboutSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;

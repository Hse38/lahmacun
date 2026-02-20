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
  UtensilsCrossed,
  Flame,
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#732127]" />
    <Diamond className="w-3 h-3 text-[#732127] fill-[#732127]" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#732127]" />
  </div>
);

// Floating Action Buttons — Location (bottom-left), WhatsApp (bottom-right), icons only
const FAB_MAPS_URL = "https://maps.google.com/?q=Ayazma+Cad+Anıl+Sk+No:15+Ünalan+Üsküdar+İstanbul";

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.a
            href={FAB_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-fab floating-fab-location"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="location-floating-btn"
            aria-label="Konum"
          >
            <MapPin className="w-[18px] h-[18px] text-[#bcb1af]" />
          </motion.a>
          <motion.a
            href="https://wa.me/905323016334"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-fab floating-fab-wa"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="whatsapp-floating-btn"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
};

// Two-row sticky navbar
const NAV_TOPBAR_HEIGHT = 36;
const MAIN_NAV_HEIGHT = 64;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const topbarRef = useRef(null);
  const mainnavRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      const topbar = topbarRef.current;
      const mainnav = mainnavRef.current;
      if (!topbar || !mainnav) return;
      if (scrolled) {
        topbar.style.height = "0";
        topbar.style.opacity = "0";
        topbar.style.overflow = "hidden";
        topbar.style.paddingTop = "0";
        topbar.style.paddingBottom = "0";
        mainnav.style.background = "rgba(14, 10, 10, 0.75)";
        mainnav.style.backdropFilter = "blur(20px)";
        mainnav.style.webkitBackdropFilter = "blur(20px)";
        mainnav.style.borderBottom = "1px solid rgba(188,177,175,0.08)";
      } else {
        topbar.style.height = `${NAV_TOPBAR_HEIGHT}px`;
        topbar.style.opacity = "1";
        topbar.style.overflow = "visible";
        topbar.style.paddingTop = "";
        topbar.style.paddingBottom = "";
        mainnav.style.background = "";
        mainnav.style.backdropFilter = "";
        mainnav.style.webkitBackdropFilter = "";
        mainnav.style.borderBottom = "";
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavItems = [
    { label: "Menü", href: "#menu" },
    { label: "Hakkımızda", href: "#about" },
    { label: "Yorumlar", href: "#reviews" },
    { label: "İletişim", href: "#contact" },
  ];

  const allNavItems = [
    ...mainNavItems,
    { label: "Farkımız", href: "#farkimiz" },
    { label: "Galeri", href: "#gallery" },
  ];

  return (
    <>
      <header className="nav-wrapper" data-testid="header">
        {/* Row 1 — Top Info Bar */}
        <div
          ref={topbarRef}
          id="topbar"
          className="nav-topbar"
          style={{ height: `${NAV_TOPBAR_HEIGHT}px` }}
        >
          <div className="nav-topbar-inner">
            <div className="nav-topbar-left">
              <span className="nav-topbar-address">
                <MapPin className="nav-topbar-icon" size={14} />
                Ayazma Cad. Anıl Sk. No:15, Ünalan, Üsküdar / İstanbul
              </span>
              <a href="tel:05323016334" className="nav-topbar-phone">
                <Phone className="nav-topbar-icon" size={14} />
                0532 301 63 34
              </a>
            </div>
            <div className="nav-topbar-right">
              <a href="https://www.instagram.com/gaziantepkuzulahmacun" target="_blank" rel="noopener noreferrer" className="nav-topbar-social" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              <a href="https://wa.me/905323016334" target="_blank" rel="noopener noreferrer" className="nav-topbar-social" aria-label="WhatsApp">
                <MessageCircle size={14} />
              </a>
              <a href="tel:05323016334" className="nav-topbar-social" aria-label="Ara">
                <Phone size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Row 2 — Main Navbar */}
        <div
          ref={mainnavRef}
          id="mainnav"
          className="nav-main"
          style={{ height: `${MAIN_NAV_HEIGHT}px` }}
        >
          <div className="nav-main-inner">
            <nav className="nav-main-links">
              {mainNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-main-link"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a href="#hero" className="nav-main-brand" data-testid="logo">
              <img src="/logo.png" alt="Gaziantep Kuzu Lahmacun" className="nav-main-logo" />
              <span className="nav-main-brand-text">Gaziantep Kuzu Lahmacun</span>
            </a>

            <div className="nav-main-right">
              <a href="tel:05323016334" className="nav-main-cta" data-testid="nav-cta-btn">
                Rezervasyon
              </a>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="nav-main-hamburger" data-testid="mobile-menu-btn" aria-label="Menü">
                    <MenuIcon className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="nav-drawer">
                  <div className="nav-drawer-content">
                    {allNavItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="nav-drawer-link"
                        data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </a>
                    ))}
                    <a
                      href="tel:05323016334"
                      onClick={() => setMobileMenuOpen(false)}
                      className="nav-drawer-cta"
                      data-testid="mobile-cta-btn"
                    >
                      Rezervasyon Yap
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop — SheetContent may not show overlay full screen; ensure via global CSS */}
    </>
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
        background: "linear-gradient(to bottom, rgba(24,18,18,0.5) 0%, rgba(24,18,18,0.75) 50%, rgba(24,18,18,0.92) 100%)",
      }}
    />

    {/* Vertical side text (left) */}
    <p className="hero-side-text" aria-hidden="true">10 YILLIK DENEYIM</p>

    {/* Content — "Bir Kere Deneyin" style */}
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.p
        className="hero-label"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        ÜSKÜDAR · İSTANBUL
      </motion.p>

      <motion.h1
        className="hero-brand-name"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="block">Gaziantep Kuzu</span>
        <span className="block">Lahmacun</span>
      </motion.h1>

      <motion.div
        className="hero-line"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      <motion.p
        className="hero-slogan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Bir Kere Deneyin
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <a
          href="#menu"
          className="hero-btn-secondary"
          data-testid="hero-menu-btn"
        >
          Menüyü İncele
        </a>
        <a
          href="https://wa.me/905323016334"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-btn-wa"
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
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#bcb1af] bounce-slow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      data-testid="scroll-indicator"
    >
      <div className="w-px h-8 bg-gradient-to-b from-[#732127] to-transparent" />
      <ChevronDown className="w-5 h-5" />
    </motion.a>
  </section>
);

// Farkımız — 4 feature icons (between Hero and Menu)
const FarkimizSection = () => {
  const features = [
    {
      icon: UtensilsCrossed,
      title: "Otantik Lezzet",
      desc: "Gaziantep'in geleneksel tarifleri, ustalıkla sunuluyor.",
    },
    {
      icon: Flame,
      title: "Taş Fırın",
      desc: "Lahmacun ve pide taş fırında, o eşsiz dokuda.",
    },
    {
      icon: Star,
      title: "4.7 Google Puanı",
      desc: "Misafirlerimizin güveniyle öne çıkan lezzet.",
    },
    {
      icon: Clock,
      title: "Gece 02:00'ye Kadar",
      desc: "Geç saatlere kadar sıcak servis.",
    },
  ];
  return (
    <AnimatedSection id="farkimiz" className="py-16 md:py-20 bg-[#181212] noise-overlay">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <DiamondDivider className="mb-4" />
          <p className="font-['Cormorant_Garamond'] text-[#bcb1af] text-lg italic">Farkımız</p>
        </div>
        <div className="farkimiz-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="farkimiz-block"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="farkimiz-icon-wrap">
                <f.icon className="w-6 h-6 text-[#732127]" strokeWidth={1.5} />
              </div>
              <h3 className="farkimiz-title">{f.title}</h3>
              <p className="farkimiz-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Menu Section — minimal editorial style
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
    <AnimatedSection id="menu" className="py-16 md:py-24 bg-[#231d1d] noise-overlay">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Editorial header */}
        <div className="text-center mb-10">
          <DiamondDivider className="mb-4" />
          <h2 className="menu-section-title" data-testid="menu-title">MENÜMÜZ</h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#bcb1af] text-base mt-1">Ustanın Seçkisi</p>
        </div>

        {/* Plain text tabs */}
        <div className="menu-tabs-wrap" data-testid="menu-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`menu-tab ${activeCategory === cat.id ? "menu-tab-active" : "menu-tab-inactive"}`}
              data-testid={`menu-filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu by groups — clean rows, no cards */}
        <motion.div
          className="menu-editorial-list"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {getGroups().map(({ key, header, items }) => (
            <div key={key} className="menu-editorial-group">
              <div className="menu-editorial-category-label">{header}</div>
              <div className="menu-editorial-grid">
                {items.map((item, index) => (
                  <motion.div
                    key={`${key}-${index}`}
                    variants={fadeInUp}
                    className="menu-item-row"
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
          className="menu-cta-editorial"
          data-testid="menu-whatsapp-cta"
        >
          Tüm Menü İçin WhatsApp
        </a>
      </div>
    </AnimatedSection>
  );
};

// Sahip Tanıtım — full-width photo banner
const SahipBannerSection = () => (
  <AnimatedSection id="about" className="sahip-banner-wrap">
    <div
      className="sahip-banner-bg"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')`,
      }}
    />
    <div className="sahip-banner-overlay" />
    <div className="sahip-banner-frame">
      <div className="sahip-banner-inner">
        <motion.div
          className="sahip-banner-content"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="sahip-eyebrow">LEZZETİN ARDINDAKİ ELLER</p>
          <h2 className="sahip-name">— Kurucu</h2>
          <p className="sahip-title">KURUCU & BAŞ USTA</p>
          <p className="sahip-desc" data-testid="about-quote">
            Gaziantep'in eşsiz lezzet mirasını Üsküdar'a taşıyan eller.
          </p>
          <a href="#reviews" className="sahip-cta">
            HİKAYEYİ KEŞFET →
          </a>
        </motion.div>
      </div>
    </div>
  </AnimatedSection>
);

// Galeri — asymmetric masonry grid
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80", alt: "Lahmacun ve pide lezzetleri", span: "2rows 1col" },
  { src: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80", alt: "Taş fırında pişen lahmacun", span: "1" },
  { src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80", alt: "Taze hazırlanan yemekler", span: "1" },
  { src: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=900&q=80", alt: "Restoran lezzetleri", span: "landscape" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", alt: "Geleneksel tatlar", span: "1" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Gaziantep mutfağı", span: "1" },
];

const GallerySection = () => (
  <AnimatedSection id="gallery" className="py-16 md:py-24 bg-[#0e0a0a] noise-overlay">
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <h2 className="gallery-section-title">LEZZETLERİMİZ</h2>
      <div className="gallery-masonry">
        <div className="gallery-cell gallery-cell-large" data-testid="gallery-img-0">
          <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
          <div className="gallery-overlay" aria-hidden="true" />
        </div>
        <div className="gallery-cell gallery-cell-portrait" data-testid="gallery-img-1">
          <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
          <div className="gallery-overlay" aria-hidden="true" />
        </div>
        <div className="gallery-cell gallery-cell-portrait" data-testid="gallery-img-2">
          <img src={galleryImages[2].src} alt={galleryImages[2].alt} loading="lazy" />
          <div className="gallery-overlay" aria-hidden="true" />
        </div>
        <div className="gallery-cell gallery-cell-landscape" data-testid="gallery-img-3">
          <img src={galleryImages[3].src} alt={galleryImages[3].alt} loading="lazy" />
          <div className="gallery-overlay" aria-hidden="true" />
        </div>
        <div className="gallery-cell gallery-cell-square" data-testid="gallery-img-4">
          <img src={galleryImages[4].src} alt={galleryImages[4].alt} loading="lazy" />
          <div className="gallery-overlay" aria-hidden="true" />
        </div>
        <div className="gallery-cell gallery-cell-square" data-testid="gallery-img-5">
          <img src={galleryImages[5].src} alt={galleryImages[5].alt} loading="lazy" />
          <div className="gallery-overlay" aria-hidden="true" />
        </div>
      </div>
    </div>
  </AnimatedSection>
);

// Reviews Section — single full-width quote carousel
const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const r = reviews[currentIndex];
  const goPrev = () => setCurrentIndex((i) => (i <= 0 ? reviews.length - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i >= reviews.length - 1 ? 0 : i + 1));

  return (
    <AnimatedSection id="reviews" className="py-16 md:py-24 bg-[#181212] noise-overlay overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8">
          <DiamondDivider className="mb-4" />
          <h2 className="reviews-single-title" data-testid="reviews-title">MİSAFİRLERİMİZ</h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#bcb1af] text-base">Deneyimlerinden Söz Ediyor</p>
        </div>

        <div className="flex justify-center">
          <div className="reviews-google-badge">
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>★★★★★</span>
          <span>GOOGLE YORUMLARI</span>
          </div>
        </div>

        <div className="relative flex items-start justify-center gap-4 md:gap-6 mt-8" data-testid="reviews-carousel">
          <button type="button" onClick={goPrev} className="reviews-arrow-square" aria-label="Önceki">
            <ChevronLeft className="w-5 h-5 text-[#bcb1af]" />
          </button>

          <div className="reviews-quote-block flex-1 min-w-0">
            <span className="reviews-quote-mark" aria-hidden="true">"</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                className="reviews-quote-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {r.text}
              </motion.p>
            </AnimatePresence>
            <div className="reviews-quote-footer">
              <div className="w-10 h-px bg-[#732127] mx-auto mb-3" />
              <span className="reviews-quote-name">{r.name}</span>
            </div>
          </div>

          <button type="button" onClick={goNext} className="reviews-arrow-square" aria-label="Sonraki">
            <ChevronRight className="w-5 h-5 text-[#bcb1af]" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.slice(0, 4).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`reviews-dot ${currentIndex === i ? "reviews-dot-active" : ""}`}
              aria-label={`Yorum ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Contact Section
const ContactSection = () => (
  <AnimatedSection id="contact" className="py-16 md:py-24 bg-[#231d1d] noise-overlay">
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="font-['Cormorant_Garamond'] section-title text-3xl md:text-5xl font-semibold mb-4" data-testid="contact-title">
          İletişim & Konum
        </h2>
        <DiamondDivider />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="contact-info">
          <div className="contact-item" data-testid="contact-address">
            <Diamond className="contact-icon fill-[#732127] text-[#732127]" />
            <p className="text-[#f0ebe8] font-['Inter']">
              Ayazma Cad. Anıl Sk. No:15, Ünalan, Üsküdar / İstanbul
            </p>
          </div>
          <div className="contact-item" data-testid="contact-phone">
            <Diamond className="contact-icon fill-[#732127] text-[#732127]" />
            <div className="text-[#f0ebe8] font-['Inter']">
              <p>0532 301 63 34</p>
              <p>0542 498 56 33</p>
            </div>
          </div>
          <div className="contact-item" data-testid="contact-instagram">
            <Diamond className="contact-icon fill-[#732127] text-[#732127]" />
            <a href="https://www.instagram.com/gaziantepkuzulahmacun" target="_blank" rel="noopener noreferrer" className="text-[#f0ebe8] hover:text-[#732127] transition-colors duration-200 font-['Inter']">
              @gaziantepkuzulahmacun
            </a>
          </div>
          <div className="contact-item" data-testid="contact-hours">
            <Diamond className="contact-icon fill-[#732127] text-[#732127]" />
            <p className="text-[#f0ebe8] font-['Inter']">Her gün açık — Gece 02:00'ye kadar</p>
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
            style={{ border: 0, filter: "grayscale(30%) contrast(1.05) brightness(0.75)" }}
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
      <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold text-[#f0ebe8] mb-4">
        Gaziantep Kuzu Lahmacun
      </h3>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#732127] to-transparent mx-auto mb-6" />
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
      <p className="text-[#695e5e] text-sm mb-4">© 2025 Tüm hakları saklıdır.</p>
      <p className="footer-seo">
        Üsküdar lahmacun | Gaziantep pide İstanbul | Gece açık restoran Üsküdar | En iyi lahmacun İstanbul | Taş fırın pide
      </p>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App bg-[#181212] min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FarkimizSection />
        <MenuSection />
        <SahipBannerSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;

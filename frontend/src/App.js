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
  MessageCircle,
  Quote,
  Menu as MenuIcon,
  X
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
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
    { name: "Kutu İçecekler", price: "50₺", desc: "Kola, Fanta, Soda, Üzümlü Ayran" },
    { name: "Su", price: "20₺" },
  ],
};

// Reviews data
const reviews = [
  {
    name: "Mehmet A.",
    text: "Lahmacun gerçekten nefis, hamuru ince ve gevrek, üstü tam kıvamında. Üsküdar'ın en iyi lahmacunu burada!",
    rating: 5,
  },
  {
    name: "Ayşe K.",
    text: "Gece geç saatte bile sıcak servis, lezzet bozulmamış. Beyran çorbası harika!",
    rating: 5,
  },
  {
    name: "Emre T.",
    text: "Künefe ve katmer muhteşemdi. Kesinlikle tavsiye ederim!",
    rating: 5,
  },
  {
    name: "Fatma S.",
    text: "Fiyat-performans açısından İstanbul'un en iyi mekanlarından biri.",
    rating: 5,
  },
  {
    name: "Ali R.",
    text: "Pide çeşitleri çok geniş, hepsini denemek istedik. Tekrar geleceğiz!",
    rating: 5,
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Section component with scroll animation
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

// Floating Action Buttons
const FloatingButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4" data-testid="floating-buttons">
    <motion.a
      href="https://wa.me/905323016334"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      data-testid="whatsapp-floating-btn"
    >
      <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg pulse-green">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1A0A00] text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        WhatsApp Sipariş
      </span>
    </motion.a>
    <motion.a
      href="tel:05323016334"
      className="group relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      data-testid="call-floating-btn"
    >
      <div className="w-14 h-14 rounded-full bg-[#C0392B] flex items-center justify-center shadow-lg pulse-animation">
        <Phone className="w-7 h-7 text-white" />
      </div>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1A0A00] text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Hemen Ara
      </span>
    </motion.a>
  </div>
);

// Header/Navigation
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-[#1A0A00]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#D4AF37]" data-testid="logo">
            Gaziantep Kuzu Lahmacun
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-[#D4AF37] transition-colors font-medium"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <Button 
              asChild 
              className="bg-[#C0392B] hover:bg-[#a02f24] text-white"
              data-testid="nav-cta-btn"
            >
              <a href="tel:05323016334">
                <Phone className="w-4 h-4 mr-2" />
                Ara
              </a>
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white" data-testid="mobile-menu-btn">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1A0A00] border-[#D4AF37]/20">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-lg hover:text-[#D4AF37] transition-colors"
                    data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                ))}
                <Button 
                  asChild 
                  className="bg-[#C0392B] hover:bg-[#a02f24] text-white mt-4"
                  data-testid="mobile-cta-btn"
                >
                  <a href="tel:05323016334">
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </a>
                </Button>
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
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
    data-testid="hero-section"
  >
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/7405058/pexels-photo-7405058.jpeg')`,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A00]/80 via-[#1A0A00]/70 to-[#1A0A00]/90" />

    {/* Content */}
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          <span className="gradient-text">Gaziantep</span>
          <br />
          <span className="text-white">Kuzu Lahmacun</span>
        </h1>
      </motion.div>

      <motion.p
        className="text-lg md:text-xl text-[#D4AF37] font-medium mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Gerçek Gaziantep Lezzetleri — Üsküdar'ın Kalbinde
      </motion.p>

      <motion.p
        className="text-white/70 text-base md:text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        Gece 02:00'ye kadar açık • 4.7 ⭐ Google
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-[#C0392B] hover:bg-[#a02f24] text-white text-lg px-8 py-6"
          data-testid="hero-call-btn"
        >
          <a href="tel:05323016334">
            <Phone className="w-5 h-5 mr-2" />
            Hemen Ara
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-[#25D366] hover:bg-[#1da851] text-white text-lg px-8 py-6"
          data-testid="hero-whatsapp-btn"
        >
          <a href="https://wa.me/905323016334" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Sipariş
          </a>
        </Button>
      </motion.div>
    </div>

    {/* Scroll Arrow */}
    <motion.a
      href="#menu"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37] bounce-slow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      data-testid="scroll-arrow"
    >
      <ChevronDown className="w-10 h-10" />
    </motion.a>
  </section>
);

// Menu Section
const MenuSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "Tümü" },
    { id: "lahmacun", label: "Lahmacun" },
    { id: "pide", label: "Pide" },
    { id: "salata", label: "Salata" },
    { id: "corba", label: "Çorba" },
    { id: "diger", label: "Diğer" },
    { id: "tatlilar", label: "Tatlılar" },
    { id: "icecekler", label: "İçecekler" },
  ];

  const getMenuItems = () => {
    if (activeTab === "all") {
      return Object.entries(menuData).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category }))
      );
    }
    return menuData[activeTab]?.map((item) => ({ ...item, category: activeTab })) || [];
  };

  const getCategoryLabel = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.label : categoryId;
  };

  return (
    <AnimatedSection id="menu" className="py-16 md:py-24 bg-[#FDF6EC] texture-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-[#1A0A00] mb-4" data-testid="menu-title">
            Menümüz
          </h2>
          <p className="text-[#8C7B75] text-base md:text-lg max-w-2xl mx-auto">
            Gaziantep'in eşsiz lezzetlerini sofranıza taşıyoruz
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" data-testid="menu-tabs">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-8">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat.id
                    ? "bg-[#C0392B] text-white"
                    : "bg-white text-[#1A0A00] hover:bg-[#D4AF37]/20 border border-[#E6D5C4]"
                }`}
                data-testid={`menu-tab-${cat.id}`}
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={activeTab}
            >
              {getMenuItems().map((item, index) => (
                <motion.div key={`${item.category}-${index}`} variants={fadeInUp}>
                  <Card className="bg-white border-2 border-[#E6D5C4] hover:border-[#D4AF37] card-glow overflow-hidden" data-testid={`menu-item-${index}`}>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-1">
                            {item.name}
                          </h3>
                          {item.desc && (
                            <p className="text-[#8C7B75] text-sm">{item.desc}</p>
                          )}
                          {activeTab === "all" && (
                            <span className="inline-block mt-2 text-xs text-[#D4AF37] font-medium uppercase tracking-wide">
                              {getCategoryLabel(item.category)}
                            </span>
                          )}
                        </div>
                        <span className="bg-[#D4AF37] text-[#1A0A00] px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedSection>
  );
};

// About Section
const AboutSection = () => (
  <AnimatedSection id="about" className="py-16 md:py-24 bg-[#1A0A00]">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image */}
        <motion.div
          className="relative order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#C0392B] to-[#8B0000] flex items-center justify-center">
                <span className="font-['Playfair_Display'] text-6xl text-[#D4AF37]">GK</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1A0A00] px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              Sahibinden bir not
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-white mb-6" data-testid="about-title">
            Hakkımızda
          </h2>
          
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 w-10 h-10 text-[#D4AF37] opacity-50" />
            <blockquote className="text-white/90 text-base md:text-lg leading-relaxed pl-8" data-testid="about-text">
              Yılların verdiği tecrübe ve Gaziantep'in eşsiz lezzet mirası ile kurduğumuz bu mutfak, 
              her tabağa yüreğimizi katıyoruz. Kuzu etiyle hazırlanan geleneksel lahmacunumuz, 
              taş fırınımızın sıcaklığında pişen pidelerimiz ve ustalarımızın elinden çıkan tatlılarımız 
              — hepsi sizin için. Üsküdar'a gönlümüzü taşıdık.
            </blockquote>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#D4AF37]/30" />
            <span className="font-['Playfair_Display'] text-[#D4AF37] italic text-lg">— Kurucu</span>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatedSection>
);

// Reviews Section
const ReviewsSection = () => {
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <AnimatedSection id="reviews" className="py-16 md:py-24 bg-[#FDF6EC] texture-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-[#1A0A00] mb-4" data-testid="reviews-title">
            Müşteri Yorumları
          </h2>
          <p className="text-[#8C7B75] text-base md:text-lg">
            Google'da 4.7 ⭐ ile değerlendirildi
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
          data-testid="reviews-carousel"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white border-2 border-[#E6D5C4] h-full" data-testid={`review-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#D4AF37] opacity-30 mb-2" />
                    <p className="text-[#1A0A00] text-base mb-4 leading-relaxed">
                      {review.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1A0A00]">{review.name}</span>
                      <img
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt="Google"
                        className="h-5 opacity-60"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-white border-[#D4AF37] text-[#C0392B] hover:bg-[#D4AF37] hover:text-[#1A0A00]" data-testid="carousel-prev" />
          <CarouselNext className="hidden md:flex -right-4 bg-white border-[#D4AF37] text-[#C0392B] hover:bg-[#D4AF37] hover:text-[#1A0A00]" data-testid="carousel-next" />
        </Carousel>
      </div>
    </AnimatedSection>
  );
};

// Contact Section
const ContactSection = () => (
  <AnimatedSection id="contact" className="py-16 md:py-24 bg-[#C0392B]">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-white mb-4" data-testid="contact-title">
          İletişim & Konum
        </h2>
        <p className="text-white/80 text-base md:text-lg">
          Bizi ziyaret edin veya hemen arayın
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4" data-testid="contact-address">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#1A0A00]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#D4AF37] mb-1">Adres</h3>
              <p className="text-white/90">
                Ayazma Cad. Anıl Sk. No:15, Ünalan, Üsküdar / İstanbul
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4" data-testid="contact-phone">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-[#1A0A00]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#D4AF37] mb-1">Telefon</h3>
              <p className="text-white/90">0532 301 63 34</p>
              <p className="text-white/90">0542 498 56 33</p>
            </div>
          </div>

          <div className="flex items-start gap-4" data-testid="contact-instagram">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Instagram className="w-6 h-6 text-[#1A0A00]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#D4AF37] mb-1">Instagram</h3>
              <a 
                href="https://www.instagram.com/gaziantepkuzulahmacun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-[#D4AF37] transition-colors"
              >
                @gaziantepkuzulahmacun
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4" data-testid="contact-hours">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#1A0A00]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#D4AF37] mb-1">Çalışma Saatleri</h3>
              <p className="text-white/90">Her gün açık — Gece 02:00'ye kadar</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              asChild
              className="bg-[#1A0A00] hover:bg-[#1A0A00]/80 text-white"
              data-testid="contact-call-btn"
            >
              <a href="tel:05323016334">
                <Phone className="w-4 h-4 mr-2" />
                Ara
              </a>
            </Button>
            <Button
              asChild
              className="bg-[#25D366] hover:bg-[#1da851] text-white"
              data-testid="contact-whatsapp-btn"
            >
              <a href="https://wa.me/905323016334" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white"
              data-testid="contact-instagram-btn"
            >
              <a href="https://www.instagram.com/gaziantepkuzulahmacun" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </a>
            </Button>
          </div>
        </div>

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden shadow-2xl h-[300px] md:h-[400px]" data-testid="google-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.1201426778493!2d29.0677371!3d41.0007435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7005dc2ad93%3A0xc78dc9ea1639586e!2sGaziantep%20Kuzu%20Lahmacun!5e0!3m2!1str!2str!4v1771416502746!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
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
  <footer className="bg-[#1A0A00] py-12" data-testid="footer">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center">
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#D4AF37] mb-4">
          Gaziantep Kuzu Lahmacun
        </h3>
        
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://www.instagram.com/gaziantepkuzulahmacun"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] group transition-colors"
            data-testid="footer-instagram"
          >
            <Instagram className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1A0A00]" />
          </a>
          <a
            href="https://wa.me/905323016334"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] group transition-colors"
            data-testid="footer-whatsapp"
          >
            <MessageCircle className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1A0A00]" />
          </a>
          <a
            href="tel:05323016334"
            className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center hover:bg-[#D4AF37] group transition-colors"
            data-testid="footer-phone"
          >
            <Phone className="w-5 h-5 text-[#D4AF37] group-hover:text-[#1A0A00]" />
          </a>
        </div>

        <p className="text-white/60 text-sm mb-4">
          © 2025 Tüm hakları saklıdır.
        </p>
        
        <p className="text-white/40 text-xs max-w-2xl mx-auto">
          İstanbul Üsküdar lahmacun | Gaziantep pide | Gece açık restoran İstanbul | 
          En iyi lahmacun Üsküdar | Taş fırın pide İstanbul
        </p>
      </div>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App">
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

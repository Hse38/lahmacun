import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Diamond, MessageCircle, ArrowLeft } from "lucide-react";
import "@/App.css";

// Full menu data with descriptions (for /menu page)
export const fullMenuData = [
  {
    title: "LAHMACUNLAR",
    items: [
      { name: "Soğanlı Lahmacun", price: "120₺", desc: "İnce hamur, taze soğan ve özel baharatlar" },
      { name: "Sarımsaklı Antep Lahmacun", price: "120₺", desc: "Gaziantep usulü sarımsaklı özel harç" },
    ],
  },
  {
    title: "PİDE ÇEŞİTLERİ",
    items: [
      { name: "Kaşarlı Pide", price: "250₺", desc: "Bol erimiş kaşar peyniri" },
      { name: "Sucuklu Pide", price: "320₺", desc: "Ev yapımı sucuk" },
      { name: "Kuşbaşılı Kaşarlı Pide", price: "350₺", desc: "Dana kuşbaşı ve kaşar" },
      { name: "Kıymalı Pide", price: "300₺", desc: "Taze çekilmiş dana kıyma" },
      { name: "Kavurmalı Pide", price: "320₺", desc: "Odun ateşinde kavurma" },
      { name: "Kavurma Kaşarlı Pide", price: "350₺", desc: "Kavurma ve erimiş kaşar" },
      { name: "Kaşar Sucuklu Pide", price: "300₺", desc: "İkili lezzet kombinasyonu" },
      { name: "Karışık Pide", price: "350₺", desc: "Şef önerisi karışım" },
      { name: "Vejeteryan Pide", price: "300₺", desc: "Taze sebzeler ile" },
    ],
  },
  {
    title: "SALATALAR",
    items: [
      { name: "Çoban Salata", price: "50₺", desc: "Taze domates, salatalık, biber" },
      { name: "Mevsim Salata", price: "50₺", desc: "Günün taze yeşillikleri" },
    ],
  },
  {
    title: "ÇORBALAR",
    items: [
      { name: "Ezogelin", price: "90₺", desc: "Geleneksel Türk çorbası" },
      { name: "Beyran", price: "300₺", desc: "Gaziantep'in meşhur beyranı" },
    ],
  },
  {
    title: "DİĞER",
    items: [
      { name: "İçli Köfte", price: "80₺", desc: "El yapımı geleneksel tarif" },
      { name: "Patates Kızartması", price: "50₺", desc: "Çıtır çıtır" },
      { name: "Kilis Tava", price: "450₺", desc: "Kilis'in meşhur lezzeti" },
      { name: "Patlıcan Kebap (çift kişilik)", price: "600₺", desc: "Közde patlıcan" },
      { name: "Soğan Kebap (çift kişilik)", price: "600₺", desc: "Özel tarif" },
    ],
  },
  {
    title: "TATLILAR",
    items: [
      { name: "Baklava", price: "250₺", desc: "Antep fıstıklı, ince yufka" },
      { name: "Katmer", price: "400₺", desc: "Gaziantep'in simge tatlısı" },
      { name: "Künefe", price: "150₺", desc: "Sıcak servis, tel kadayıf" },
      { name: "Havuç Dilimi", price: "250₺", desc: "Şerbetli baklava" },
      { name: "Sütlaç", price: "80₺", desc: "Fırında üstü kızarmış" },
    ],
  },
  {
    title: "İÇECEKLER",
    items: [
      { name: "Kutu İçecekler", price: "50₺", desc: "Kola, Fanta, Soda, Üzümlü Ayran" },
      { name: "Su", price: "20₺", desc: "Soğuk" },
    ],
  },
];

const AnimatedDivider = ({ dividerRef, isVisible, dataKey }) => (
  <div ref={dividerRef} data-divider-key={dataKey} className={`menu-page-divider ${isVisible ? "is-visible" : ""}`}>
    <div className="menu-page-divider-line" />
    <Diamond className="menu-page-divider-diamond w-3 h-3" />
    <div className="menu-page-divider-line line-right" />
  </div>
);

const MENU_PAGE_TITLE = "Gaziantep Lahmacun ve Pide Menüsü | Üsküdar | Odun Fırını";

export default function MenuPage() {
  const headerRef = useRef(null);
  const sectionRefs = useRef([]);
  const dividerRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleDividers, setVisibleDividers] = useState(new Set());
  const titleRef = useRef(null);

  useEffect(() => {
    document.title = MENU_PAGE_TITLE;
    return () => {
      document.title = "Gaziantep Kuzu Lahmacun | Odun Fırını Lezzeti | Üsküdar";
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.dataset.sectionKey;
          if (key !== undefined) {
            setVisibleSections((prev) => new Set(prev).add(key));
          }
          const divKey = entry.target.dataset.dividerKey;
          if (divKey !== undefined) {
            setVisibleDividers((prev) => new Set(prev).add(divKey));
          }
        });
      },
      { threshold: 0.2 }
    );
    const n = fullMenuData.length;
    const timer = setTimeout(() => {
      for (let i = 0; i < n; i++) {
        if (sectionRefs.current[i]) observer.observe(sectionRefs.current[i]);
      }
      for (let i = 0; i <= n; i++) {
        if (dividerRefs.current[i]) observer.observe(dividerRefs.current[i]);
      }
    }, 0);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY * 0.4;
      el.style.transform = `translateY(${y}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-page-header" ref={headerRef}>
        <Link to="/" className="menu-page-back">
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfa
        </Link>

        <AnimatedDivider dividerRef={(el) => (dividerRefs.current[0] = el)} isVisible={visibleDividers.has("0")} dataKey="0" />
        <h1 ref={titleRef} className="menu-page-title">
          Gaziantep Lahmacun ve Pide Menüsü
        </h1>
        <p className="menu-page-subtitle">Üsküdar odun fırını — ustaların elinden, sofranıza</p>
        <div className="menu-page-line" />
      </div>

      <div className="menu-page-content">
        {fullMenuData.map((section, idx) => (
          <section
            key={section.title}
            ref={(el) => (sectionRefs.current[idx] = el)}
            data-section-key={section.title}
            className={`menu-page-section ${visibleSections.has(section.title) ? "is-visible" : ""}`}
          >
            {idx > 0 && (
              <AnimatedDivider
                dividerRef={(el) => (dividerRefs.current[idx] = el)}
                isVisible={visibleDividers.has(String(idx))}
                dataKey={String(idx)}
              />
            )}
            <h2 className={`menu-page-category-title ${visibleSections.has(section.title) ? "is-visible" : ""}`}>
              {section.title}
            </h2>
            <div className="menu-page-items">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="menu-page-item-row"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="menu-page-item-main">
                    <span className="menu-page-item-name">{item.name}</span>
                    <span className="menu-page-item-dots" />
                    <span className="menu-page-item-price">{item.price}</span>
                  </div>
                  {item.desc && (
                    <p className="menu-page-item-desc">{item.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <AnimatedDivider
          dividerRef={(el) => (dividerRefs.current[fullMenuData.length] = el)}
          isVisible={visibleDividers.has(String(fullMenuData.length))}
          dataKey={String(fullMenuData.length)}
        />
        <div className="menu-page-footer">
          <p className="menu-page-footer-label">TARİHİ ÜSKÜDAR'DA</p>
          <p className="menu-page-footer-note">
            Tüm ürünlerimiz günlük taze malzemelerle hazırlanmaktadır.
          </p>
          <a
            href="https://wa.me/905323016334"
            target="_blank"
            rel="noopener noreferrer"
            className="menu-page-wa-cta"
          >
            <MessageCircle className="w-5 h-5" />
            Sipariş için WhatsApp: 0532 301 63 34
          </a>
        </div>
      </div>
    </div>
  );
}

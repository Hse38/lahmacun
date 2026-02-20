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
      { name: "Patlıcan Kebap", price: "600₺", desc: "Çift kişilik, közde patlıcan" },
      { name: "Soğan Kebap", price: "600₺", desc: "Çift kişilik, özel tarif" },
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

const DiamondDividerInline = () => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#732127]" />
    <Diamond className="w-3 h-3 text-[#732127] fill-[#732127]" />
    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#732127]" />
  </div>
);

export default function MenuPage() {
  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <Link to="/" className="menu-page-back">
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfa
        </Link>

        <DiamondDividerInline />
        <h1 className="menu-page-title">MENÜ</h1>
        <p className="menu-page-subtitle">Ustaların elinden, sofranıza...</p>
        <div className="menu-page-line" />
      </div>

      <div className="menu-page-content">
        {fullMenuData.map((section, idx) => (
          <section key={section.title} className="menu-page-section">
            {idx > 0 && <DiamondDividerInline />}
            <h2 className="menu-page-category-title">{section.title}</h2>
            <div className="menu-page-items">
              {section.items.map((item, i) => (
                <div key={i} className="menu-page-item-row">
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

        <DiamondDividerInline />
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

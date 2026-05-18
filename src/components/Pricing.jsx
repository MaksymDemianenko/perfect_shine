import React from 'react';

const Pricing = ({ t }) => {
  if (!t) return null;

  return (
    <section id="prices" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t.title}<span className="text-ps-gold italic font-serif">{t.titleGold}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Категория: Уборка */}
          <div className="bg-ps-beige/10 p-8 rounded-2xl border border-ps-gold/20 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="mr-3">🏠</span> {t.categories.apartments}
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.regular}</span>
                <span className="font-bold text-ps-gold">{t.from} 450 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.general}</span>
                <span className="font-bold text-ps-gold">{t.from} 800 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.renovation}</span>
                <span className="font-bold text-ps-gold">{t.from} 900 zł</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-6 mt-10 flex items-center">
              <span className="mr-3">🪟</span> {t.categories.windows}
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.window}</span>
                <span className="font-bold text-ps-gold">{t.from} 50 zł</span>
              </li>
            </ul>
          </div>

          {/* Категория: Химчистка и допы */}
          <div className="bg-ps-beige/10 p-8 rounded-2xl border border-ps-gold/20 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="mr-3">🛋️</span> {t.categories.upholstery}
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.sofa}</span>
                <span className="font-bold text-ps-gold">{t.from} 150 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.mattress}</span>
                <span className="font-bold text-ps-gold">{t.from} 100 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.carpet}</span>
                <span className="font-bold text-ps-gold">{t.from} 15 zł/m²</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-6 mt-10 flex items-center">
              <span className="mr-3">✨</span> {t.categories.additional}
            </h3>
            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.oven}</span>
                <span className="font-bold text-ps-gold">{t.from} 100 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.fridge}</span>
                <span className="font-bold text-ps-gold">{t.from} 60 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.cabinets}</span>
                <span className="font-bold text-ps-gold">{t.from} 100 zł</span>
              </li>
              <li className="flex justify-between border-b border-ps-gold/10 pb-2">
                <span>{t.items.balcony}</span>
                <span className="font-bold text-ps-gold">{t.from} 150 zł</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 text-center text-gray-500 italic">
          * Kraków i okolice — Napisz do nas — szybka wycena!
        </div>
      </div>
    </section>
  );
};

export default Pricing;
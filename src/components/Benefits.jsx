import React from 'react';

const Benefits = ({ t }) => {
  return (
    <section className="py-20 bg-ps-beige/20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* Текстовая часть */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-8 text-ps-black">
            {t.title} <span className="text-ps-gold">{t.titleGold}</span>
          </h2>
          
          <ul className="space-y-6">
            {[t.item1, t.item2, t.item3].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-ps-gold flex items-center justify-center text-white shrink-0">
                  ✓
                </div>
                <p className="text-lg font-medium text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Картинка */}
        <div className="flex-1 w-full">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {/* Пока поставим заглушку, потом заменим на реальное фото */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
               Место для фото интерьера
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Benefits;
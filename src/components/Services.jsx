import React from 'react';
import Link from 'next/link'; // 1. Импортируем Link

const Services = ({ t }) => {
  const servicesData = [
    { 
      id: 1, 
      title: t.flat, 
      price: 'od 450 PLN', 
      icon: '🏠', 
      slug: 'regular' // id для ссылки
    },
    { 
      id: 2, 
      title: t.office, 
      price: 'od 500 PLN', 
      icon: '🏢', 
      slug: 'office' 
    },
    { 
      id: 3, 
      title: t.repair, 
      price: 'od 900 PLN', 
      icon: '🏗️', 
      slug: 'repair' // тот самый slug для "После ремонта"
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t.title} <span className="text-ps-gold">{t.titleGold}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="group p-8 border border-gray-100 rounded-2xl hover:border-ps-gold transition-all duration-300 hover:shadow-xl bg-white">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-ps-gold transition">
                {service.title}
              </h3>
              <p className="text-gray-500 font-medium mb-6">{service.price}</p>
              
              {/* 2. Оборачиваем кнопку в Link с параметром service */}
              <Link href={`/order?service=${service.slug}`}>
                <button className="w-full py-3 rounded-xl border-2 border-ps-gold text-ps-gold font-bold hover:bg-ps-gold hover:text-white transition-all">
                  {/* Здесь можно добавить перевод для слова "Заказать" в словарь, либо написать вручную */}
                  Zarezerwuj
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
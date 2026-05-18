import React from 'react';

const ContactBtn = () => {
  return (
    <a 
      href="https://wa.me/48575199937" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center w-16 h-16"
    >
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.893-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.413 0 6.556-5.332 11.891-11.893 11.891-2.01 0-3.98-.51-5.725-1.48L0 24zm6.75-4.814l.481.285c1.429.847 3.037 1.295 4.67 1.295 4.903 0 8.892-3.99 8.896-8.896 0-2.377-.925-4.611-2.603-6.29s-3.913-2.602-6.291-2.602c-4.906 0-8.896 3.99-8.896 8.896 0 1.666.463 3.29 1.339 4.697l.313.506L1.585 21l3.354-1.229 1.868.415z"/>
      </svg>
    </a>
  );
};

export default ContactBtn;
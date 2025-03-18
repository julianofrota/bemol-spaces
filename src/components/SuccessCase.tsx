
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { successCases } from '@/data/spaces';

const SuccessCase = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = cardsRef.current?.querySelectorAll('.animate-on-scroll');
    if (cards) {
      cards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => {
      const cards = cardsRef.current?.querySelectorAll('.animate-on-scroll');
      if (cards) {
        cards.forEach((card) => {
          observer.unobserve(card);
        });
      }
    };
  }, []);

  return (
    <section id="success-cases" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-bemol-blue/10 text-bemol-blue text-sm font-medium mb-4">
            CASOS DE SUCESSO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformamos exposição em resultados</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Conheça algumas marcas que já alcançaram resultados extraordinários com nossa plataforma de retail media
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successCases.map((caseItem, index) => (
            <Card 
              key={caseItem.id}
              className="overflow-hidden animate-on-scroll"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-48 relative">
                <img 
                  src={caseItem.imageUrl} 
                  alt={caseItem.brand} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-white text-bemol-blue px-2 py-1 text-xs font-semibold rounded">
                    {caseItem.brand}
                  </span>
                  <h3 className="text-white text-xl font-bold mt-2">{caseItem.title}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-gray-600 mb-4">{caseItem.description}</p>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-sm text-gray-600 mb-1">Resultados</h4>
                  <p className="font-medium">{caseItem.results}</p>
                </div>
                
                <blockquote className="border-l-4 border-bemol-blue pl-4 italic text-gray-600 mb-4">
                  "{caseItem.testimonial}"
                </blockquote>
                
                <p className="text-sm text-gray-500">{caseItem.contactPerson}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCase;

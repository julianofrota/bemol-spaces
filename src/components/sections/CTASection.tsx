
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-bemol-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para destacar sua marca?</h2>
        <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
          Aumente suas vendas com espaços estratégicos nas lojas Bemol
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-bemol-blue hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
          >
            Falar com um consultor
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
          >
            Ver apresentação
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

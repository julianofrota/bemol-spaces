import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import BemolLogo from './BemolLogo';

const Footer = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Inscrição realizada",
      description: "Obrigado por se inscrever. Em breve você receberá nossas atualizações.",
    });
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <BemolLogo variant="light" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Impulsione suas vendas com a Bemol Spaces, uma plataforma completa de retail media para fornecedores que buscam destaque nas lojas físicas da Bemol no Norte do Brasil.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
              <div className="flex-grow">
                <Input 
                  type="email" 
                  placeholder="Seu e-mail para novidades" 
                  required 
                  className="bg-gray-800 border-gray-700 text-white h-10"
                />
              </div>
              <Button type="submit" className="bg-bemol-blue hover:bg-bemol-lightblue">
                Inscrever
              </Button>
            </form>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#spaces" className="text-gray-400 hover:text-white transition-colors">
                  Espaços Disponíveis
                </a>
              </li>
              <li>
                <a href="#locations" className="text-gray-400 hover:text-white transition-colors">
                  Nossas Lojas
                </a>
              </li>
              <li>
                <a href="#success-cases" className="text-gray-400 hover:text-white transition-colors">
                  Casos de Sucesso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sobre a Bemol
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">
                Av. Djalma Batista, 482
                <br />
                Manaus - AM, 69053-000
              </li>
              <li>
                <a href="tel:+5592988776655" className="text-gray-400 hover:text-white transition-colors">
                  +55 (92) 3987-6655
                </a>
              </li>
              <li>
                <a href="mailto:spaces@bemol.com.br" className="text-gray-400 hover:text-white transition-colors">
                  spaces@bemol.com.br
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Bemol Spaces. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-300 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

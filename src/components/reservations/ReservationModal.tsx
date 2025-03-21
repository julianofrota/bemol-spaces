import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MediaSpace } from '@/types';

interface ReservationModalProps {
  space: MediaSpace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReservationModal = ({ space, open, onOpenChange }: ReservationModalProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!space) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando um envio de formulário
    setTimeout(() => {
      setLoading(false);
      toast.success("Reserva enviada com sucesso!", {
        description: "Nossa equipe entrará em contato em breve para confirmar sua reserva.",
      });
      onOpenChange(false);
      setStep(1);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reservar Espaço</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" placeholder="Seu nome" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Nome da empresa" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" required />
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="w-full bg-bemol-blue hover:bg-bemol-lightblue"
                >
                  Continuar
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="space">Espaço selecionado</Label>
                <Input id="space" value={space.name} readOnly className="bg-gray-50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="period">Período de reserva</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Semanal - R$ {space.price.weekly.toLocaleString('pt-BR')}</SelectItem>
                    <SelectItem value="monthly">Mensal - R$ {space.price.monthly.toLocaleString('pt-BR')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Data desejada</Label>
                <Input id="date" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="details">Detalhes adicionais</Label>
                <Textarea 
                  id="details" 
                  placeholder="Compartilhe mais detalhes sobre sua campanha e necessidades específicas" 
                  rows={3}
                />
              </div>
              
              <DialogFooter className="gap-3 flex-col sm:flex-row pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto"
                >
                  Voltar
                </Button>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto bg-bemol-blue hover:bg-bemol-lightblue"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Confirmar Reserva'}
                </Button>
              </DialogFooter>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

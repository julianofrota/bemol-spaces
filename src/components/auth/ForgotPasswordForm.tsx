import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { ReloadIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  email: z.string().email('Email inválido'),
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar recuperação de senha com Supabase
      console.log('Reset password for:', data.email);
      
      toast.success('Email enviado', {
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      });
    } catch (error) {
      toast.error('Erro ao enviar email', {
        description: 'Não foi possível enviar o email de recuperação. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Recuperar Senha</h2>
        <p className="text-sm text-gray-600 mt-2">
          Digite seu email para receber as instruções de recuperação
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-bemol-blue hover:bg-bemol-lightblue"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Email'
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Lembrou sua senha?{' '}
          <Link
            to="/auth/login"
            className="text-bemol-blue hover:underline font-medium"
          >
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  );
} 
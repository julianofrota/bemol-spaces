import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      // TODO: Implementar autenticação com Supabase
      console.log('Login data:', data);
      
      toast.success('Login realizado com sucesso!', {
        description: 'Redirecionando para o dashboard...',
      });
    } catch (error) {
      toast.error('Erro ao fazer login', {
        description: 'Verifique suas credenciais e tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h2>
        <p className="text-sm text-gray-600 mt-2">
          Entre com suas credenciais para acessar sua conta
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-bemol-blue hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-bemol-blue hover:bg-bemol-lightblue"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Ainda não tem uma conta?{' '}
          <Link
            to="/auth/register"
            className="text-bemol-blue hover:underline font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
} 
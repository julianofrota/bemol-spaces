import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mocked user data
const mockUser: User = {
  id: "user-1",
  email: "joao.silva@empresa.com",
  name: "João Silva",
  company: "Empresa A",
  role: "Gerente de Marketing"
};

// Form validation schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  company: z.string().min(2, { message: "Nome da empresa deve ter pelo menos 2 caracteres" }),
  role: z.string().min(2, { message: "Cargo deve ter pelo menos 2 caracteres" })
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with user data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role
    }
  });

  const handleEditToggle = () => {
    if (isEditing) {
      form.reset({
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role
      });
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (data: ProfileFormValues) => {
    // Simulate API update
    setUser({
      ...user,
      ...data
    });
    
    setIsEditing(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Perfil</h1>
        
        <div className="grid gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl bg-bemol-blue text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {isEditing ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={handleEditToggle}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nome Completo</h3>
                      <p className="mt-1 text-base">{user.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">E-mail</h3>
                      <p className="mt-1 text-base">{user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Empresa</h3>
                      <p className="mt-1 text-base">{user.company}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
                      <p className="mt-1 text-base">{user.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className={isEditing ? "hidden" : "flex justify-end"}>
              <Button onClick={handleEditToggle}>
                Editar Perfil
              </Button>
            </CardFooter>
          </Card>

          {/* Account Security Card */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Gerencie sua senha e configurações de segurança da conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Sua senha foi alterada pela última vez há 3 meses</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                Alterar Senha
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 
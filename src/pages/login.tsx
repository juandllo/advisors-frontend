import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { endpoints } from "@/config/endpoints";
import { postHttp } from "@/helpers/httpHelpers";
import { alertError } from '@/helpers/alertHandler';
import { useAuthStore } from "@/context/accountContext";

const formSchema = z.object({
  email: z.string().email({ message: 'Debe ingresar un correo válido' }),
  password: z.string().nonempty({ message: 'Debe ingresar una contraseña' })
});

export function Login() {
  const navigate = useNavigate();
  const [setToken, setUser] = useAuthStore(
    (state) => [state.setToken, state.setUser]
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    postHttp(`${endpoints.account}/login`, { email: values.email, password: values.password })
      .then(res => {
        if (res.statusCode === 404 || res.statusCode === 403) {
          alertError('Credenciales incorrectas');
          form.reset();
          return;
        }

        if (res.statusCode === 500) {
          alertError('Ha ocurrido un error iniciando sesión');
          form.reset();
          return;
        }

        form.reset();

        setToken(res.access_token);
        setUser(res.access_token);
        navigate("/inicio");
      });
  }

  return <div className="relative flex min-h-scree flex-col">
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingrese su correo electrónico a continuación para inciar sesión en su cuenta de Asesor.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-4" >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Iniciar Sesión</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  </div>
}


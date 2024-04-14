import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { ChevronLeft, Plus } from "lucide-react";
import { alertSuccessTimer, alertDialog, alertSuccess } from "@/helpers/alertHandler";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre debe contener mínimo 2 caracteres"
  }).max(50, {
    message: "El nombre debe ser máximo de 50 caracteres"
  }),
  lastname: z.string().min(2, {
    message: "El apellido debe ser mínimo de 2 caracteres"
  }).max(50, {
    message: "El apellido debe ser máximo de 50 caracteres"
  }),
  address: z.string().min(2, {
    message: "La dirección debe ser mínimo de 2 caracteres"
  }).max(100, {
    message: "La dirección debe máximo de 100 caracteres"
  }),
  paymentMethod: z.string({
    required_error: "Seleccione un medio de pago"
  }),
  additional: z.string().max(150, {
    message: "La información adicional es de máximo 150 caracteres"
  }),
  deliveryValue: z.number().min(4, {
    message: "Ingrese el valor del domicilio"
  }).negative({
    message: "El valor del domicilio debe ser mayor a 0"
  })
});

export default function NewOrder() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      lastname: "",
      address: "",
      additional: "",
      deliveryValue: 0
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    alertSuccess("El pedido se ha enviado exitosamente", "Pedido Enviado");
    form.reset();
  }

  const handleClear = () => {
    alertDialog("Estas a punto de limpiar la información del formulario", "Estas Seguro?")
      .then(result => {
        if (result.isConfirmed) {
          form.reset();
          alertSuccessTimer("Se ha limpiado el formulario");
        }
      });
  }

  return <>
    <div className="flex items-center gap-4">
      <Link to="/pedidos">
        <Button variant="secondary" size="icon">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Account</span>
        </Button>
      </Link>
      <h1 className="text-lg font-semibold md:text-2xl">Nuevo Pedido</h1>
    </div>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 sm:grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
          <CardDescription>Datos del destinatario del pedido.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Cra 1 Cl 1 #1-1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ingrese la dirección del destinatario del pedido
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medio de Pago</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Nequi">Nequi</SelectItem>
                          <SelectItem value="Transferencia Bancolombia">Transferencia Bancolombia</SelectItem>
                          <SelectItem value="Efectivo">Efectivo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Comprobante de pago</FormLabel>
                  <FormControl>
                    <Input id="picture" type="file"></Input>
                  </FormControl>
                  <FormDescription>
                    Adjunte la imagen del comprobante de pago
                  </FormDescription>
                </FormItem>
                <FormItem>
                  <FormLabel>Valor de domicilio</FormLabel>
                  <FormControl>
                    <Input placeholder="1.000" type="number"></Input>
                  </FormControl>
                </FormItem>
                <FormField
                  control={form.control}
                  name="additional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Información adicional</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <Button type="submit" className="w-full">Crear</Button>
                <Button onClick={handleClear} className="w-full" variant="secondary">Limpiar</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>Seleccione los productos que hacen parte del pedido.</CardDescription>
        </CardHeader>
        <CardContent>
          Formulario de los productos
          <Button className="w-full mt-5 gap-2" variant="secondary">
            <Plus className="h-4 w-4" />
            <span>Agregar Producto</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  </>
}
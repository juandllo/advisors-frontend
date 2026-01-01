import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useOrderStore } from "@/context/orderContext";
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
  }).min(0),
  deliveryValue: z.string().min(1, {
    message: "Debe ingresar un valor de domicilio"
  })
});

export function NewOrderClientInfo() {
  const [order, setOrder] = useOrderStore(
    (state) => [state.order, state.setOrder]
  )
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: order.name,
      lastname: order.lastName,
      address: order.address,
      additional: order.additionalInformation,
      deliveryValue: order.deliveryValue,
      paymentMethod: order.paymentMethod
    }
  });

  const handleContinue = (values: z.infer<typeof formSchema>) => {
    console.log(values); 
    setOrder({
      name: values.username,
      lastName: values.lastname,
      address: values.address,
      deliveryValue: values.deliveryValue,
      additionalInformation: values.additional,
      paymentMethod: values.paymentMethod
    })
    //alertSuccess("El pedido se ha enviado exitosamente", "Pedido Enviado");
    form.reset();
    navigate('/nuevo-pedido/resumen')
  }

  return <Card>
    <CardHeader>
      <CardTitle>Información del Cliente</CardTitle>
      <CardDescription>Datos del destinatario del pedido.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleContinue)} className="flex-1">
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
            <FormField
              control={form.control}
              name="deliveryValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor de domicilio</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <div className="flex flex-row justify-end gap-4 mt-5">
            <Link to='/nuevo-pedido/productos'>
              <Button variant="secondary">Atrás</Button>
            </Link>
            <Button type="submit">Continuar</Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>
}
import { useState } from "react";
import { userStatuses } from "@/config/userStatusses";
import { FormProps } from "@/interfaces/iFormProps";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

export default function AdvisorForm({ form, handleSubmit }: FormProps) {
  const [activeStatus] = useState(userStatuses.find(status => status.value === "Activo"));

  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre*
                  <span className={cn(
                    "inline-flex items-center rounded-md px-2 mx-2 py-1 text-xs font-medium ring-1 ring-inset",
                    activeStatus?.textColor,
                    activeStatus?.bgColor,
                    activeStatus?.ringColor
                  )}>{activeStatus?.value}</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido*</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
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
                <FormLabel>Correo*</FormLabel>
                <FormControl>
                  <Input placeholder="asesor@mail.com" {...field} />
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
                <FormDescription>
                  La contraseña del asesor es opcional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cellphone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular*</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="305589984" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección*</FormLabel>
                <FormControl>
                  <Input placeholder="Cl 1 #1-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          <span>Crear Asesor</span>
        </Button>
      </form>
    </Form>
  </>
}

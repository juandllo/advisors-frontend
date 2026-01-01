import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Eraser } from "lucide-react";
import { useOrderStore } from "@/context/orderContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { alertDialog, alertSuccessTimer, alertWarning } from "@/helpers/alertHandler";
import { TProduct } from "@/types";
import { Separator } from "@/components/ui/separator";
import { currencyFormatter } from '@/helpers/formatterHandler'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del producto debe contener mínimo 2 caracteres"
  }).max(50, {
    message: "El nombre del producto debe ser máximo de 50 caracteres"
  }),
  quantity: z.string().min(1, {
    message: "Debe ingresar una cantidad"
  }),
  amount: z.string().min(1, {
    message: "Debe ingresar el valor unitario"
  }),
});

export function NewOrderProducts () {
  const [products, setProducts] = useOrderStore(
    (state) => [state.products, state.setProducts]
  )
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: "",
      amount: ""
    }
  });

  const handleAddProduct = (values: z.infer<typeof formSchema>) => {
    const product: TProduct = { name: values.name, desc: values.name, amount: parseInt(values.amount), quantity: parseInt(values.quantity), total: parseInt(values.quantity) * parseInt(values.amount) }
    const tmpProducts: TProduct[] = products;
    tmpProducts.push(product);
    setProducts(tmpProducts);
    toast({
      title: 'Producto Adicionado',
      description: `Se ha adicionado el producto ${product.name} al pedido.`
    })
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

  const handleContinue = () => {
    if (products.length === 0) {
      alertWarning("Para continuar debe ingresar al menos 1 producto.");
      return;
    }
    
    navigate('/nuevo-pedido/info');
  }

  return <Card>
    <CardHeader>
      <CardTitle>Productos</CardTitle>
      <CardDescription>Ingrese los productos del pedido.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddProduct)} className="flex-1">
          <div className="flex flex-row justify-start gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input className="w-96" placeholder="Servilletas de navidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input className="w-32" placeholder="0" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Unidad</FormLabel>
                  <FormControl>
                    <Input className="w-48" placeholder="0" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <div className="grid grid-cols-2 gap-2 mt-8">
              <Button type="submit">
                <Plus className="h-4 w-4" />
              </Button>
              <Button onClick={handleClear} variant="secondary">
                <Eraser className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Separator className="my-5" />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Producto</TableHead>
              <TableHead className="w-[200px]">Cantidad</TableHead>
              <TableHead>Valor Unidad</TableHead>
              <TableHead className="">Valor Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products && products.map((product: TProduct) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{currencyFormatter(product.amount)}</TableCell>
                <TableCell className="">{currencyFormatter(product.total ? product.total : 0)}</TableCell>
              </TableRow>
            ))}
            {products.length === 0 &&
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                >
                  No se han adicionado productos.
                </TableCell>
              </TableRow>
            }       
          </TableBody>
        </Table>
      </div>
      <div className="mt-5 flex justify-end">
        <Button onClick={() => handleContinue()}>Continuar</Button>
      </div>
    </CardContent>
  </Card>
}
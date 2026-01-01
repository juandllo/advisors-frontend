import { Link } from "react-router-dom";
import { useOrderStore } from "@/context/orderContext";
import { currencyFormatter } from '@/helpers/formatterHandler'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TProduct } from "@/types";
import { useEffect, useState } from "react";

export function NewOrderSummary() {
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalOrderWithShipping, setTotalOrderWithShipping] = useState<number>(0);
  const [products, order] = useOrderStore(
    (state) => [state.products, state.order]
  )

  useEffect(() => {
    setTotalOrder(calculateTotalOrder()!);
  }, []);

  useEffect(() => {
    setTotalOrderWithShipping(calculateTotalOrderWithShipping());
  }, [totalOrder]);

  const calculateTotalOrder = () => {
    const totals = products.map((product: TProduct) => product.total);
    return totals.reduce((accum: number, current: number) => { return accum + current })
  }

  const calculateTotalOrderWithShipping = () => {
    return totalOrder + parseInt(order.deliveryValue!);
  }

  return <Card>
    <CardHeader className="flex flex-row items-start">
      <div className="grid gap-0.5">
        <CardTitle className="group flex items-center gap-2 text-lg">
          Resumen Oe31b70H
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6"
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy Order ID</span>
          </Button>
        </CardTitle>
        <CardDescription>Fecha: 29 Julio, 2024</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex-1 gap-6">
          <div className="font-semibold">Información del Cliente</div>
          <dl className="grid gap-3 mt-4">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Nombre</dt>
              <dd>{order.name} {order.lastName}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Dirección</dt>
              <dd className="font-semibold">
                {order.address}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Medio de Pago</dt>
              <dd className="rounded-sm px-2 text-purple-700 dark:text-purple-500 bg-purple-50 dark:bg-purple-900/30 ring-purple-600/20">
                {order.paymentMethod}
              </dd>
            </div>
            <div className="grid gap-2 items-center">
              <dt className="font-semibold">Información Adicional</dt>
              <dd>
                {order.additionalInformation}
              </dd>
            </div>
          </dl>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <CardTitle className="group flex items-center gap-2 text-md">Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 mt-4">
              <ul className="grid gap-3">
                {products && products.map((product: TProduct) => (
                  <li key={product.name} className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {product.name} x <span>{product.quantity}</span>
                    </span>
                    <span>{currencyFormatter(product.total!)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{currencyFormatter(totalOrder)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Costo Envío</span>
                  <span>{currencyFormatter(parseInt(order.deliveryValue!))}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>{currencyFormatter(totalOrderWithShipping)}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-5 flex justify-end gap-4">
        <Link to="/nuevo-pedido/info">
          <Button variant="secondary">Atrás</Button>
        </Link>
        <Button>Enviar Pedido</Button>
      </div>
    </CardContent>
  </Card>
}
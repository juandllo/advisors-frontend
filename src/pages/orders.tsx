import { Button } from "@/components/ui/button"

export default function Orders() {
  return <>
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Pedidos</h1>
    </div>
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No has generado pedidos este mes.
        </h3>
        <p className="text-sm text-muted-foreground">
          Las ventas generadas para cada periodo aparecerán en esta sección.
        </p>
        <Button className="mt-4">Generar Pedido</Button>
      </div>
    </div>
  </>
}
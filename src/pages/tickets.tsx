import { Button } from '@/components/ui/button'

export function Tickets() {
  return <>
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Tickets</h1>
    </div>
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No se ha generado tickets.
        </h3>
        <p className="text-sm text-muted-foreground">
          Los tickets generados para la administración aparecerán en esta sección.
        </p>
        <Button className="mt-4">Generar Ticket</Button>
      </div>
    </div>
  </>
}
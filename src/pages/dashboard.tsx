export function Dashboard() {
  return <>
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Inicio</h1>
    </div>
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No has generado movimientos este mes.
        </h3>
        <p className="text-sm text-muted-foreground">
          El resumen de los movimientos generados este mes aparecerán en esta sección.
        </p>
      </div>
    </div>
  </>
}
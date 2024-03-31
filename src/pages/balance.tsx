export default function Balance() {
  return <>
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Saldo</h1>
    </div>
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No has generado saldo este mes.
        </h3>
        <p className="text-sm text-muted-foreground">
          El saldo generado por los pedidos confirmados aparecerá en esta sección.
        </p>
      </div>
    </div>
  </>
}
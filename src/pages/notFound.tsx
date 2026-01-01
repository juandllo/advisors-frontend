export function NotFound() {
  return <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">
        404 No Encontrado.
      </h3>
      <p className="text-sm text-muted-foreground">
        La página a la que esta tratando de acceder no fue encontrada.
      </p>
    </div>
  </div>
}
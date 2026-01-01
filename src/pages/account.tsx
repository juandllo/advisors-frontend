export function Account() {
  return <>
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Cuenta</h1>
    </div>
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Información de Cuenta de Juan Arboleda
        </h3>
        <p className="text-sm text-muted-foreground">
          Aquí va la información de la cueta de usuario loguead.
        </p>
      </div>
    </div>
  </>
}
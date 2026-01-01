import { Check } from 'lucide-react'

export default function Stepper() {
  return  <div className="flex w-full max-w-1xl items-center justify-between">
    <div className="flex flex-col items-center">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="w-5 h-5 text-sm font-medium" />
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-sm font-medium">Productos</h3>
        <p className="text-xs text-muted-foreground">Adiciona productos al pedido</p>
      </div>
    </div>
    <div className="flex-1 border-t border-primary" />
    <div className="flex flex-col items-center">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary-foreground">
        <span className="text-sm font-medium">2</span>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-sm font-medium">Información Cliente</h3>
        <p className="text-xs text-muted-foreground">Adiciona la información del cliente</p>
      </div>
    </div>
    <div className="flex-1 border-t border-primary" />
    <div className="flex flex-col items-center">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary-foreground">
        <span className="text-sm font-medium">3</span>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-sm font-medium">Confirmación</h3>
        <p className="text-xs text-muted-foreground">Confirma los datos del pedido</p>
      </div>
    </div>
    </div>
}
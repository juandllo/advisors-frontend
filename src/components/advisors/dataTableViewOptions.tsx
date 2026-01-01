import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
//import { useStore } from "@/helpers/ContextHandler"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { alertSuccessTimer, alertDialog } from "@/helpers/alertHandler"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {

  // const [updateIsRealoadingPlayers, sinchronizingPlayers, updateSinchronizingPlayers] = useStore(
  //   (state) => [state.updateIsRealoadingPlayers, state.sinchronizingPlayers, state.updateSinchronizingPlayers]
  // )

  const handleIsRealoading = (isReloading: boolean) => {
    //updateIsRealoadingPlayers(isReloading)
    alertDialog("Actualización de Asesores", "Estas seguro?")
      .then(result => {
        if (result.isConfirmed) {
          alertSuccessTimer("Se han actualizado los asesores.");
        }
      });
  }

  const extractColumnHeader = (column: any) => {
    return column.columnDef.header((column: any) => column).props.title ?? column.id
  }

  return (
    <>
      {/* <Button disabled={false ? true : false} onClick={() => handleSinchronizingData(true)} variant="default" size="sm" className="ml-auto hidden h-8 lg:flex mr-2">
        <UpdateIcon className={`mr-2 h-4 w-4 ${false ? 'animate-spin' : ''}`} />
        Sincronizar
      </Button> */}
      <Button onClick={() => handleIsRealoading(true)} variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex mr-2">
        <ReloadIcon className="mr-2 h-4 w-4" />
        Refrescar
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            Vista
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[250px]">
          <DropdownMenuLabel>Ocultar/Mostrar Columnas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {extractColumnHeader(column)}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

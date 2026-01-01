import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./dataTableViewOptions"
import { DataTableFacetedFilter } from "@/components/table/dataTableFacetedFilter"
import { statuses } from "@/config/statuses"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const getFilteredColumn = (event: any, table: any) => {
    return table.getColumn("_id")?.setFilterValue(event.target.value)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar Pedidos..."
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            getFilteredColumn(event, table)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estado"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <Cross2Icon className="mr-2 h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

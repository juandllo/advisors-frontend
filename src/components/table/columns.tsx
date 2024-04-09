import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './dataTableColumnHeader'
import { DataTableRowActions } from './dataTableRowActions'
import { TOrder } from '@/types/TOrder'
import { statuses } from '@/interfaces/statuses'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("_id")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Total" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("total")}
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "messenger",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mensajero" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("messenger")}
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Pedido" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("createdAt")}</span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span className={cn(
            "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
            status.textColor,
            status.bgColor,
            status.ringColor
          )}>
            {status.label}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "acciones",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

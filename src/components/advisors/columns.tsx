import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/dataTableColumnHeader'
import { DataTableRowActions } from './dataTableRowActions'
import { TUser } from '@/types/TUser'
import { userStatuses } from '@/config/userStatusses'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<TUser>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("name")} {row.original.lastName}
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {row.getValue("email")}
          </span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "cellphone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("cellphone")}</span>
        </div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dirección" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("address")}</span>
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
      const status = userStatuses.find(
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

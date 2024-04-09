import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { endpoints } from "@/config/endpoints"
import { getHttp } from "@/helpers/httpHelpers"
import { useUserStore } from "@/context/userContext"
import { TOrder } from "@/types/TOrder"
import { DataTable } from "@/components/table/dataTable"
import { columns } from "@/components/table/columns"

export default function Orders() {
  const [user] = useUserStore((state) => [state.user]);
  const [orders, setOrders] = useState<TOrder[]>();

  useEffect(() => {
    handleFetchOrders();
  }, [])

  const handleFetchOrders = async () => {
    getHttp(`${endpoints.orders}/user/${user._id}`)
      .then(res => {
        setOrders(res);
      });
  }

  return <>
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Pedidos</h1>
    </div>
    {orders &&
      <div className="hidden h-full flex-1 flex-col md:flex pt-10">
        <DataTable data={orders} columns={columns} />
      </div>
    }
    {/* {orders?.length < 0 &&
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No has generado pedidos este mes.
          </h3>
          <p className="text-sm text-muted-foreground">
            Las ventas generadas para cada periodo aparecerán en esta sección.
          </p>
          <Button className="mt-4">Generar Pedido</Button>
        </div>
      </div>
    } */}
  </>
}
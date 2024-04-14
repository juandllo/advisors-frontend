import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { endpoints } from "@/config/endpoints";
import { getHttp } from "@/helpers/httpHelpers";
import { useUserStore } from "@/context/userContext";
import { TOrder } from "@/types/TOrder";
import { DataTable } from "@/components/table/dataTable";
import { columns } from "@/components/orders/columns";

export default function Orders() {
  const [user] = useUserStore((state) => [state.user]);
  const [orders, setOrders] = useState<TOrder[]>();

  useEffect(() => {
    handleFetchOrders();
  }, []);

  const handleFetchOrders = async () => {
    getHttp(`${endpoints.orders}/user/${user._id}`)
      .then(res => {
        setOrders(res);
      });
  }

  return <>
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold md:text-2xl">Pedidos</h1>
      <Link to="/pedidos/nuevo">
        <Button>Generar Pedido</Button>
      </Link>
    </div>
    {orders &&
      <Card>
        <CardContent className="pt-5">
          <DataTable data={orders} columns={columns} />
        </CardContent>
      </Card>
    }
  </>
}
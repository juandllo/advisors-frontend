import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { endpoints } from "@/config/endpoints";
import { getHttp } from "@/helpers/httpHelpers";
import { TOrder } from "@/types/TOrder";
import { DataTable } from "@/components/table/dataTable";
import { columns } from "@/components/orders/columns";
import { useAuthStore } from "@/context/accountContext";

export default function Orders() {
  const [orders, setOrders] = useState<TOrder[]>();
  const [user] = useAuthStore(
    (state) => [state.user]
  );

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

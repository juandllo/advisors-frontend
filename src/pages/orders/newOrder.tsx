import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import Stepper from "@/components/stepper";

export function NewOrder() {
  return <>
    <div className="grid grid-cols-2">
      <div className="flex gap-4">
        <Link to="/pedidos">
          <Button variant="secondary" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Account</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold md:text-2xl">Nuevo Pedido</h1>
      </div>
      <Stepper/>
    </div>
    <div className="">
      <Outlet />
    </div>
  </>
}
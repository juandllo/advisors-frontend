import { Outlet } from "react-router-dom"
import Drawer from "@/components/drawer"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

export default function Layout() {
  return (
    <div className={cn("grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]", 'antialiased')}>
      <Drawer />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  )
}
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/context/accountContext';
import { env } from '@/config/env';
import {
  Bell,
  Home,
  HandCoins,
  LogOut,
  ShoppingCart,
  UserRound,
  Ticket,
  SquareUser,
  QrCode,
  MessageCircle
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from './themeToggle';

interface MenuItem {
  to: string
  label: string
  icon: React.ReactNode
  badge?: React.ReactNode
}

const items: MenuItem[] = [
  {
    to: "/inicio",
    label: "Inicio",
    icon: <Home className="h-6 w-6" />
  },
  {
    to: "/pedidos",
    label: "Pedidos",
    icon: <ShoppingCart className="h-6 w-6" />,
    badge: <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
      6
    </Badge>
  },
  {
    to: "/saldo",
    label: "Saldo",
    icon: <HandCoins className="h-6 w-6" />
  },
  {
    to: "/tickets",
    label: "Tickets",
    icon: <Ticket className="h-6 w-6" />
  }
]

export default function Drawer() {
  const navigate = useNavigate();
  const [user] = useAuthStore(
    (state) => [state.user]
  );

  const handleLogout = () => {
    localStorage.removeItem(env.AUTH_TOKEN_KEY);
    localStorage.removeItem(env.AUTH_USER_DATA);
    navigate('/inicio-sesion');
  }

  return <div className="hidden border-r md:block" >
    <div className="flex h-full max-h-screen flex-col gap-4">
      <div className="flex flex-col gap-5 items-center py-5 lg:px-6">
        <div className="flex flex-col items-center gap-2 font-semibold">
          <UserRound className="h-24 w-24 text-gray-300" />
          <div className="flex flex-col items-center">
            <span className="font-light text-muted-foreground">{user.name} {user.lastName}</span>
            <span className="font-extralight text-sm text-gray-400">{user.roles[0].roleName}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Link to="/cuenta">
            <Button variant="secondary" size="icon">
              <SquareUser className="h-4 w-4" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link to="/notificaciones">
            <Button variant="secondary" size="icon" className="relative inline-flex">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
              <Badge className="absolute flex items-center justify-center -top-2 -end-2 ml-auto h-6 w-6 shrink-0 rounded-full">
                10
              </Badge>
            </Button>
          </Link>
          <ThemeToggle></ThemeToggle>
          <Button variant="secondary" size="icon">
            <QrCode className="h-4 w-4" />
            <span className="sr-only">Qr Code</span>
          </Button>
          <Button variant="secondary" size="icon">
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only">WhatsApp Message</span>
          </Button>
          <Button onClick={handleLogout} variant="secondary" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
      <hr className="mx-6" />
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {items && items.map((item: MenuItem) => (
            <Link key={item.label}
              to={item.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              {item.icon}
              {item.label}
              {item.badge}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col items-center mt-auto p-4">
        <p className="font-light text-sm text-muted-foreground">
          Creado por <span className="font-semibold"><a href="https://github.com/juandllo" className="underline" target='_blank'>Juandllo</a></span> y <span className="font-semibold"><a href="https://github.com/Thheeo" className="underline" target='_blank'>Teo</a></span>
        </p>
        <p className="font-light text-xs text-muted-foreground">® Todos los derechos reservados.</p>
      </div>
    </div>
  </div >
}

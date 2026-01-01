import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/layout/layout';
import { 
  Dashboard,
  Notifications,
  Orders,
  Balance,
  Tickets,
  Account,
  Login,
  NewOrder,
  NewOrderProducts,
  Advisors,
  NewOrderClientInfo,
  NotFound,
  NewOrderSummary
} from '@/pages';

import { useAuth } from '@/hooks/auth'
import { useAuthStore } from '@/context/accountContext';

import { env } from '@/config/env';

import { ThemeProvider } from '@/theme/themeProvider';
import './App.css';

function App() {
  const { isLogged } = useAuth();
  const [user, setToken, setUser] = useAuthStore(
    (state) => [state.user, state.setToken, state.setUser]
  );

  useEffect(() => {
    if (localStorage.getItem(env.AUTH_TOKEN_KEY)) {
      const token = localStorage.getItem(env.AUTH_TOKEN_KEY);
      setToken(token);
      setUser(token);
    }
  }, []);

  const renderAdminRouter = () => {
    if (user.roles.length === 0) return '';
    if (user.roles[0].roleName !== env.ADMIN_ROLE) return '';
    if (!isLogged) return '';

    return <Route path='/' element=<Layout /> >
      <Route path='inicio' element=<Dashboard /> />
      <Route path='pedidos' element=<Orders /> />
      <Route path='notificaciones' element=<Notifications /> />
      <Route path='nuevo-pedido' element=<NewOrder /> >
        <Route path='productos' element=<NewOrderProducts /> />
        <Route path='info' element=<NewOrderClientInfo /> />
        <Route path='resumen' element=<NewOrderSummary /> />
      </Route>
      <Route path='saldo' element=<Balance /> />
      <Route path='tickets' element=<Tickets /> />
      <Route path='cuenta' element=<Account /> />
      <Route path='asesores' element=<Advisors /> />
    </Route>
  }

  // TODO se debe definir el enrutamiento para el advisor

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/inicio-sesion' element={<Login />} />
          <Route path='*' element={<NotFound />} />

          {/* ROUTING PARA EL ADMIN */}
          {renderAdminRouter()}
        </Routes>
      </BrowserRouter>
    </ThemeProvider >
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard'
import Notifications from '@/pages/notifications'
import Orders from '@/pages/orders'
import { ThemeProvider } from '@/theme/themeProvider'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout><Dashboard /></Layout>} />
          <Route path='/notificaciones' element={<Layout><Notifications /></Layout>} />
          <Route path='/pedidos' element={<Layout><Orders /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

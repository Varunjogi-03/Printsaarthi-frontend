import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Account from './pages/Account.jsx'
import Upload from './pages/Upload.jsx'
import Cart from './pages/Cart.jsx'
import Payment from './pages/Payment.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/account', element: <Account /> },
  { path: '/upload', element: <Upload /> },
  { path: '/cart', element: <Cart /> },
  { path: '/payment', element: <Payment /> },
  { path: '/order-success', element: <OrderSuccess /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

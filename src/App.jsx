import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx' 





function App() {
  return (
    <BrowserRouter >
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
   )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { checkAuth } from './features/authSlice'
import { useEffect } from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import Categories from './pages/dashboard/Categories'
import Products from './pages/dashboard/Products'
import Orders from './pages/dashboard/Orders'
import Users from './pages/dashboard/Users'
import Payment from './pages/dashboard/Payment'
import Profile from './pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  const dispatch = useAppDispatch();
  const { loading, initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(checkAuth()).unwrap().catch((error) => {
        console.log('Authentication check failed:', error);
      });
    }
  }, [dispatch, initialized]);

  if (!initialized || loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/categories' element={<Categories/>}/>
        <Route path='/dashboard/products' element={<Products/>}/>
        <Route path='/dashboard/orders' element={<Orders/>}/>
        <Route path='/dashboard/users' element={<Users/>}/>
        <Route path='/dashboard/payments' element={<Payment/>}/>
      </Route>
      
    </Routes>
  )
}

export default App

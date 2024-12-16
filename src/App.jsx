import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './page/HomePage'
import HomeAppPage from './page/HomeAppPage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import ProfilePage from './page/ProfilePage'
import GaleryPage from './page/GaleryPage'
import PageError404 from './page/PageError404'
import UnauthorizedPage from './page/UnauthorizedPage'
import PrivateRoute from './protected/PrivateRoute'
import { useEffect } from 'react'
import useStore from './context/UseStore'
import Dashboard from './page/Dashboard'
function App() {
    const { validateSession, isAuthenticated } = useStore();
   
    const validate=async()=>await validateSession();

    useEffect(() => {
      validate()
      console.log('app principal',isAuthenticated) // Valida la sesión al cargar la aplicación
    }, [validateSession]);
    
  return (
    <div className="flex flex-col min-h-screen">
    <BrowserRouter>
    <header className="bg-brand p-4">
    <Navbar/>
    </header>
    <main className="flex-grow justify-center ali p-4">

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='*' element={<PageError404/>}/>
      <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route element={<PrivateRoute allowedRoles={['user','admin']}/>}>
        <Route path='/home' element={<HomeAppPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/galery' element={<GaleryPage/>}/>
      </Route>
      <Route element={<PrivateRoute allowedRoles={['admin']}/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route >
      
      
    </Routes>
    </main>
   <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App

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

function App() {
  

  return (
    <div className="flex flex-col min-h-screen">
    <BrowserRouter>
    <header className="bg-brand p-4">
    <Navbar/>
    </header>
    <main className="flex-grow p-4">

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='*' element={<PageError404/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/home' element={<HomeAppPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/galery' element={<GaleryPage/>}/>
      
    </Routes>
    </main>
   <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App

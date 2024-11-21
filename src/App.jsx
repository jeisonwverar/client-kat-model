import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './page/HomePage'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <header className='w-auto'>
    <Navbar/>
    </header>
    <main className='h-screen m-4'>

    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </main>
   <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App

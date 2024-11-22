import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './page/HomePage'
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
    </Routes>
    </main>
   <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App

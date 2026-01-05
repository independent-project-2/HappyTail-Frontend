
import './App.css'
import Loading from './pages/loading'
import Navbar from './components/nav'
import Chatbot from './pages/chatbot'
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Loading/>}/>
        <Route path='/ask-me' element={<Chatbot/>}/>
      </Routes>
    
    </>
  )
}

export default App

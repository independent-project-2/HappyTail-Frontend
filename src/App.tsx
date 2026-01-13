
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Loading from './pages/loading'
import Navbar from './components/nav'
import Chatbot from './pages/chatbot'
import Blog from './pages/blog'

function App() {

  return (
    
      <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      </>
    
  )
}

export default App

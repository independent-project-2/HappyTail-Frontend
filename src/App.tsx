
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from './pages/loading'
import Navbar from './components/nav'
import Chatbot from './pages/chatbot'
import Blog from './pages/blog'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

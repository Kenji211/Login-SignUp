import Home from './components/Login-SignUp/Home'
import LoginRegister from './components/Login-SignUp/LoginRegister'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

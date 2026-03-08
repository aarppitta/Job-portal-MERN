import { Routes, Route } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Home from "./Home"

export function App() {
  return (
  
  <div>

     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
     </Routes>
  </div>
  )}

export default App

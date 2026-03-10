import { Routes, Route } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Home from "./Home"
import Jobs from "./Jobs"

export function App() {
  return (
  
  <div>

     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/jobs" element={<Jobs/>}/>
     </Routes>
  </div>
  )}

export default App

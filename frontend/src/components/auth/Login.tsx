import { Label } from "../ui/label"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Link } from "react-router"

const Login = () => {
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>

        <div className="my-2 mb-4">
          <Label>Email</Label>
          <Input 
          type="email"
          placeholder="john.doe@example.com"
          className="mt-3"
          />  
        </div>

        <div className="my-2 mb-4">
          <Label>Password</Label>
          <Input 
          type="password"
          placeholder="Enter your password"
          className="mt-3"
          />  
        </div>

    
        <Button type="submit" className="w-full my-4 h-12 !bg-[#6A38C2] !text-gray-100 cursor-pointer">Login</Button>
        <span>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login

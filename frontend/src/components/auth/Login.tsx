import { Label } from "../ui/label"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { RadioGroup } from "../ui/radio-group"
import api from "../../axios/api"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/authSlice"
import { Loader2 } from "lucide-react"


const Login = () => {

    interface InputState {
        email: string;
        password: string;
        role: string;
    }

    interface RootState {
        auth: {
            loading: boolean;
        };
    }

    const [input, setInput] = useState<InputState>({
        email: "",
        password: "",
        role: ""
    })

    const {loading} = useSelector((store: RootState)=>store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await api.post('users/login', input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

            if(res.data){
                navigate('/')
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
        }finally{
            dispatch(setLoading(false))

        }
    }
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-2xl mb-5 justify-center flex ">Login</h1>

        <div className="my-2 mb-4">
          <Label>Email</Label>
          <Input 
          type="email"
          placeholder="john.doe@example.com"
          className="mt-3"
          name="email"
          value={input.email}
          onChange={handleChange}
          />  
        </div>

        <div className="my-2 mb-4">
          <Label>Password</Label>
          <Input 
          type="password"
          placeholder="Enter your password"
          className="mt-3"
            name="password"
            value={input.password}
            onChange={handleChange}
          />  
        </div>
        <div className="flex items-center justify-between">
    <RadioGroup className="flex items-center gap-5 my-5">
      <div className="flex items-center gap-3">
        <Input
        type="radio"
        name="role"
        value="candidate"
        checked={input.role === "candidate"}
        onChange={handleChange}
        className="cursor-pointer"
        />
        <Label htmlFor="r1">Candidate</Label>
      </div>
      <div className="flex items-center gap-3">
        <Input
        type="radio"
        name="role"
        value="recruiter"
        className="cursor-pointer"
        checked={input.role === "recruiter"}
        onChange={handleChange}
        />
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
  </div>

    {
      loading ? <Button className="w-full my-4 h-12 !bg-[#6A38C2]"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>: 
        <Button type="submit" className="w-full my-4 h-12 !bg-[#6A38C2] !text-gray-100 cursor-pointer">Login</Button>

    }
        <span>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login

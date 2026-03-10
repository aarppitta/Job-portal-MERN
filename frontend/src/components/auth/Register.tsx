import { Label } from "../ui/label"
import Navbar from "../shared/Navbar"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../../axios/api"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/authSlice"
import { Loader2 } from "lucide-react"

const Register = () => {

  interface InputState {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  file?: File;
}

interface RootState {
        auth: {
            loading: boolean;
        };
    }

const [input, setInput] = useState<InputState>({
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  role: "",
  file: undefined
});

const {loading} = useSelector((store: RootState)=>store.auth)
const dispatch = useDispatch()
const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  });
};

const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput({
    ...input,
    file: e.target.files?.[0]
  });
};

const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", input.name);
  formData.append("email", input.email);
  formData.append("password", input.password);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("role", input.role);

  if(input.file){
    formData.append("file", input.file);
  }
  try{
    dispatch(setLoading(true))
    const response = await api.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }, withCredentials: true
    });

    if(response.data){
      toast.success("Registration successful! Please login.", response.data.message);
      navigate("/login");
    }

  }catch(error){
    console.error("Error during registration:", error);
  }finally{
    dispatch(setLoading(false))
  }
};

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-2xl mb-5 justify-center flex ">Register</h1>
          
        <div className="my-2 mb-4">
          <Label>Name</Label>
          <Input 
          type="text"
          placeholder="John Doe"
          className="mt-3"
          name="name"
          value={input.name}
          onChange={handleChange}
          />  
        </div>

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
          placeholder="*********"
          className="mt-3"
          name="password"
          value={input.password}
          onChange={handleChange}
          />  
        </div>

        <div className="my-2 mb-4">
          <Label>Phone Number</Label>
          <Input 
          type="text"
          placeholder="9876543210"
          className="mt-3"
          name="phoneNumber"
          value={input.phoneNumber}
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
    <div className="flex items-center gap-2">
    <Label>Profile</Label>
    <Input 
    type="file"
    className="cursor-pointer"
    accept="image/*"
    name="file"
    onChange={changeFileHandler}
    />
    </div>
        </div>
         {
      loading ? <Button className="w-full my-4 h-12 !bg-[#6A38C2]"> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>: 
        <Button type="submit" className="w-full my-4 h-12 !bg-[#6A38C2] !text-gray-100 cursor-pointer">Register</Button>

    }
        <span>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Register

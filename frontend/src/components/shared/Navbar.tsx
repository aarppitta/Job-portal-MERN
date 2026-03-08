import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { User2, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const user=false;
   
  return (


    <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
            <h1 className='text-2xl font-bold'>Job<span className='text-[#3B82F6]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
            </ul>
            {
                !user ? (
                    <div className='flex items-center gap-2 '>
                    <Link to="/login">
                    <Button variant="outline" className='cursor-pointer px-5 py-5'>Login</Button>
                    </Link>
                    <Link to="/register">
                    <Button variant="outline" className='cursor-pointer !bg-[#6A38C2] !text-gray-100 hover:!bg-[#5b30a6] px-5 py-5'>Register</Button>
                    </Link>
                    </div>
                ) :(
                    <Popover>
                <PopoverTrigger asChild>
                    <Avatar className='cursor-pointer'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"
                        className="grayscale"
                        />
                    </Avatar>
                </PopoverTrigger>
            <PopoverContent className='w-80'>
                <div>
                <div className='flex gap-4 space-y-2'>
                <Avatar className='cursor-pointer'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"
                        className="grayscale"
                        />
                    </Avatar>
                    <div>
                        <h4 className='font-medium'>MERN Stack</h4>
                        <p className='text-sm text-muted-foreground'>MERN Stack</p>
                    </div>
                    </div>

                    <div className='flex flex-col text-gray-600 mt-3 space-y-2'>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2/>
                    <Button variant="link">View Profile</Button>
                    </div>
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <LogOut/>
                    <Button variant="link">Log Out</Button>
                    </div>
                    </div>
              </div>      
            </PopoverContent>
            </Popover>
                )
            }
            
        </div>
        </div>
    </div>
  )
}

export default Navbar

import { Search } from "lucide-react"
import { Button } from "./ui/button"

const HeroSection = () => {
  return (
    <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
      <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#3B82F6] font-medium">Best Job Hunting Website</span>
      <h1 className="text-5xl font-bold">Search, Apply & <br/> Get your <span className="text-[#6a38c2]">Dream Job</span></h1>
      <p>This is the best job hunting website for all. Just search your role and recruiter will get back to you.</p>
    
    <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input type="text" placeholder="Find Your Dream Job!" className="outline-none border-none w-full h-10" />
        <Button className="rounded-r-full bg-[#6a38c2] h-10 w-13">
            <Search className="h-5 w-5 "/>
        </Button>
    </div>
    </div>
    </div>
  )
}

export default HeroSection

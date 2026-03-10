import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"

const Job = () => {
  return (
    <div className="p-6 rounded-md shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition">
        <div className="flex items-center justify-between">
        <p>2 days ago</p>
      <Button variant="outline" className="rounded-full" size="icon"><Bookmark/></Button>
        </div>
      
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
        <Avatar>
            <AvatarImage src="https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23026.jpg"/>
        </Avatar>
      </Button>

      <div>
        <h1>Company name</h1>
        <p>India</p>
      </div>
      </div>
      
    </div>
  )
}

export default Job

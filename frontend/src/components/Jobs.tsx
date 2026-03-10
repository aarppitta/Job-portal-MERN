import FilterCard from "./FilterCard"
import Job from "./Job"
import Navbar from "./shared/Navbar"

const jobArr = [1,2,3,4]

const Jobs = () => {
  return (
    <div>
      <Navbar/>

      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex gap-6">

          {/* Left Filter Section */}
          <div className="w-[20px]">
            <FilterCard/>
          </div>

          {/* Jobs Section */}
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">

            {jobArr.length <= 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobArr.map((item, index) => (
                  <Job key={index}/>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  )
}

export default Jobs
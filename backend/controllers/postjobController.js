import Job from "../models/Job.js";

//admin will post the job
export const postjob = async(req,res) =>{

    try{
        const {title,description,requirements,salary,experience,location,jobType,position,company} = req.body
        const userId = req.user.userId
        if(!title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !company){
            return res.status(400).json({message:"All fields are required"})
        }

        const newJob = await Job.create({
            title,
            description,
            requirements,
            salary,
            experience,
            location,
            jobType,
            position,
            company,
            created_by:userId
        })
        await newJob.save()
        res.status(201).json({message:"Job posted successfully", job:newJob})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getAllJobs = async(req,res) => {
    try{
        const keyword = req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword, $options:'i'}},
                {description:{$regex:keyword, $options:'i'}},
            ]
        }
        const jobs = await Job.find(query).populate('company', 'name').populate('created_by', 'name')
        res.status(200).json({jobs})

        if(!jobs){
            return res.status(404).json({message:"No jobs found"})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
//student can view job details
export const getJobById = async(req,res) => {
    try{
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate('company', 'name').populate('created_by', 'name')
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        res.status(200).json({job}) 
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

//how many jobs admin created
export const getAdminJobs = async(req,res) => {
    try {
        const adminId = req.user.userId
        const jobs = await Job.find({created_by:adminId}).populate('company', 'name')
        res.status(200).json({jobs})

        if(!jobs){
            return res.status(404).json({message:"No jobs found"})
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
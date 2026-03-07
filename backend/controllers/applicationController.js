import Application from "../models/Application.js";
import Job from "../models/Job.js";


export const applyJob = async(req,res) => {
    try {
        const userId = req.user.userId
        const jobId = req.params.id

        if(!jobId){
            return res.status(400).json({message:"Job ID is required"})
        }

        //if user has already applied for the job
        const existingApplication = await Application.findOne({applicant:userId, job:jobId})
        if(existingApplication){
            return res.status(400).json({message:"You have already applied for this job"})
        }

        //check if the job exists
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }

        //create a new application
        const application = await Application.create({
            applicant:userId,
            job:jobId
        })

        job.applications.push(application._id)
        await job.save()

        res.status(201).json({message:"Application submitted successfully", application})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//get applied jobs
export const getAppliedJobs = async (req, res) => {
  try {

    const applications = await Application.find({ applicant: req.user.userId })

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" })
    }

    res.status(200).json({ applications })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//admin will see how many students applied for the job and their details
export const getApplicants = async(req,res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({path:'applications', populate:{path:'applicant', select:'name email'}})
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        res.status(200).json({applicants:job.applications})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const updateApplicationStatus = async(req,res) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id

        if(!status || !['pending','accepted','rejected'].includes(status)){
            return res.status(400).json({message:"Invalid status"})
        }

        //find the application by applicant id 
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({message:"Application not found"})
        }

        application.status = status
        await application.save()

        res.status(200).json({message:"Application status updated successfully", application})


        application.status = status
        await application.save()

        res.status(200).json({message:"Application status updated successfully", application})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
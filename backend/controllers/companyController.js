import Company from '../models/Company.js'

// Create a new company
export const createCompany = async (req, res) => {
    try{
        const {name, userId} = req.body
        if(!name){
            return res.status(400).json({message:'Company Name is required'})
        }

        let company = await Company.findOne({name})
        if(company){
            return res.status(400).json({message:'Company already exists'})
        }

        const newCompany = await Company.create({name, userId})

        res.status(201).json({message:'Company created successfully', company: newCompany})

    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}

//get all companies

export const getAllCompanies = async (req, res) => {
    try{
        const userId = req.user.id //loggedin user ni company 
        const company = await Company.find()
        
        if(!company){
            return res.status(404).json({message:'No company found'})
        }

        return res.status(200).json({companies: company})

    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}

//get company by id

export const getCompanyById = async (req, res) => {
    try{
        const {id} = req.params
        const company = await Company.findById(id)
        
        if(!company){
            return res.status(404).json({message:'No company found'})
        }

        res.status(200).json({company})

    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}

//update company 

export const updateCompany = async (req, res) => {
    try{
        const {name, description, website, location} = req.body
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {new:true})

        if(!updatedCompany){
            return res.status(404).json({message:'No company found'})
        }

        res.status(200).json({message:'Company updated successfully', company: updatedCompany})

    }catch(error){
        res.status(500).json({message:'Server error'})
    }
}
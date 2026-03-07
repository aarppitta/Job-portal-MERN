import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res) => {
    try{
        const {name, email, phoneNumber, password, role} = req.body
        if(!name || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'Error Occured! Something is missing.!'
            })
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:'User already exists with this email'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        res.status(201).json({
            message:'User registered successfully',
            user: newUser
        })

    }catch(error){
        res.status(500).json({message:'server error'})
    }
}

//login
export const login = async (req,res) => {
    try{

        const {email,password, role} = req.body

        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Invalid password"
            })
        }

        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        return res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"Server error"
        })
    }
}

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber, bio, skills } = req.body;

    const updateData = {
      name,
      email,
      phoneNumber
    };

    if (bio) {
      updateData["profile.bio"] = bio;
    }

    if (skills) {
      updateData["profile.skills"] = skills.split(",").map(s => s.trim());
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.log(error); // very important for debugging
    res.status(500).json({
      message: "Server Error"
    });
  }
};

//logout

export const logout = async(req,res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return res.status(400).json({message:'Token not provided'})
        }

        // Invalidate the token (for simplicity, we just return a success message)
        res.status(200).json({message:'Logout successful'})
    }catch(error){
        res.status(500).json({message:'sever error'})
    }
}
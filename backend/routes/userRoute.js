import express from 'express'
import { register, login, updateProfile, logout } from '../controllers/userController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const router = express.Router()

// Register route
router.post('/register', register)

// Login route
router.post('/login', login)

//Update Profile
router.put('/:id',isAuthenticated, updateProfile)

// Logout route
router.post('/logout', logout)

export default router
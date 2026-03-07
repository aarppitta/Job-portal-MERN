import express from 'express'
import {createCompany, getAllCompanies, getCompanyById, updateCompany} from '../controllers/companyController.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'


const router = express.Router()

// Create a new company
router.post('/', isAuthenticated, createCompany)

// Get all companies
router.get('/', isAuthenticated, getAllCompanies)

// Get company by id
router.get('/:id', isAuthenticated, getCompanyById)

//update company
router.put('/:id', isAuthenticated, updateCompany)

export default router
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import companyRoutes from './routes/companyRoute.js';
import postjobRoutes from './routes/postjobRoute.js';
import applicationRoutes from './routes/applicationRoute.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
	origin: process.env.CLIENT_URL || 'http://localhost:5173',
	credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection

mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log('MongoDB connected');
}).catch((err) => {
	console.error('MongoDB connection error:', err);
});

// Example route
app.get('/', (req, res) => {
	res.send('API is running');
});

//all apis
app.use('/api/users', userRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/jobs', postjobRoutes)
app.use('/api/applications', applicationRoutes)
// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

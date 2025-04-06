require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// const router
const movieRoutes = require('./router/movie.routes');
const authRoutes = require('./router/auth.routes');
const chatRoutes = require("./router/chatbot.routes");
const userRoutes = require('./router/user.routes');
const historyRoutes = require('./router/historyfilm.routes');

// MidleWare
app.use(cors());
app.use(express.json());

// Sử dụng router 
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/historyfilm', historyRoutes);


// Sử dụng router Admin 
app.use('/api/admin',userRoutes);


// Run App
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));

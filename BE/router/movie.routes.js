const express = require('express');
const router = express.Router();
const filmController = require('../controllers/movie.controller');

// Định nghĩa các route liên quan đến phim
router.get('/latest', filmController.getLatestMovies);
router.get('/category/:type', filmController.getMoviesByCategory); 
router.get('/:slug', filmController.getMovieDetails); 


module.exports = router;

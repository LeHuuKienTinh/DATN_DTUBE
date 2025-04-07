const express = require('express');
const router = express.Router();
const filmController = require('../controllers/movie.controller');

// Lấy danh sách phim mới cập nhật
router.get('/latest', filmController.getLatestMovies);

// Lấy danh sách phim theo thể loại: phim-le, phim-bo
router.get('/category/:type', filmController.getMoviesByCategory);

// Lấy chi tiết phim theo slug
router.get('/:slug', filmController.getMovieDetails);

// Lấy trailer phim theo slug
router.get('/:slug/trailer', filmController.getMovieTrailer);

// Tìm kiếm phim theo từ khóa (?keyword=...)
router.get('/search/keyword', filmController.searchMovies);

module.exports = router;

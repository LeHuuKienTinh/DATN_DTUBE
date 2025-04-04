const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'https://phimapi.com';

// Lấy danh sách phim mới cập nhật
const getLatestMovies = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const response = await axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách phim' });
    }
};

// Lấy chi tiết phim theo slug
const getMovieDetails = async (req, res) => {
    try {
        const { slug } = req.params;
        const response = await axios.get(`${BASE_URL}/phim/${slug}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin phim' });
    }
};

// Lấy danh sách phim theo thể loại (phim lẻ, phim bộ)
const getMoviesByCategory = async (req, res) => {
    try {
        const { type } = req.params; // "phim-le" hoặc "phim-bo"
        const { page = 1 } = req.query;

        const response = await axios.get(`${BASE_URL}/v1/api/danh-sach/${type}?page=${page}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: `Lỗi khi lấy danh sách ${type}` });
    }
};

module.exports = {
    getLatestMovies,
    getMovieDetails,
    getMoviesByCategory
};

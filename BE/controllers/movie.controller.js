const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'https://phimapi.com';
const KINOCHECK_API_KEY = process.env.KINOCHECK_API_KEY || 'https://api.kinocheck.com/v1/search';
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
// Lấy trailer của phim theo slug
const getMovieTrailer = async (req, res) => {
    try {
        const { slug } = req.params;
        const phimRes = await axios.get(`${BASE_URL}/phim/${slug}`);
        const movie = phimRes.data?.movie;

        // Nếu API chính có trailer thì trả về
        if (movie && movie.trailer_url) {
            return res.json({ trailer: movie.trailer_url });
        }

        // Nếu không có trailer_url, tìm bằng Kinocheck
        const movieName = movie?.name || slug;
        const kinoRes = await axios.get(`${KINOCHECK_API}?query=${encodeURIComponent(movieName)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Api-Key': KINOCHECK_API_KEY,
                'X-Api-Host': 'api.kinocheck.com'
            }
        }); 

        const trailer = kinoRes.data?.trailers?.find(tr => tr.trailer && tr.trailer.url);
        if (trailer) {
            return res.json({ trailer: trailer.trailer.url });
        }

        // Nếu không tìm thấy trailer
        res.status(404).json({ error: 'Không tìm thấy trailer' });
    } catch (error) {
        console.error('Lỗi trailer:', error.message);
        res.status(500).json({ error: 'Lỗi khi lấy trailer phim' });
    }
};

module.exports = {
    getLatestMovies,
    getMovieDetails,
    getMoviesByCategory,
    getMovieTrailer
};

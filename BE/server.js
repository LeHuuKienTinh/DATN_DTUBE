const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = 'https://phimapi.com';

// API lấy danh sách phim mới
app.get('/api/movies/latest', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const response = await axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách phim' });
    }
});

// API lấy chi tiết phim
app.get('/api/movies/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const response = await axios.get(`${BASE_URL}/phim/${slug}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin phim' });
    }
});

// API lấy danh sách theo thể loại (phim lẻ, phim bộ)
app.get('/api/movies/category/:type', async (req, res) => {
    try {
        const { type } = req.params; // "phim-le" hoặc "phim-bo"
        const { page = 1 } = req.query; // Lấy tham số trang, mặc định là 1

        const response = await axios.get(`${BASE_URL}/v1/api/danh-sach/${type}?page=${page}`);
        console.log("Dữ liệu API trả về:", response.data); // Log dữ liệu để kiểm tra

        res.json(response.data);
    } catch (error) {
        console.error("Lỗi khi gọi API:", error.message);
        res.status(500).json({ error: `Lỗi khi lấy danh sách ${type}` });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));

import { useEffect, useState } from "react";
import axios from "axios";
import "./CardFilm.scss";

const CardFilm = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/movies/latest?page=1");
                console.log("Dữ liệu API:", res.data.items);

                const formattedData = res.data.items.map((movie, index) => ({
                    id: movie._id,
                    bg: movie.poster_url, // Lấy đúng URL ảnh
                    name: movie.name
                }));

                setCardData(formattedData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phim:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="slider" style={{ "--width": "215px", "--height": "300px", "--quantity": cardData.length }}>
            <div className="list">
                {cardData.map((card, index) => (
                    <div key={index} className="item" style={{ "--position": index + 1 }}>
                        <div className="card" style={{ backgroundImage: `url(${card.bg})`, }}>
                            <p className="film-title"><span>{card.name}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardFilm;

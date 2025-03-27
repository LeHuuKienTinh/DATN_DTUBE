import { useEffect, useState } from "react";
import axios from "axios";
import ModelFilm from "./ModelFilm"; // Import modal

import "./CardFilm.scss";

const CardFilm = () => {
    const [cardData, setCardData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/movies/latest?page=1");
                const formattedData = res.data.items.map((movie) => ({
                    id: movie._id,
                    bg: movie.poster_url,
                    name: movie.name,
                    slug: movie.slug,
                }));
                setCardData(formattedData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phim:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleShow = async (slug) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/movies/${slug}`);
            setSelectedMovie(res.data.movie);
            setShow(true);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết phim:", error);
        }
    };

    const handleClose = () => setShow(false);

    return (
        <div className="slider" style={{ "--width": "215px", "--height": "300px", "--quantity": cardData.length }}>
            <div className="list">
                {cardData.map((card, index) => (
                    <div key={index} className="item" style={{ "--position": index + 1 }} onClick={() => handleShow(card.slug)}>
                        <div className="card" style={{ backgroundImage: `url(${card.bg})` }}>
                            <p className="film-title"><span>{card.name}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gọi component ModalFilm */}
            <ModelFilm show={show} handleClose={handleClose} movie={selectedMovie} />
        </div>
    );
};

export default CardFilm;

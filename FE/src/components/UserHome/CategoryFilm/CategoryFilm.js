import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryFilm = () => {
    const { type } = useParams();
    const [movies, setMovies] = useState([]);

    const BASE_IMAGE_URL = "https://phimimg.com/"; // Hoặc domain ảnh của API

    const getFullImageUrl = (posterUrl) => {
        return posterUrl.startsWith("http") ? posterUrl : `${BASE_IMAGE_URL}${posterUrl}`;
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/category/${type}`);
                const data = await response.json();
                setMovies(data.data.items);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phim:", error);
            }
        };

        fetchMovies();
    }, [type]);

    return (
        <div>
            <h2>{type.replace("-", " ").toUpperCase()}</h2>
            <div className="movies-list">

                {console.log("Dsphim lẻ", movies)}
                {movies.map(movie => (
                    <div key={movie._id} className="movie-card">
                        <img src={getFullImageUrl(movie.poster_url)} alt={movie.name} />
                        <h3>{movie.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilm;

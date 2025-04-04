import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../service/axiosInstance";
import { useNavigate } from "react-router-dom";
import './Cardfilm.scss'

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axiosInstance.get("/api/movies/latest?page=1");
                const formattedData = res.data.items.map((movie) => ({
                    id: movie._id,
                    bg: movie.poster_url,
                    name: movie.name,
                    slug: movie.slug,
                }));
                setMovies(formattedData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phim:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleMovieClick = (movieName) => {
        navigate(`/trailer/${encodeURIComponent(movieName)}`);
    };

    useEffect(() => {
        const handleWheelScroll = (event) => {
            if (scrollRef.current) {
                event.preventDefault();
                scrollRef.current.scrollLeft += event.deltaY * 2;
            }
        };

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("wheel", handleWheelScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("wheel", handleWheelScroll);
            }
        };
    }, []);

    return (
        <div className="movie-list-container">
            <div className="movie-list" ref={scrollRef}>
                {movies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="movie-item"
                        onClick={() => handleMovieClick(movie.name)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={movie.bg} alt={movie.name} className="movie-poster" />
                        <p className="movie-name">{movie.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
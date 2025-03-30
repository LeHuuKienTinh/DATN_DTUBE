import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./WatchFilm.scss";
import React, { useState, useEffect } from "react";
import NavBarUserHome from "../../UserHome/NavBarUserHome/NavBarUserHome";
import FooterHomePage from "../FooterHomePage/FooterHomePage";

const WatchFilm = () => {
    const { movieSlug, episodeIndex } = useParams(); // Nhận thông tin từ URL
    const location = useLocation(); // Lấy state từ navigate()
    const navigate = useNavigate(); // Thay thế window.history.pushState()

    const [videoUrl, setVideoUrl] = useState("");
    const [movieName, setMovieName] = useState("");
    const [episodes, setEpisodes] = useState([]);
    const [currentEpisode, setCurrentEpisode] = useState(parseInt(episodeIndex) || 1); // Lưu tập đang xem

    useEffect(() => {
        if (location.state) {
            setVideoUrl(location.state.videoUrl);
            setMovieName(location.state.movieName);
            setEpisodes(location.state.episodes);
        }
    }, [location]);

    useEffect(() => {
        if (episodes.length > 0 && currentEpisode > 0 && currentEpisode <= episodes.length) {
            setVideoUrl(episodes[currentEpisode - 1].link_embed);
        }
    }, [currentEpisode, episodes]);

    const handleSelectEpisode = (epIndex) => {
        if (episodes.length > 0 && epIndex < episodes.length) {
            setCurrentEpisode(epIndex + 1);
            navigate(`/watch/${movieSlug}/${epIndex + 1}`, {
                state: {
                    videoUrl: episodes[epIndex].link_embed,
                    movieName,
                    episodes,
                },
            });
        }
    };

    return (
        <div className="film-background">
            <NavBarUserHome />
            <div className="main-film">
                <h1 className="movie-title">Xem phim {movieName} - Tập {currentEpisode}</h1>
                <div className="watch-page">
                    {videoUrl ? (
                        <iframe className="video-frame" src={videoUrl} allowFullScreen title="Video Player"></iframe>
                    ) : (
                        <p>Không tìm thấy tập phim!</p>
                    )}
                </div>
                <div className="select-ep">
                    <h4>Danh sách tập</h4>
                    <div className="list-ep">
                        {episodes.map((ep, index) => (
                            <button
                                key={index}
                                className={`btn ${index + 1 === currentEpisode ? "btn-danger" : "btn-secondary"}`}
                                onClick={() => handleSelectEpisode(index)}
                            >
                                Tập {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <FooterHomePage />
        </div>
    );
};

export default WatchFilm;

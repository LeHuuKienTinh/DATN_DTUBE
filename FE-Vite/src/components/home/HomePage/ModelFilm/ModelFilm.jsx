import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import './ModelFilm.scss'
import { FaRegCirclePlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
const ModalFilm = ({ show, handleClose, movie }) => {
    const [episodes, setEpisodes] = useState([]);

    const navigate = useNavigate();  // Hook để điều hướng

    const handleWatchNow = (epIndex) => {
        if (episodes.length > 0 && epIndex < episodes.length) {
            const movieSlug = movie.movie.slug
            navigate(`/watch/${movieSlug}/${epIndex + 1}`, {
                state: {
                    videoUrl: episodes[epIndex].link_embed,
                    movieName: movie.movie.name,
                    episodes: episodes
                }
            });
        } else {
            alert("Chưa có tập nào hoặc tập không tồn tại!");
        }
    };


    const getEmbedUrl = (url) => {
        if (!url.includes("youtube.com/watch?v=")) return url;
        return url.replace("watch?v=", "embed/") + "?autoplay=1&controls=0&mute=1&enablejsapi=1&playsinline=1&modestbranding=1&rel=0&showinfo=0&loop=1";
    };

    useEffect(() => {
        if (movie?.episodes[0]?.server_data) {
            setEpisodes(movie.episodes[0].server_data);
            console.log("list phim tập", movie.episodes[0].server_data)
        }
    }, [movie]);
    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            {/* <Modal.Header >
            </Modal.Header> */}
            <Modal.Body>
                {movie ? (
                    <>
                        <div className="main-film">
                            {movie.movie.trailer_url ? (
                                <iframe
                                    className="trailer-video"
                                    src={getEmbedUrl(movie.movie.trailer_url)}
                                    title={movie.movie.name}
                                    allowFullScreen
                                    allow="autoplay"
                                ></iframe>
                            ) : (
                                <img className="thum-img" src={movie.movie.thumb_url} alt={movie.movie.name} />
                            )}
                            <p className="title-film">{movie.movie.name}</p>
                        </div>
                        <div className="btn-play-film">
                            <button onClick={() => handleWatchNow(0)} className="btn"><span className="play-now">Xem ngay</span><span className="logo-play"><FaRegCirclePlay /></span></button>
                        </div>
                        <div className="infor-film">
                            <p className="type-film"><strong>Thể loại: </strong>
                                {movie.movie.type === "series" ? "Phim bộ"
                                    : movie.movie.type === "single" ? "Phim lẻ"
                                        : movie.movie.type === "hoathinh" ? "Hoạt hình"
                                            : "Không xác định"
                                }

                            </p>
                            {/* <p><strong>Thời lượng:</strong> {movie.duration} phút</p> */}
                            <p className="content-film">
                                <strong>Diễn viên:</strong> {movie.movie.actor ? movie.movie.actor.join(", ") : "Đang cập nhật"}
                            </p>
                            <p className="content-film"><strong>Nội dung:</strong> {movie.movie.content}</p>
                        </div>
                        <div className="episode-list">
                            <h2 className="title">Tập</h2>
                            <div className="episodes">
                                {episodes.map((ep, index) => (
                                    <a
                                        key={index}
                                        href={ep.link_embed}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`episode ${index === 0 ? "active" : ""}`}

                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleWatchNow(index); // Truyền tập phim vào
                                        }}
                                    >
                                        <span className="ep-number">{index + 1}</span>
                                        <div className="ep-info">
                                            <h4 className="ep-title">{ep.filename}</h4>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* {console.log(movie.movie)}
                        {console.log(movie.episodes)}
                        {console.log("data", movie.episodes[0].server_data)}
                        {console.log("data tập", episodes)} */}
                    </>
                ) : (
                    <p>Đang tải...</p>
                )}
            </Modal.Body>
            {/* <Modal.Footer>
            </Modal.Footer> */}
        </Modal>
    );
};

export default ModalFilm;

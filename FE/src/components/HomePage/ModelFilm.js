import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import './ModelFilm.scss'
import { FaRegCirclePlay } from "react-icons/fa6";
const ModalFilm = ({ show, handleClose, movie }) => {
    const getEmbedUrl = (url) => {
        if (!url.includes("youtube.com/watch?v=")) return url;
        return url.replace("watch?v=", "embed/") + "?autoplay=1&controls=0&mute=1&enablejsapi=1&playsinline=1&modestbranding=1&rel=0&showinfo=0&loop=1";
    };
    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            {/* <Modal.Header >
            </Modal.Header> */}
            <Modal.Body>
                {movie ? (
                    <>
                        <div className="main-film">
                            {movie.trailer_url ? (
                                <iframe
                                    className="trailer-video"
                                    src={getEmbedUrl(movie.trailer_url)}
                                    title={movie.name}
                                    allowFullScreen
                                    frameBorder="0"
                                    allow="autoplay"
                                ></iframe>
                            ) : (
                                <img className="thum-img" src={movie.thumb_url} alt={movie.name} />
                            )}
                            <p className="title-film">{movie.name}</p>
                        </div>
                        <div className="btn-play-film">
                            <button className="btn"><span className="play-now">Xem ngay</span><span className="logo-play"><FaRegCirclePlay /></span></button>
                        </div>
                        <div className="infor-film">
                            <p className="type-film"><strong>Thể loại: </strong>
                                {movie.type === "series" ? "Phim bộ"
                                    : movie.type === "single" ? "Phim lẻ"
                                        : movie.type === "hoathinh" ? "Hoạt hình"
                                            : "Không xác định"
                                }

                            </p>
                            {/* <p><strong>Thời lượng:</strong> {movie.duration} phút</p> */}
                            <p className="content-film">
                                <strong>Diễn viên:</strong> {movie.actor ? movie.actor.join(", ") : "Đang cập nhật"}
                            </p>
                            <p className="content-film"><strong>Nội dung:</strong> {movie.content}</p>

                        </div>
                        {console.log(movie)}
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

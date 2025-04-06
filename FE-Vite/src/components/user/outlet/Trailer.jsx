import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axiosInstance';
import Menu from '../../../view/user/Menu';
import './Trailler.scss';

const Trailer = () => {
  const { movieName } = useParams();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');

  // Hàm để chuyển đổi thời gian từ giây sang phút
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  useEffect(() => {
    axiosInstance.get(`/api/movies/${movieName}`)
      .then(response => {
        const data = response.data;
        if (data && data.movie) {
          setMovie(data.movie);
          setEpisodes(data.episodes?.[0]?.server_data || []);
          if (data.movie.trailer_url) {
            setTrailerUrl(data.movie.trailer_url);
          }
        }
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu phim:", error);
      })
      .finally(() => setLoading(false));
  }, [movieName]);

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="not-found-screen">
        <Menu />
        <p>Không tìm thấy thông tin phim.</p>
      </div>
    );
  }

  return (
    <div className="trailer-container">
      <Menu />

      {/* Banner */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${movie.poster_url})` }}
      >
        <div className="banner-content">
          {/* Trailer */}
          {trailerUrl && trailerUrl.includes('youtube.com') && (
            <div className="trailer-iframe">
              <iframe
                src={trailerUrl.replace("watch?v=", "embed/")}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <h1>{movie.name}</h1>
          <p>{movie.content}</p>
          <button>
            ▶ Tiếp tục xem
          </button>
        </div>
      </div>

      {/* Danh sách tập */}
      <div className="episode-list">
        <h2>Tập</h2>
        {episodes.length > 0 ? episodes.map((ep, index) => (
          <div key={index} className="episode-item">
            <img
              src={movie.thumb_url}
              alt={`${ep.name}`}
            />
            <div className="episode-info">
              <h3> {index + 1}: {ep.name}</h3>
              <p>{movie.origin_name} - {ep.name}</p>
              {ep.duration && (
                <p>Thời gian: {formatDuration(ep.duration)}</p>
              )}
              <a
                href={ep.link_embed}
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem
              </a>
            </div>
          </div>
        )) : (
          <p>Không có tập nào.</p>
        )}
      </div>
    </div>
  );
};

export default Trailer;

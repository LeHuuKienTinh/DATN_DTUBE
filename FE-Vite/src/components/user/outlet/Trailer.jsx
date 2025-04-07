import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../service/axiosInstance';
import Menu from '../../../view/user/Menu';
import './Trailler.scss';
import { useAuth } from '../../../contexts/AuthProvider'; 

const Trailer = () => {
  const { movieName } = useParams();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');
  const { user } = useAuth(); // Lấy thông tin user từ context

  // Hàm chuyển đổi thời gian từ giây sang phút
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  // Hàm xử lý khi xem tập phim
  const handleEpisodeWatch = async (e, episode) => {
    e.preventDefault();
    
    if (!user) {
      alert('Vui lòng đăng nhập để xem phim');
      return;
    }
  
    try {
      // Tạo timestamp hiện tại theo định dạng "YYYY-MM-DD HH:mm:ss"
      const now = new Date();
      const watchedAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
      // Gửi request với các trường theo mẫu API:
      // {
      //   "user_id": 1,
      //   "movie_slug": "avengers-endgame",
      //   "name": "Avengers: Endgame",
      //   "episode_name": "Tập 1: Cuộc chiến khốc liệt",
      //   "episode_slug": "tap-1-cuoc-chien-khoc-liet",
      //   "watched_at": "2025-04-07 10:30:00"
      // }
      const response = await axiosInstance.post('/api/historyfilm/history/', {
        user_id: user.id,
        movie_slug: movieName,
        name: movie.name,
        episode_name: episode.name,
        episode_slug: episode.slug || null,
        watched_at: watchedAt
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data && response.data.success) {
        console.log('Lưu lịch sử thành công:', response.data);
      } else {
        console.error('Lỗi từ server:', response.data.error);
      }
      // Sau khi lưu lịch sử (dù thành công hay không) mở link tập phim trong tab mới
      window.open(episode.link_embed, '_blank');
    } catch (error) {
      console.error('Lỗi khi lưu lịch sử xem phim:', error.response ? error.response.data : error.message);
      window.open(episode.link_embed, '_blank');
    }
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
              <h3>{index + 1}: {ep.name}</h3>
              <p>{movie.origin_name} - {ep.name}</p>
              {ep.duration && (
                <p>Thời gian: {formatDuration(ep.duration)}</p>
              )}
              <a
                href={ep.link_embed}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleEpisodeWatch(e, ep)}
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

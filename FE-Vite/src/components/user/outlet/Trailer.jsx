import React from 'react';
import { useParams } from 'react-router-dom';

const Trailer = () => {
    const { movieName } = useParams();
    
    return (
        <div className="trailer-container">
            <h1>Trailer của phim: {decodeURIComponent(movieName)}</h1>
            {/* Thêm nội dung trailer thực tế ở đây */}
        </div>
    );
};

export default Trailer;
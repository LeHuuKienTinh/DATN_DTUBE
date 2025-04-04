import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ adminOnly = false, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>căck</div>;

  // Nếu người dùng chưa đăng nhập, chuyển hướng về trang intro
  if (!user) return <Navigate to="/intro" replace />;

  // Nếu route yêu cầu admin, nhưng người dùng không phải admin, chuyển hướng về trang chủ
  if (adminOnly && user.type !== '1') return <Navigate to="/" replace />;

  // Nếu tất cả điều kiện hợp lệ, trả về children (component cần bảo vệ)
  return children;
};

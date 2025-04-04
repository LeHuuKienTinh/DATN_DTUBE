import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { ProtectedRoute } from './contexts/ProtectedRoute';
import Login from './view/Login';
import Admin from './view/admin/Admin';
import Register from './view/Register';
import Introduction from './view/introduction';
import Home from './view/user/Home';
import BothAuth from './view/BothAuth';
import Trailer from './components/user/outlet/Trailer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/intro" element={<Introduction />} />
          <Route element={<BothAuth />}>
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route 
            path="/"  
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Admin/>
              </ProtectedRoute>
            }
          />
          {/* Thêm route mới cho trailer */}
          <Route 
            path="/trailer/:movieName" 
            element={
              <ProtectedRoute>
                <Trailer/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Introduction />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
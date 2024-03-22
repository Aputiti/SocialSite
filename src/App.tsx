import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './views/Home';
import Info from './views/Info';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Layout from './views/Layout';
import Login from './views/Login';
import Register from './views/Register';
import Logout from './views/Logout';
import UploadProfilePicture from './views/UpdateProfilePicture';
import {UserProvider} from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import {UpdateProvider} from './contexts/UpdateContext';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <UpdateProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/comments" element={<Info  />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/upload-profile-picture"
                element={
                  <ProtectedRoute>
                    <UploadProfilePicture />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </UpdateProvider>
      </UserProvider>
    </Router>
  );
};

export default App;

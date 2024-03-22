/* eslint-disable react-hooks/exhaustive-deps */
import {useUserContext} from '../hooks/ContextHooks';
import {useNavigate} from 'react-router-dom';

const Profile = () => {
  const {user} = useUserContext();
  const navigate = useNavigate(); // Import useNavigate hook

  const handleUploadProfilePicture = () => {
    navigate('/upload-profile-picture');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-gray-600 font-semibold mb-4">Profile Information</h2>
      {user && (
        <div>
          <div className="flex items-center mb-4">
            <img
           className="mr-9 mt-0 h-20 w-20 rounded-full object-cover"
           src={'https://robohash.org/' + user.username + '?size=150x150'}
           alt={user.username}

            />
            <div>
              <p className="text-lg text-gray-600 font-semibold">{user.username}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">
                Created: {new Date(user.created_at).toLocaleString('fi-FI')}
              </p>
            </div>
          </div>
          <button
            className="m-3 w-1/3 rounded-md bg-slate-900 p-3 text-slate-50"
            onClick={handleUploadProfilePicture}
          >
            Upload Picture
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

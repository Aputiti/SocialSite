import React, { useEffect, useState } from 'react';
import { useMedia } from '../hooks/graphQLHooks';

interface UserProfilePictureProps {
  userId: string; // Assuming userId is the ID of the user whose profile picture is being displayed
  username: string;
}

const ProfilePicture: React.FC<UserProfilePictureProps> = ({ userId, username }) => {
  const { mediaArray } = useMedia();
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');

  useEffect(() => {
    // Filter mediaArray to find the user's profile picture)
    const userMedia = mediaArray.find(item => item.user_id === userId);
    if (userMedia) {
      setProfilePictureUrl(userMedia.filename); // Assuming 'filename' contains the URL of the profile picture
    }
  }, [mediaArray, userId]);

  return (
    <div className="flex items-center mb-4">
      <img
        className="mr-9 mt-0 h-20 w-20 rounded-full object-cover"
        src={profilePictureUrl}
        alt={username}
      />
      <div>
        <p className="text-lg text-gray-600 font-semibold">{username}</p>
      </div>
    </div>
  );
};

export default ProfilePicture;

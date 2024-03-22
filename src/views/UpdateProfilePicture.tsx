import React, {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile} from '../hooks/graphQLHooks';
import {useNavigate} from 'react-router-dom';

const UploadProfilePicture = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }

      const fileResult = await postFile(file, token);
      alert(fileResult.message);

      navigate('/profile');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h1 className="mb-5 flex justify-center text-5xl">
        <span role="img" aria-label="under-construction">
          🚧
        </span>{' '}
        Uploadig coming soon!{' '}
        <span role="img" aria-label="under-construction">
          🚧
        </span>
      </h1>
      <h2 className="mb-9 flex justify-center text-xl">
        you can preview your profile picture here
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <input
            className="m-3 w-2/3 rounded-md border p-3 text-slate-50"
            name="file"
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex w-4/5 justify-end">
          <img
            className="w-2/3 rounded-full  p-3 p-6 flex justify-center align-middle leading-none shadow-lg"
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://via.placeholder.com/200?text=Choose+image'
            }
            alt="preview"
            width="200"
          />
        </div>
        <div className="flex w-4/5 justify-end"></div>
      </form>
    </>
  );
};

export default UploadProfilePicture;

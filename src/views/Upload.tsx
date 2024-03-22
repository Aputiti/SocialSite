import {useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/graphQLHooks';
import {useNavigate} from 'react-router-dom';

// Upload.tsx
const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
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
      //  call postFile function 
      const fileResult = await postFile(file, token);
      //  call postMedia function
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult.message);
      //redirect to Home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );

  return (
    <>
      <h1 className="flex justify-center pb-9 text-8xl">Upload</h1>
      <form
        className="align-center flex-col justify-center "
        onSubmit={handleSubmit}
      >
        <div className=" flex	w-full items-center justify-center">

          <img
            className=" flex w-3/5 justify-center p-6 align-middle leading-none shadow-lg"
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://via.placeholder.com/200?text=Choose+image'
            }
            alt="preview"
            width="200"
          />
        </div>
        <div className="flex justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-full w-2/5 cursor-pointer flex-col items-center justify-center justify-center rounded-lg border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex w-3/6 flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*, video/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="title">
            Title
          </label>
          <input
            className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="description">
            Description
          </label>
          <textarea
            className="m-3 w-2/3  rounded-md border border-slate-500 p-3 text-slate-950"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="flex w-4/5 justify-end">
          <button
            className="m-3 w-1/3 rounded-md bg-slate-600 p-3 disabled:text-slate-600"
            type="submit"
            disabled={file && inputs.title.length > 3 ? false : true}
          >
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Upload;

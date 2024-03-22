import {NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import Comments from '../components/Comments';

const Info = () => {
  const {state} = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const item: MediaItemWithOwner = state;

  return (
    <>
      <div className="flex-column align-center w-full">
        {item.media_type.includes('video') ? (
          <video controls src={item.filename}></video>
        ) : (
          <img src={item.filename} alt={item.title} />
        )}
        <button
          className=" m-6 w-full rounded-md bg-slate-700 p-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          go back
        </button>
        <Comments item={item} />
      </div>
    </>
  );
};

export default Info;

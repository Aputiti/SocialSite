import {MediaItemWithOwner} from '../types/DBTypes';
import {useUpdateContext, useUserContext} from '../hooks/ContextHooks';
import {useMedia} from '../hooks/graphQLHooks';
import Likes from './Likes';
import Comment from './Comment';
import {Link} from 'react-router-dom';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useUpdateContext();

  const deleteHandler = async () => {
    const cnf = confirm('Are you sure you want to delete this media?');
    if (!cnf) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const result = await deleteMedia(item.media_id, token);
      alert(result.message);
      setUpdate(!update);
    } catch (e) {
      console.error('delete failed', (e as Error).message);
    }
  };

  return (
    <figure className="align-center mb-4 flex-col rounded-lg border border-slate-700 p-4 ">
      <div className="mb-2 flex items-center ">
        <img
          className="mr-9 mt-0 h-20 w-20 rounded-full object-cover"
          src={'https://robohash.org/' + item.owner.username + '?size=150x150'}
          alt={item.owner.username}
        />
        <h2 className="text-3xl font-bold">{item.owner.username}</h2>
      </div>
      <div className="align-center items-center">
        <img
          className="mb-4 h-full w-full rounded-lg object-cover p-20 align-middle leading-none shadow-lg"
          src={item.filename}
          alt={item.title}
        />

        <figcaption>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-gray-6 mb-6">
            {' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <Likes item={item} />
          <Comment item={item} />
          <div className="align-center flex justify-center">
            <Link
              className=" flex w-full justify-center rounded-md bg-slate-700 p-3"
              to="/comments"
              state={item}
            >
              View Comments
            </Link>
          </div>

          {user &&
            (user.user_id === item.user_id || user.level_name === 'Admin') && (
              <>
                <button
                  className="bg-slate-700 p-2 hover:bg-slate-950"
                  onClick={() => console.log('modify', item)}
                >
                  Modify
                </button>
                <button
                  className="bg-slate-800 p-2 hover:bg-slate-950"
                  onClick={deleteHandler}
                >
                  Delete
                </button>
              </>
            )}
        </figcaption>
      </div>
    </figure>
  );
};

export default MediaRow;

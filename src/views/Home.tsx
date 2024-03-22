import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/graphQLHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <figure>
        <figure >
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </figure>
      </figure>
    </>
  );
};

export default Home;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, fetchTweets } from '../../store/tweets';
import TweetBox from './TweetBox';

function Tweets () {
  const dispatch = useDispatch();
  const tweets = useSelector(state => Object.values(state.tweets.all));
  
  useEffect(() => {
    dispatch(fetchTweets());
    return () => dispatch(clearTweetErrors());
  }, [dispatch])

  if (tweets.length === 0) return <div>There are no Tweets</div>;
  
  return (
    <>
      <h2>All Tweets</h2>
      {tweets.map(tweet => (
        <TweetBox key={tweet._id} tweet={tweet} />
      ))}
    </>
  );
}

export default Tweets;
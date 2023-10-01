import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet } from '../../store/tweets';
import TweetBox from './TweetBox';
import './TweetCompose.css';

function TweetCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newTweet = useSelector(state => state.tweets.new);
  const errors = useSelector(state => state.errors.tweets);

  useEffect(() => {
    return () => dispatch(clearTweetErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeTweet({ text })); 
    setText('');
  };

  return (
    <>
      <form className="compose-tweet" onSubmit={handleSubmit}>
        <input 
          type="textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your tweet..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="tweet-preview">
        <h3>Tweet Preview</h3>
        {text ? <TweetBox tweet={{text, author}} /> : undefined}
      </div>
      <div className="previous-tweet">
        <h3>Previous Tweet</h3>
        {newTweet ? <TweetBox tweet={newTweet} /> : undefined}
      </div>
    </>
  )
}

export default TweetCompose;
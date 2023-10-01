import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_TWEETS = "tweets/RECEIVE_TWEETS";
const RECEIVE_USER_TWEETS = "tweets/RECEIVE_USER_TWEETS";
const RECEIVE_NEW_TWEET = "tweets/RECEIVE_NEW_TWEET";
const RECEIVE_TWEET_ERRORS = "tweets/RECEIVE_TWEET_ERRORS";
const CLEAR_TWEET_ERRORS = "tweets/CLEAR_TWEET_ERRORS";

const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

const receiveUserTweets = tweets => ({
  type: RECEIVE_USER_TWEETS,
  tweets
});

const receiveNewTweet = tweet => ({
  type: RECEIVE_NEW_TWEET,
  tweet
});

const receiveErrors = errors => ({
  type: RECEIVE_TWEET_ERRORS,
  errors
});

export const clearTweetErrors = errors => ({
    type: CLEAR_TWEET_ERRORS,
    errors
});

export const fetchTweets = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/tweets');
    const tweets = await res.json();
    dispatch(receiveTweets(tweets));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserTweets = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/tweets/user/${id}`);
    const tweets = await res.json();
    dispatch(receiveUserTweets(tweets));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composeTweet = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/tweets/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const tweet = await res.json();
    dispatch(receiveNewTweet(tweet));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const tweetErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_TWEET_ERRORS:
      return action.errors;
    case RECEIVE_NEW_TWEET:
    case CLEAR_TWEET_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const tweetsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return { ...state, all: action.tweets, new: undefined};
    case RECEIVE_USER_TWEETS:
      return { ...state, user: action.tweets, new: undefined};
    case RECEIVE_NEW_TWEET:
      return { ...state, new: action.tweet};
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default tweetsReducer;
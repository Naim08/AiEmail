import "./TweetBox.css"

function TweetBox ({ tweet: { text, author }}) {
  const { username } = author;
  return (
    <div className="tweet">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}

export default TweetBox;
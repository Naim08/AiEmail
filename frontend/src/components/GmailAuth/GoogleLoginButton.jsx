import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../../store/session";

function LoginButton(props) {
  const handleLogin = () => {
    props.history.push(`api/chatgpt/auth/google`);
  };

  return <button onClick={handleLogin}>Link Gmsaail</button>;
}

export default withRouter(LoginButton);

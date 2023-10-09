import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentUser } from "../../store/session";

function LoginButton(props) {
  const handleLogin = () => {
    props.history.push(`/auth/google`);
  };

  return <button onClick={handleLogin}>Link Gmail</button>;
}

export default withRouter(LoginButton);

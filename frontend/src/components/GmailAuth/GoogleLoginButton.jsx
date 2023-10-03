import { withRouter } from "react-router-dom";

function LoginButton(props) {
  const handleLogin = () => {
    props.history.push("/auth/google");
  };

  return <button onClick={handleLogin}>Link Gmail</button>;
}

export default withRouter(LoginButton);

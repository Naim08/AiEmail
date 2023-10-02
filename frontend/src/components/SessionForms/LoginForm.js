import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import { clearSessionErrors, login } from "../../store/session";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <div>
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>

        <div className="errors">{errors?.email}</div>
          <input type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
          />

        <div className="errors">{errors?.password}</div>
          <input type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />

        <input
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
      </form>
      <div>
        <span>Don't have an account?</span>
        <Link to={`/signup`}>Sign up</Link>
      </div>

    </div>
  )
}

export default LoginForm;

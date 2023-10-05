import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import { clearSessionErrors, login } from "../../store/session";
import './LoginForm.css';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  
  

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      history.push('/dashpage');
      }
  }, [currentUser, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (


    <div className="center-container">
      <div className="form-container">
      <form className="session-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

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
        <span style={{marginLeft: '75px'}}>Don't have an account? <Link to={`/signup`} className="signup-link">Sign up</Link></span>
      </div>
      </div>
    </div>
  )
}

export default LoginForm;

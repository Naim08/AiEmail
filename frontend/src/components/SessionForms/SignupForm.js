import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearSessionErrors, signup, login } from "../../store/session";
import "./SignupForm.css";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const errors = useSelector((state) => state.errors.session);
    const history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email,
            username,
            password,
        };

        await dispatch(signup(user));

        // Check if there are no errors and redirect
        // if (!errors) {
        //     history.push("/dashpage");
        // }
    };

    const loginDemo = (e) => {
        e.preventDefault();
        dispatch(login({ email: "demoyy@email.com", password: "password" }));
        history.push("/dashpage");
    };

    return (
        <>
            <div className="center-container">
                <div className="inner-container">
                    <form className="session-form" onSubmit={handleSubmit}>
                        <h2 style={{ marginBottom: "30px" }}>
                            Create your account
                        </h2>
                        <div className="signup-email">
                            <div className="errors">{errors?.email}</div>
                            <input
                                type="text"
                                value={email}
                                className="signup-email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                            />
                        </div>

                        <div>
                            <div className="errors">{errors?.username}</div>
                            <input
                                type="text"
                                className="signup-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                        <div className="signup-password1">
                            <div className="errors">{errors?.password}</div>
                            <input
                                type="password"
                                className="signup-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>

                        <div className="signup-password2">
                            <div className="errors">
                                {password !== password2 &&
                                    "Confirm Password field must match"}
                            </div>

                            <input
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder="Confirm Password"
                            />
                        </div>

                        <input
                            className="signup-btn"
                            type="submit"
                            value="Sign Up"
                            disabled={
                                !email || !password || password !== password2
                            }
                        />
                        <input
                            type="submit"
                            className="login-button"
                            value="Demo Log In"
                            onClick={loginDemo}
                        />
                    </form>
                    <div>
                        <span>
                            Already have an account?{" "}
                            <Link to={`/login`} className="login-link">
                                Log in
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupForm;

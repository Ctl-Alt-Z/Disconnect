import { useContext, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { logUserIn } from '../adapters/auth-adapter';
import CurrentUserContext from '../contexts/current-user-context';

import '../styles/login-page.css';

export default function LoginPage() {
	const navigate = useNavigate();
	const [errorText, setErrorText] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	// users shouldn't be able to see the login page if they are already logged in.
	// if the currentUser exists in the context, navigate the user to
	// the /users/:id page for that user, using the currentUser.id value
	if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;
	//
	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorText('');

		const [user, error] = await logUserIn({ username, password });
		if (error) return setErrorText(error.message);

		setCurrentUser(user);
		navigate(`/mainpage`);
	};

	return (
		<>
			<div className="parent">
				<div className="login-sheet">
					<h1 className="title">Login</h1>
					<form
						className="login-form"
						onSubmit={handleSubmit}
						aria-labelledby="login-heading"
					>
						{/* <h2 id="login-heading">Log back in!</h2> */}
						{/* <label htmlFor="username">Username</label> */}
						<input
							className="input"
							type="text"
							autoComplete="username"
							id="username"
							name="username"
							value={username}
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>

						{/* <label htmlFor="password">Password</label> */}
						<input
							className="input"
							type="password"
							autoComplete="current-password"
							id="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button className="login" type="submit">
							Log in!
						</button>
					</form>
					{!!errorText && <p>{errorText}</p>}
					<p className="signup-option">
						Don't have an account?{' '}
						<Link className="sign-link" to="/sign-up">
							Sign up here!
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

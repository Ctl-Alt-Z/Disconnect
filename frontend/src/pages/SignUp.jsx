import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import { registerUser } from '../adapters/auth-adapter';
import '../styles/signup-page.css';

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [errorText, setErrorText] = useState('');
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [password, setPassword] = useState('');
	const [passError, setPassError] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	// users shouldn't be able to see the sign up page if they are already logged in.
	// if the currentUser exists in the context, navigate the user to
	// the /users/:id page for that user, using the currentUser.id value
	if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorText('');
		if (!username || !password || !email || !first || !last) {
			return setErrorText(
				'Missing first name, last name, username, password, or email'
			);
		}
		if (usernameError || passError || emailError) {
			return setErrorText(
				'Please fix the errors in the form before submitting.'
			);
		}

		const [user, error] = await registerUser({
			first,
			last,
			username,
			email,
			password,
		});
		console.log(user, error);
		if (error) return setErrorText(error.message);

		setCurrentUser(user);

		navigate('/mainpage');
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'first') setFirst(value);
		if (name === 'last') setLast(value);
		if (name === 'username') {
			const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
			if (!usernameRegex.test(value)) {
				setUsernameError(
					'Username must be at least 3 characters long and can only contain letters, numbers, and underscores.'
				);
			} else {
				setUsernameError('');
			}
			setUsername(value);
		}

		if (name === 'password') {
			const passwordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if (!passwordRegex.test(value)) {
				setPassError(
					'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
				);
			} else {
				setPassError('');
			}
			setPassword(value);
		}

		if (name === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|edu|net|gov)$/i;
			if (!emailRegex.test(value)) {
				setEmailError('Invalid email format. Please enter a valid email.');
			} else {
				setEmailError('');
			}
			setEmail(value);
		}
	};

	// to prevent the from changing pages unless its completed
	// const [isFromComplete, setIsFormComplete] = useState(false);
	// const initialForm = useRef(true);

	// useEffect(() => {
	//   if (initialForm.current) {
	//     initialForm.current = false;
	//     return;
	//   }
	//   const formValues = Object.values(handleChange);
	//   const isFormFilled = formValues.every((value) => value !== "");
	//   setIsFormComplete(isFromComplete);
	// }, [handleChange]);

	return (
		<>
			<div className="parent">
				<div className="signup-sheet">
					<h1 className="title">Sign Up</h1>
					<form
						className="signup-form"
						onSubmit={handleSubmit}
						onChange={handleChange}
						aria-labelledby="create-heading"
					>
						{/* <h2 id="create-heading">Create New User</h2> */}
						{/* <label htmlFor="first">First Name</label> */}
						<input
							className="input"
							autoComplete="off"
							type="text"
							id="first"
							name="first"
							onChange={handleChange}
							value={first}
							placeholder="First Name"
							required
						/>
						{/* <label htmlFor="last">Last Name</label> */}
						<input
							autoComplete="off"
							type="text"
							id="last"
							name="last"
							onChange={handleChange}
							value={last}
							placeholder="Last Name"
							required
						/>

						{/* <label htmlFor="username">Username</label> */}
						<input
							autoComplete="off"
							type="text"
							id="username"
							name="username"
							onChange={handleChange}
							value={username}
							placeholder="Username"
							required
						/>
						{usernameError && <p className="error">{usernameError}</p>}

						{/* <label htmlFor="email">Email</label> */}
						<input
							autoComplete="off"
							type="email"
							id="email"
							name="email"
							onChange={handleChange}
							value={email}
							placeholder="Email"
							required
						/>

						{/* <label htmlFor="password">Password</label> */}
						{emailError && <p className="error">{emailError}</p>}
						<input
							autoComplete="off"
							type="password"
							id="password"
							name="password"
							onChange={handleChange}
							value={password}
							placeholder="Password"
							required
						/>
						{passError && <p className="error">{passError}</p>}
						{/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      */}

						<button className="register" type="submit">
							Sign Up Now!
						</button>
					</form>
					{!!errorText && <p className="error">{errorText}</p>}
					<p className="login-option">
						Already have an account with us?{' '}
						<Link className="log-link" to="/login">
							Log in!
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import TeamPage from './pages/team';
// import PreferencesPage from './pages/Preferences';
import MainPage from './pages/MainPage';
import PostPage from './pages/PostPage';
import { useNavigate } from 'react-router-dom';

export default function App() {
	const location = useLocation();
	const { setCurrentUser, setSeconds, seconds } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		const loadCurrentUser = async () => {
			// we aren't concerned about an error happening here
			const [data] = await checkForLoggedInUser();
			if (data) setCurrentUser(data);
		};
		loadCurrentUser();
	}, [setCurrentUser]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const timerValue = params.get('timer');
		if (timerValue) {
			setSeconds(parseInt(timerValue, 10));
		}

		const timer = setInterval(() => {
			if (seconds > 0) {
				setSeconds((prevSeconds) => {
					const updatedSeconds = prevSeconds - 1;

					// Update the URL with the remaining timer value
					const newParams = new URLSearchParams(location.search);
					newParams.set('timer', updatedSeconds);
					navigate(`${location.pathname}?${newParams.toString()}`, {
						replace: true,
					});

					return updatedSeconds;
				}); // console.log(seconds);
			} else {
				clearInterval(timer);
				setCurrentUser(null); //log out the user
				navigate('/'); //take user to the home page
				alert(`Your time is up for today! Now go and seize the day!`);
				// setDisableWebsite(true);
				// <SignOut true={true} />;
			}
		}, 1000);

		return () => clearInterval(timer); // Cleanup on unmount
	}, [seconds, setSeconds, setCurrentUser, navigate, location]);

	useEffect(() => {
		if (location.pathname === '/dashboard') {
			document.body.className = 'dashboard-body';
		} else {
			document.body.className = '';
		}
	}, [location]);

	return (
		<>
			<SiteHeadingAndNav />
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/users/:id" element={<UserPage />} />
					<Route path="*" element={<NotFoundPage />} />
					<Route path="/team" element={<TeamPage />} />
					<Route path="/dashboard" element={<MainPage />} />
					<Route path="/feed" element={<PostPage />} />
				</Routes>
			</main>
		</>
	);
}

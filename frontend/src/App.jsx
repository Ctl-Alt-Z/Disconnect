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
		const timer = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
				// console.log(seconds);
			} else {
				clearInterval(timer);
				setCurrentUser(null); //log out the user
				navigate('/'); //take user to the home page
				alert(
					`Hi that is all the time you have available for Disconnect Today! Please come back Tomorrow !`
				);
				// setDisableWebsite(true);
				// <SignOut true={true} />;
			}
		}, 1000);

		return () => clearInterval(timer); // Cleanup on unmount
	}, [seconds]);

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

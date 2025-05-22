import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import { getUser } from '../adapters/user-adapter';
import { logUserOut } from '../adapters/auth-adapter';
import UpdateUsernameForm from '../components/UpdateUsernameForm';
import AllUsersPost from '../components/UserPost';
import StatsChart from '../components/UserStats';
import Favs from '../components/favorites';
import '../styles/user-page.css';

export default function UserPage() {
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [userProfile, setUserProfile] = useState(null);
	const [error, setError] = useState(null);
	const { id } = useParams();
	const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

	useEffect(() => {
		const loadUser = async () => {
			const [user, error] = await getUser(id);
			if (error) return setError(error);
			setUserProfile(user);
		};

		loadUser();
	}, [id]);

	const handleLogout = async () => {
		logUserOut();
		setCurrentUser(null);
		navigate('/');
	};

	if (error)
		return (
			<p>Sorry, there was a problem loading user. Please try again later.</p>
		);

	if (!userProfile) return null;

	// When we update the username, the userProfile state won't change but the currentUser state will.
	const profileUsername = isCurrentUserProfile
		? currentUser.username
		: userProfile.username;

	return (
		<>
			<div className="page-div">
				<h1 id="user-username">{profileUsername}</h1>
				{/* <p>If the user had any data, here it would be</p>
			<p>Fake Bio or something</p> */}
				{isCurrentUserProfile ? (
					<>
						<UpdateUsernameForm
							currentUser={currentUser}
							setCurrentUser={setCurrentUser}
						/>
					</>
				) : (
					''
				)}
			</div>
			<div className="user-content">
				{/* User Posts Section */}
				<div id="user-posts">
					<h2 id="posts-title">Posts</h2>
					<AllUsersPost userId={id} />
				</div>

				{/* Favorites Section */}
				<div id="user-favorites">
					<h2 id="fav-title">Favorites</h2>
					<Favs userId={id} />
				</div>
			</div>

			<div className="userpage-buttons">
				<img
					width="40"
					height="40"
					src="https://img.icons8.com/wired/64/post-stamp.png"
					alt="post-stamp"
				/>
				<div className="button-userLogout">
					<button id="update-logout" onClick={handleLogout}>
						Log Out
					</button>
				</div>
				{/* <StatsChart userId={id} /> */}
				<img
					width="40"
					height="40"
					src="https://img.icons8.com/wired/64/flower.png"
					alt="flower"
				/>
			</div>
		</>
	);
}

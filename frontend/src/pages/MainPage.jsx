import { useState, useEffect } from 'react';
import Preferences from '../components/Preferences';
import { updateEntry, todaysEntry, getLog } from '../adapters/log-adapter';
import { useParams } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import GoalsForm from '../components/GoalForm';
import PostsModal from '../components/PostsModal';
import StatsChart from '../components/Stats';
import CountdownTimer from '../components/Timer';

export default function MainPage() {
	const [entry, setEntry] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState('');
	const [postsModal, setPostsModal] = useState(false);
	const [log, setLog] = useState(null); // we use this now to check if we need to show modal. null means no log.
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const { id } = useParams();

	console.log(currentUser);
	useEffect(() => {
		const checkStatus = async () => {
			try {
				const log = await getLog();
				setShowModal(Object.keys(log).length === 0 ? true : false);
				setLog(log);
				console.log('Get Log result:', log);
			} catch (error) {
				console.error('Failed to check log status:', error.message);
			}

			if (error) {
				return setError(error.message);
			}
		};
		checkStatus();
	}, []);

	useEffect(() => {
		const fetchEntry = async () => {
			const ent = await todaysEntry();
			setEntry(ent[0].entry);
		};
		fetchEntry();
	}, []);

	// handle changes for text box
	// Goal box #1
	const [textarea, setTextarea] = useState('');
	const handleChange = (event) => {
		setTextarea(event.target.value);
	};

	// journal entry box

	const handleEntryUpdate = async (e) => {
		e.preventDefault();
		const [ent, error] = await updateEntry({
			entry,
		});
		if (error) {
			return setError(error.message);
		}
		setEntry(ent.value);
		console.log('Entry updated successfully:', ent);
	};

	const handlePostOpen = () => {
		setPostsModal(true); // Open the modal when the button is clicked
	};
	const handlePostClose = () => {
		setPostsModal(false); // Close the modal when the button is clicked
	};

	const handleClose = () => {
		setShowModal(false); // Close the modal when the button is clicked
	};

	if (!currentUser) {
		return <p>Loading user data...</p>;
	}

	return (
		<>
			<div className="dashboard-iso">
				{showModal && <Preferences setLog={setLog} onClose={handleClose} />}
				{postsModal && <PostsModal onClose={handlePostClose} />}
				<div className="timer">
					<CountdownTimer />
				</div>
				<div className="mainpage-style">
					<GoalsForm log={log} />
					{/* end of goals/ start of journals */}
					<div>
						<br></br>
						<form className="journal-form" onSubmit={handleEntryUpdate}>
							<label id="entry-label">
								How are you feeling today{' '}
								<span
									style={{
										textDecoration: 'underline',
										color: 'var(--accent)',
									}}
								>
									{currentUser.username}
								</span>
								? :
							</label>
							<textarea
								id="entry-page"
								value={entry || ''}
								onChange={(e) => setEntry(e.target.value)}
								required
							></textarea>
							<button id="entry-update">Update</button>
						</form>
						{error && <p style={{ color: 'red' }}>{error}</p>}{' '}
						{/* Display error */}
					</div>
					<div className="right">
						<StatsChart />
					</div>
				</div>
				<div className="bottom-buttons">
					<a id="profile-button" href={`/users/${currentUser.id}`}>
						<img
							src="https://img.icons8.com/small/32/FFFFFF/user.png"
							alt="user"
						/>
					</a>
					<button id="post-button" onClick={handlePostOpen}>
						<img
							src="https://img.icons8.com/small/32/FFFFFF/ball-point-pen.png"
							alt="ball-point-pen"
						/>{' '}
					</button>
				</div>
				{/* <div className="hemisphere2"></div> */}
			</div>
		</>
	);

	// end tag
}

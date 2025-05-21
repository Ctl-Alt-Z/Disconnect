import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logScreentime } from '../adapters/log-adapter';
import { useContext } from 'react';
import UserContext from '../contexts/current-user-context';

export default function Preferences({ onClose, setLog }) {
	const { userId } = useContext(UserContext);
	const [error, setError] = useState('');
	const [screentime, setScreentime] = useState(0);

	const handleScreentimeLog = async (e) => {
		e.preventDefault();

		const [log, error] = await logScreentime({
			screentime,
		});
		if (error) {
			return setError(error.message);
		}
		console.log('Log created successfully:', log);
		setScreentime(0);
		setLog(log);
		onClose();
	};

	return (
		<>
			<div className="logmodal-div">
				<div className="logmodal-contents">
					<h1 id="logmodal-title">Your Daily Log!</h1>
					<p id="logp-element">
						Please follow the instructions below for your device:
					</p>
					<div className="instructions">
						<div id="android">
							<h2 id="android-title">Android</h2>
							<p id="logp-element">1. Navigate to Setting </p>
							<p id="logp-element">2. Digital Wellbeing & Parental Controls</p>
							<p id="logp-element">3. Dashboard</p>
						</div>

						<div id="iphone">
							<h2 id="iphone-title">Iphone</h2>
							<p id="logp-element">1. Navigate to Settings</p>
							<p id="logp-element">2. Screen Time</p>
						</div>
					</div>

					<div id="timeLog">
						<h1 id="logmodal-title">Daily Screen Time</h1>
						<form onSubmit={handleScreentimeLog} aria-labelledby="screentime">
							<label id="logp-element">
								Your screentime to the nearest hour :{' '}
							</label>
							<div className="input-section">
								<input
									id="st-input"
									type="number"
									max="24"
									required
									placeholder="Enter your screen time in hours"
									value={screentime}
									onChange={(e) => setScreentime(Number(e.target.value))}
								/>
								<button className="log-button">Log</button>
							</div>
						</form>
						<button onClick={onClose} aria-label="close">
							{' '}
							&times;{' '}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

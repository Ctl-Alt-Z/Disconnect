import { useState } from 'react';
import { createGoals } from '../adapters/goal-adapter';

export default function GoalsForm({ log }) {
	const [goalNum, setGoalNum] = useState(0);
	const [goalStr, setGoalStr] = useState('');
	const [errorText, setErrorText] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'goal') setGoalNum(value);
		if (name === 'description') setGoalStr(value);
	};

	const handleGoalSubmit = async (event) => {
		event.preventDefault();
		setErrorText('');

		if (!goalNum || !goalStr) {
			return setErrorText('Please enter a goal number and description.');
		}

		const newGoal = {
			goal_num: parseInt(goalNum),
			goal_string: goalStr,
			logs_id: log.id,
		};

		try {
			const [result, error] = await createGoals(newGoal);
			console.log(result);
			console.log('Goal created:', result);
			setGoalNum('');
			setGoalStr('');
		} catch (error) {
			console.error('Error submitting goal:', error);
			setErrorText('Something went wrong while submitting your goal.');
		}
	};

	return (
		<>
			<div className="goal-component">
				{/* <h1 className="goal-title">Create a New Goal</h1> */}
				<form onSubmit={handleGoalSubmit} aria-labelledby="goal-heading">
					<h2 id="goal-heading">What's your next screentime goal?</h2>
					<div className="input-div">
						<label id="goal-label" htmlFor="goal">
							Screentime (to the nearest hour) :
						</label>
						<input
							type="number"
							id="goalnum-input"
							name="goal"
							autoComplete="off"
							value={goalNum}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="gstring-div">
						<label id="string-input" htmlFor="description">
							{/* Goal Description: */}
						</label>
						<input
							type="text"
							id="description"
							name="description"
							autoComplete="off"
							placeholder="Your goal description..."
							value={goalStr}
							onChange={handleChange}
							required
						/>

						<button id="goal-submit" type="submit">
							Submit Goal
						</button>
					</div>
				</form>

				{!!errorText && <p style={{ color: 'red' }}>{errorText}</p>}
			</div>
		</>
	);
}

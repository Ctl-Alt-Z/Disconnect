import '../styles/home-page.css';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
	return (
		<>
			<div className="about">
				<NavLink to="/team" className="about-button">
					<p>Learn More</p>
				</NavLink>
			</div>
			<h1 className="company">Disconnect.</h1>

			<div className="text-box">
				<p id="home-text">
					Lets take the time to check-in and focus on ourselves we have
					acknowledged that you have been on your phone too much. You have taken
					the first step in improving your focus in coming here! Log your time,
					set some goals for your self and make a journal entry to inspire
					others if you like!
				</p>
			</div>
			<div className="hemisphere"></div>
		</>
	);
}

import '../styles/team-page.css';
import zae from '../assets/zae.png';
import avionte from '../assets/avionte.png';
import luis from '../assets/luis.png';
import taylor from '../assets/taylor.png';

export default function TeamPage() {
	return (
		<>
			<h1 className="about-title">The Team</h1>
			<div className="about-parent">
				<div className="border">
					<a
						href="https://www.linkedin.com/in/luis-g-abreu/"
						target="blank"
						rel="noopener noreferrer"
					>
						<img src={luis} alt="Luis Abreu" />
						<span className="name">Luis Abreu</span>
					</a>
				</div>
				<div className="border">
					<a
						href="https://www.linkedin.com/in/zae-correa/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={zae} alt="Jose Correa" />
						<span className="name">Jose Correa</span>
					</a>
				</div>
				<div className="border">
					<a
						href="https://www.linkedin.com/in/taylor-i-marshall/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={taylor} alt="Taylor Marshall" />
						<span className="name">Taylor Marshall</span>
					</a>
				</div>
				<div className="border">
					<a
						href="https://www.linkedin.com/in/avionte-williams/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={avionte} alt="Avionte Williams" />
						<span className="name">Avionte Williams</span>
					</a>
				</div>
			</div>
			<br></br>
			<p className="our-mission">
				message about what disconnect means to the team/ the intention of what
				we want to do with this app.
			</p>
		</>
	);
}

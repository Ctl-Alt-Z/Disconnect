import "../styles/home-page.css";
import { NavLink } from "react-router-dom";

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
          Designed to help you reclaim your time, this app tackles screen
          overuse by combining screen tracking, visual insights, personal
          reflection, and community support. You’ll get 30 minutes each day to
          engage with these tools — after that, you'll be logged out, letting
          you get back to your life
        </p>
      </div>
      <div className="hemisphere"></div>
    </>
  );
}

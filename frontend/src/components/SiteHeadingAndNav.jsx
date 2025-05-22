import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import "../styles/nav-styling.css";
import CountdownTimer from "../components/Timer";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  // console.log(currentUser);
  return (
    <header className="header">
      <div className="logo">
        <a href="/">
          <img id="D" width="40" height="40" src="../public/D.png" />
        </a>
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={`nav-menu-horizontal ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          {currentUser ? (
            <>
              <li>
                <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/feed" onClick={() => setMenuOpen(false)}>
                  Feed
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/users/${currentUser.id}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {currentUser.username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/team" onClick={() => setMenuOpen(false)}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-up" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

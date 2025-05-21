import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <a id="logo" href="/">
        DISCONNECT
      </a>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {currentUser ? (
            <>
              <li>
                {/* <NavLink to="/users" end={true}>
                  Users
                </NavLink> */}
              </li>
              <li>
                <NavLink to="/MainPage">Journal Entry</NavLink>
              </li>
              <li>
                <NavLink to="/feed">Community Posts</NavLink>
              </li>
              <li>
                <NavLink to={`/users/${currentUser.id}`}>
                  {/* {currentUser.username} */}
                  Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/team">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password || !email || !first || !last)
      return setErrorText(
        "Missing first name, last name, username, password, or email"
      );
    const [user, error] = await registerUser({
      username,
      first,
      last,
      email,
      password,
    });
    console.log(user, error);
    if (error) return setErrorText(error.message);

    setCurrentUser(user);

    navigate("/preferences");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
    if (name === "first") setFirst(value);
    if (name === "last") setLast(value);
  };

  // to prevent the from changing pages unless its completed
  // const [isFromComplete, setIsFormComplete] = useState(false);
  // const initialForm = useRef(true);

  // useEffect(() => {
  //   if (initialForm.current) {
  //     initialForm.current = false;
  //     return;
  //   }
  //   const formValues = Object.values(handleChange);
  //   const isFormFilled = formValues.every((value) => value !== "");
  //   setIsFormComplete(isFromComplete);
  // }, [handleChange]);

  return (
    <>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
      >
        <h2 id="create-heading">Create New User</h2>
        <label htmlFor="first">First Name</label>
        <input
          autoComplete="off"
          type="text"
          id="first"
          name="first"
          onChange={handleChange}
          value={first}
          required
        />
        <label htmlFor="username">Last Name</label>
        <input
          autoComplete="off"
          type="text"
          id="last"
          name="last"
          onChange={handleChange}
          value={last}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      */}

        <button type="submit">Sign Up Now!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <p>
        Already have an account with us? <Link to="/login">Log in!</Link>
      </p>
    </>
  );
}

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(3600); // 1 hour in seconds
  const [disableWebsite, setDisableWebsite] = useState(false);
  const [timer, setTimer] = useState();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);

  console.log(CurrentUserContext);
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        console.log(seconds);
      } else {
        clearInterval(timer);
        setCurrentUser(null); //log out the user
        navigate("/"); //take user to the home page
        alert(
          `Hi that is all the time you have available for Disconnect Today! Please come back Tomorrow !`
        );
        // setDisableWebsite(true);
        <SignOut true={true} />;
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [seconds, disableWebsite]);

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      <div>
        <h1>Timer</h1>
        <p>{formatTime(seconds)}</p>
      </div>
    </>
  );
}

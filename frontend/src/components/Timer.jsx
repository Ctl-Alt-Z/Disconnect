import { useState, useEffect } from "react";
import "../styles/timer.css";

export default function CountdownTimer() {
  //   const [hour, setHour] = useState(0);
  //   const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(3600);
  //
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timer);
        alert("Time's up!");
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [seconds]);
  //

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

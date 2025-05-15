import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logScreentime } from "../adapters/log-adapter";
import { useContext } from "react";
import UserContext from "../contexts/current-user-context";

export default function Preferences({ onClose, setLog }) {
  const { userId } = useContext(UserContext);
  const [error, setError] = useState("");
  const [screentime, setScreentime] = useState(0);

  const handleScreentimeLog = async (e) => {
    e.preventDefault();

    const [log, error] = await logScreentime({
      screentime,
    });
    if (error) {
      return setError(error.message);
    }
    console.log("Log created successfully:", log);
    setScreentime(0);
    setLog(log);
    onClose();
  };

  const modalStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    // backgroundColor: 'rgba(78, 78, 78, 0.5)',
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
  };

  const modalContentStyles = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "5px",
    width: "80%",
    maxWidth: "500px",
    textAlign: "center",
  };

  return (
    <>
      <div style={modalStyles}>
        <div style={modalContentStyles}>
          <div id="android">
            <h1>Screen Time Log</h1>
            <p>
              To log your screen time, please follow the instructions below:
            </p>
            <h2>Android Screen Time </h2>
            <p>1. Navigate to Setting </p>
            <p>2. Digital Wellbeing & Parental Controls</p>
            <p>3. Dashboard</p>
          </div>

          <div id="iphone">
            <h2>IPhone Screen Time</h2>
            <p>1. Navigate to Settings</p>
            <p>2. Screen Time</p>
          </div>

          <div id="timeLog">
            <h1>Daily Screen Time</h1>
            <form onSubmit={handleScreentimeLog} aria-labelledby="screentime">
              <label>Input your screen time for the day: </label>
              <br></br>
              <input
                type="number"
                max="24"
                required
                placeholder="Enter your screen time in hours"
                value={screentime}
                onChange={(e) => setScreentime(Number(e.target.value))}
              />
              <button>submit</button>
            </form>
            <button onClick={onClose} aria-label="close">
              {" "}
              &times;{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

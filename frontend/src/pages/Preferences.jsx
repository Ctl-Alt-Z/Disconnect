import { useState } from "react";
import { useNavigate } from "react-router-dom";

//
// const [logData, setLogData] = useState({
//   data: new Data().toISOString().slice(0, 10),
//   z,
// });
export default function PreferencesPage() {
  ///
  return (
    <>
      <div id="android">
        <h1>Android Screen Time </h1>
        <p>1. Navigate to Setting </p>
        <p>2. Digital Wellbeing & Parental Controls</p>
        <p>3. Dashboard</p>
      </div>

      <div id="iphone">
        <h1>IPhone Screen Time</h1>
        <p>1. Navigate to Settings</p>
        <p>2. Screen Time</p>
      </div>

      <div id="timeLog">
        <h1>Daily Screen Time</h1>
        <form>
          <label>Input your screen time for the day: </label>
          <br></br>
          <input type="number" max="24" />
          <button>submit</button>
        </form>
      </div>
      <div id="timer">
        <p> timer </p>
      </div>
    </>
  );
}

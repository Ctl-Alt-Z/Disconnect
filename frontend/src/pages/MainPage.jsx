import { use } from "react";
import { useState } from "react";
export default function MainPage() {
  // handle changes for text box
  // Goal box #1
  const [textarea, setTextarea] = useState("");
  const handleChange = (event) => {
    setTextarea(event.target.value);
  };
  // Goal box #2
  const [goalTwo, setGoalTwo] = useState("");
  const handleChangeTwo = (event) => {
    setGoalTwo(event.target.value);
  };
  // Goal box #3
  const [goalThree, setGoalThree] = useState("");
  const handleChangeThree = (event) => {
    setGoalThree(event.target.value);
  };
  // journal entry box
  const [journal, setJournal] = useState("");
  const journalEntry = (event) => {
    setJournal(event.target.value);
  };

  return (
    <>
      <div>
        <p> timer</p>
      </div>

      <form>
        <div>
          <label>Set Daily Goal :</label>
          <select value={textarea} onChange={handleChange}>
            <option>1 hr</option>
            <option>2 hrs</option>
            <option>3 hrs</option>
            <option>4 hrs</option>
            <option>5 hrs</option>
            <option>6 hrs</option>
            <option>7 hrs</option>
            <option>8 hrs</option>
            <option>9 hrs</option>
            <option>10 hrs</option>
            <option>11 hrs</option>
            <option>12 hrs</option>
          </select>
          <label>
            {" "}
            Goal expection:
            <input type="text" />
          </label>
          {/* <textarea
            value={textarea}
            onChange={handleChange}
            required
          ></textarea> */}
          <div>
            <label>GOAL 2:</label>
            <textarea value={goalTwo} onChange={handleChangeTwo}></textarea>
          </div>
          <div>
            <label>GOAL 3:</label>
            <textarea value={goalThree} onChange={handleChangeThree}></textarea>
          </div>
        </div>
        <button>post</button>
      </form>
      {/* end of goals/ start of journals */}
      <div>
        <br></br>
        <form>
          <label>Journal Entry:</label>
          <textarea value={journal} onChange={journalEntry} required></textarea>
          <button>post</button>
        </form>
      </div>

      <div>
        <p> stats</p>
      </div>
    </>
  );

  // end tag
}

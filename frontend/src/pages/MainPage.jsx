import { useState, useEffect } from "react";
import Preferences from "../components/Preferences";
import {
  updateEntry,
  todaysEntry,
  checkLogStatus,
} from "../adapters/log-adapter";
import GoalsForm from "../components/GoalForm";

export default function MainPage() {
  const [entry, setEntry] = useState("");
  const [showModal, setShowModal] = useState(false); // Default to true to show the modal initially
  const [error, setError] = useState("");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { logged } = await checkLogStatus();
        setShowModal(!logged);
        console.log("Log status:", logged);
      } catch (error) {
        console.error("Failed to check log status:", error.message);
      }

      if (error) {
        return setError(error.message);
      }
    };
    checkStatus();
  }, []);

  useEffect(() => {
    const fetchEntry = async () => {
      const ent = await todaysEntry();
      setEntry(ent[0].entry);
    };
    fetchEntry();
  }, []);

  // handle changes for text box
  // Goal box #1
  const [textarea, setTextarea] = useState("");
  const handleChange = (event) => {
    setTextarea(event.target.value);
  };
  // // Goal box #2
  // const [goalTwo, setGoalTwo] = useState("");
  // const handleChangeTwo = (event) => {
  //   setGoalTwo(event.target.value);
  // };
  // // Goal box #3
  // const [goalThree, setGoalThree] = useState("");
  // const handleChangeThree = (event) => {
  //   setGoalThree(event.target.value);
  // };
  // journal entry box

  const handleEntryUpdate = async (e) => {
    e.preventDefault();
    const [ent, error] = await updateEntry({
      entry,
    });
    if (error) {
      return setError(error.message);
    }
    setEntry(ent.value);
    console.log("Entry updated successfully:", ent);
  };

  // handle modal
  const handleClose = () => {
    setShowModal(false); // Close the modal when the button is clicked
  };

  return (
    <>
      {showModal && <Preferences onClose={handleClose} />}
      <GoalsForm />
      <div>
        <p> timer</p>
      </div>
      {/* end of goals/ start of journals */}
      <div>
        <br></br>
        <form onSubmit={handleEntryUpdate}>
          <label>Journal Entry:</label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            required
          ></textarea>
          <button>Update</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      </div>

      <div>
        <p> stats</p>
      </div>
    </>
  );

  // end tag
}

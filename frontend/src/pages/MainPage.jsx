import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import Preferences from "../components/Preferences";
import { updateEntry, todaysEntry, getLog } from "../adapters/log-adapter";
import GoalsForm from "../components/GoalForm";
import PostsModal from "../components/PostsModal";
import StatsChart from "../components/Stats";
import CountdownTimer from "../components/Timer";
export default function MainPage() {
  const [entry, setEntry] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [postsModal, setPostsModal] = useState(false);
  const [log, setLog] = useState(null); // we use this now to check if we need to show modal. null means no log.
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const log = await getLog();
        setShowModal(Object.keys(log).length === 0 ? true : false);
        setLog(log);
        console.log("Get Log result:", log);
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

  const handlePostOpen = () => {
    setPostsModal(true); // Open the modal when the button is clicked
  };
  const handlePostClose = () => {
    setPostsModal(false); // Close the modal when the button is clicked
  };

  const handleClose = () => {
    setShowModal(false); // Close the modal when the button is clicked
  };

  return (
    <>
      {showModal && <Preferences setLog={setLog} onClose={handleClose} />}
      {postsModal && <PostsModal onClose={handlePostClose} />}
      <GoalsForm log={log} />

      <div>
        <CountdownTimer />
      </div>
      {/* end of goals/ start of journals */}
      <div>
        <br></br>
        <form onSubmit={handleEntryUpdate}>
          <label>Journal Entry:</label>
          <textarea
            value={entry || ""}
            onChange={(e) => setEntry(e.target.value)}
            required
          ></textarea>
          <button>Update</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      </div>
      <button onClick={handlePostOpen}>Replace with Icon</button>
      <br></br>
      <div id="stats">
        <StatsChart />
      </div>
    </>
  );

  // end tag
}

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getGoals } from "../adapters/goal-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function StatsChart({ userId }) {
  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [goalData, setGoalData] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goals = await getGoals(userId); // must include joined screentime via logs
        setGoalData(goals);
        console.log(goals);
      } catch (err) {
        console.error("Failed to fetch goal data:", err);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div>
      <h1>Goal and Log Stats</h1>
      {goalData && goalData.length > 0 ? (
        goalData.map((entry, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Entry:</strong> {entry.entry}
            </p>
            <p>
              <strong>Screen Time:</strong> {entry.screentime} hours
            </p>
            <p>
              <strong>Goal:</strong> {entry.goal_num} hours
            </p>
            <p>
              <strong>Goal Description:</strong> {entry.goal_string}
            </p>
          </div>
        ))
      ) : (
        <p>Loading or no goal data available.</p>
      )}
    </div>
  );
}

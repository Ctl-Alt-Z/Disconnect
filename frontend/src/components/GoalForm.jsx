import { useState } from "react";
import { createGoals } from "../adapters/goal-adapter";

export default function GoalsForm() {
  const [goalNum, setGoalNum] = useState(0);
  const [goalStr, setGoalStr] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "goal") setGoalNum(value);
    if (name === "description") setGoalStr(value);
  };

  const handleGoalSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");

    if (!goalNum || !goalStr) {
      return setErrorText("Please enter a goal number and description.");
    }

    const newGoal = {
      goal_num: parseInt(goalNum),
      goal_string: goalStr,
      logs_id: 1, // TODO: Replace with dynamic ID as needed
    };

    try {
      const result = await createGoals(newGoal);
      console.log(newGoal);
      console.log("Goal created:", result);
      setGoalNum("");
      setGoalStr("");
    } catch (error) {
      console.error("Error submitting goal:", error);
      setErrorText("Something went wrong while submitting your goal.");
    }
  };

  return (
    <>
      <h1>Create a New Goal</h1>
      <form
        onSubmit={handleGoalSubmit}
        onChange={handleChange}
        aria-labelledby="goal-heading"
      >
        <h2 id="goal-heading">Set Your Goal</h2>

        <label htmlFor="goal">Hourly Goal</label>
        <input
          type="number"
          id="goal"
          name="goal"
          autoComplete="off"
          value={goalNum}
          required
        />

        <label htmlFor="description">Goal Description</label>
        <input
          type="text"
          id="description"
          name="description"
          autoComplete="off"
          value={goalStr}
          required
        />

        <button type="submit">Submit Goal</button>
      </form>

      {!!errorText && <p style={{ color: "red" }}>{errorText}</p>}
    </>
  );
}

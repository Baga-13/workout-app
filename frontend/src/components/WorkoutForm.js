import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    // to add new info to database
    const response = await fetch("/api/workouts", {
      // 3 required properties
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error); 
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;

import { React, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const UpdateModal = ({ workout, open, onClose }) => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleSubmit = async (e) => {
    const updatedWorkout = {
      title,
      load,
      reps,
      _id: workout._id,
    };

    // e.preventDefault();
    dispatch({ type: "EDIT_WORKOUT", payload: updatedWorkout });
    console.log(" initial wkout", workout);

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "PUT",
      body: JSON.stringify(updatedWorkout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log("updated successfully", json);
    }
  };
  if (!open) return null;

  return (
    <div className="updateModal">
      <div className="modalContainer">
        <p onClick={onClose} className="closeBtn">
          Close
        </p>
        <form className="update" onSubmit={handleSubmit}>
          <h3>Edit Workout</h3>

          <label>Exercise Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <label>Load(kg):</label>
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
          />

          <label>Reps:</label>
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;

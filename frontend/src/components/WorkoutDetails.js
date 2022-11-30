import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useState } from "react";

//date-fns//
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import UpdateModal from "./UpdateModal";

const WorkoutDetails = ({ workout }) => {
  const [openModal, setOpenModal] = useState(false);
  // const [current, setCurrent] = useState(workout);
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  // TODO: Create custom modal for updates//

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: (kg): </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>

      <button
        className="material-symbols-outlined"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Edit_square
      </button>

      <UpdateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        workout={workout}
      />
    </div>
  );
};

export default WorkoutDetails;

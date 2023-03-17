import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // connecting to the backend
      const response = await fetch("/api/workouts");

      // acessing the workout objects
      const json = await response.json();

      //   conditional rendering if the data is not gotten
      if (response.ok) {
        // json i.e the reesult of accessing the data
        dispatch({ type: "SET_WORKOUTS", payload: json });
        console.log(json);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

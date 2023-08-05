import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import workoutsService from '../../services/workouts.service';

export default function WorkoutDetails() {
  const { id } = useParams();
  const [workoutDetails, setWorkoutDetails] = useState(null);

  useEffect(() => {
    workoutsService.getWorkout(id)
      .then((res) => setWorkoutDetails(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  console.log('workout details:', workoutDetails);

  if (!workoutDetails) {
    return <div>Loading...</div>; // You can show a loading indicator here
  }

  const exercises = workoutDetails.workout.exercises;

  return (
    <>
      <div>
        <h1>Workout Details</h1>
      </div>
      <Link to={`/workouts/${id}/exercises/create`}>Create New Exercise</Link>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <h3>Exercise {index + 1}</h3>
          <p>Name: {exercise.name}</p>
          <p>Type: {exercise.type}</p>
          <p>Muscle: {exercise.muscle}</p>
          <p>Difficulty: {exercise.difficulty}</p>
        </div>
      ))}
    </>
  );
}

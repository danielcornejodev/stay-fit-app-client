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

  if (!workoutDetails) {
    return <div>Loading...</div>; // You can show a loading indicator here
  }

  const exercises = workoutDetails.workout.exercises;

  function formatDate(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${month}/${day}/${year}`;
  }


  return (
    <>
      <div>
        <h1>Workout Details</h1>
        <h2>{formatDate(workoutDetails.workout.date)}</h2>
      </div>
      
      <div className='controls'>
        <Link to={`/workouts/${id}/update`}>Change Workout Date</Link>
        <Link to={`/workouts/${id}/exercises/create`}>Create New Exercise</Link>
      </div>
      
      <div id='main-exercise-div'>
      {exercises.map((exercise, index) => (
        <div className='exercises-div' key={index}>
          <h3>Exercise {index + 1}</h3>
          <p>Name: {exercise.name}</p>
          <p>Type: {exercise.type}</p>
          <p>Muscle: {exercise.muscle}</p>
          <p>Difficulty: {exercise.difficulty}</p>
        </div> 
      ))}
      </div>


    </>
  );
}

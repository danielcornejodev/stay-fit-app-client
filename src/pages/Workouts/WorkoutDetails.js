import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import workoutsService from '../../services/workouts.service';
import exercisesService from '../../services/exercises.service';
import { AuthContext } from "../../context/auth.context"; 

export default function WorkoutDetails() {
  const { user } = useContext(AuthContext); 
  const { id } = useParams();
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const navigate = useNavigate();
  const userID = user._id;

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await workoutsService.getWorkout(id);
        setWorkoutDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkout();
  }, [id]);

  if (!workoutDetails) {
    return <div>Loading...</div>;
  }

  const exercises = workoutDetails.workout.exercises;

  function formatDate(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${month}/${day}/${year}`;
  }

  const removeWorkout = async () => {
    try {
      await workoutsService.deleteWorkout(id, userID);
      setWorkoutDetails(null);
      navigate(`/workouts`);
    } catch (error) {
      console.log(error);
    }
  };

  const removeExercise = async (_id) => {
    try {
      await exercisesService.deleteExercise(_id);
      setWorkoutDetails(prevWorkoutDetails => {
        const updatedExercises = prevWorkoutDetails.workout.exercises.filter(exercise => exercise._id !== _id);
        return {
          ...prevWorkoutDetails,
          workout: {
            ...prevWorkoutDetails.workout,
            exercises: updatedExercises
          }
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img 
        src='/assets/pexels-823sl-2294361.jpg'
        alt='Fitness Background'
        style={{ width: '100%', height: 'auto' }}
      />
      <div>
        <h1>Workout Details</h1>
        <h1>{formatDate(workoutDetails.workout.date)}</h1>
      </div>
      
      <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className='controls'>
        <Link className='workout-details-controls' style={{width: '213px'}} to={`/workouts/${id}/update`}>Edit Workout Date</Link>
        <button style={{marginBottom: '40px', width: '213px'}} className='workout-details-controls white-button ' onClick={removeWorkout}>Delete Workout</button>
        <Link className='workout-details-controls' style={{width: '213px'}} to={`/workouts/${id}/exercises/create`}>Create New Exercise</Link>
      </div>
      
      <div id='main-exercise-div'>
      {exercises.map((exercise, index) => (
        <div className='exercises-div' key={index}>
          <h3>Exercise {index + 1}</h3>
          <h4>Name:</h4><p> {exercise.name}</p>
          <h4>Equipment:</h4><p> {exercise.equipment}</p>
          <h4>Instructions:</h4><p> {exercise.instructions}</p>
          <h4>Sets:</h4><p> {exercise.sets}</p>
          <h4>Reps:</h4><p> {exercise.reps}</p>
          <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Link
              className='workout-details-controls'
              style={{width: '213px'}}
              to={`/workouts/${id}/exercises/${exercise._id}/update`}
              state={{ exercise }} // Pass exercise state for editing
            >
              Edit Exercise
            </Link>
            <button
              style={{width: '213px'}}
              className='workout-details-controls white-button'
              onClick={() => removeExercise(exercise._id)}
            >
              Delete Exercise
            </button>
          </div>
        </div> 
      ))}
      </div>
    </>
  );
}

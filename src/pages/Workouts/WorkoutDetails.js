import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import workoutsService from '../../services/workouts.service';
import exercisesService from '../../services/exercises.service';


export default function WorkoutDetails() {
  const { id } = useParams();
  const [workoutDetails, setWorkoutDetails] = useState(null);

  const navigate = useNavigate();

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

  const removeWorkout = () => {
    workoutsService.deleteWorkout(id)
    .then((res) => {
      setWorkoutDetails(null)
      navigate(`/workouts`);
    })
    .catch((error) => console.log(error));
  }


  // const removeExercise = (_id) => {
  //   exercisesService.deleteExercise(_id)
  //   .then((res) => {
  //     workoutsService.getWorkout(id)
  //       .then((res) => {
  //         setWorkoutDetails({
  //           ...workoutDetails,
  //           workout: {
  //             ...workoutDetails.workout,
  //             exercises: res.data.workout.exercises
  //           }
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   })
  //   .catch((error) => console.log(error));
  // }

  //instead of making second API call
  const removeExercise = (_id) => {
    exercisesService.deleteExercise(_id)
      .then(() => {
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
      })
      .catch((error) => console.log(error));
  }
  
  
  return (
    <>
      <div>
        <h1>Workout Details</h1>
        <h1>{formatDate(workoutDetails.workout.date)}</h1>
      </div>
      
      <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className='controls'>
        <Link className='workout-details-controls' to={`/workouts/${id}/update`}>Change Workout Date</Link>
        <button className='workout-details-controls white-button ' onClick={removeWorkout}>Delete Workout</button>
        <Link className='workout-details-controls' style={{width: '213px'}} to={`/workouts/${id}/exercises/create`}>Create New Exercise</Link>
      </div>
      
      <div id='main-exercise-div'>
      {exercises.map((exercise, index) => (
        <div className='exercises-div' key={index}>
        {console.log(exercise)}
          <h3>Exercise {index + 1}</h3>
          <h4>Name:</h4><p> {exercise.name}</p>
          <h4>Type:</h4><p> {exercise.type}</p>
          <h4>Muscle:</h4><p> {exercise.muscle}</p>
          <h4>Difficulty:</h4><p> {exercise.difficulty}</p>
          <h4>Equipment:</h4><p> {exercise.equipment}</p>
          <h4>Instructions:</h4><p> {exercise.instructions}</p>
          <h4>Reps:</h4><p> {exercise.reps}</p>
          <h4>Sets:</h4><p> {exercise.sets}</p>
          <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Link className='workout-details-controls' to={`/workouts/${id}/exercises/${exercise._id}/update`}>Edit Exercise</Link>
            <button className='workout-details-controls white-button' onClick={() => removeExercise(exercise._id)}>Delete Exercise</button>
          </div>

        </div> 
      ))}
      </div>


    </>
  );
}

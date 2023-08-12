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


  const removeExercise = (_id) => {
    exercisesService.deleteExercise(_id)
    .then((res) => {
      workoutsService.getWorkout(id)
        .then((res) => {
          setWorkoutDetails({
            ...workoutDetails,
            workout: {
              ...workoutDetails.workout,
              exercises: res.data.workout.exercises
            }
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
  }

  //instead of making second API call
  // const removeExercise = (_id) => {
  //   exercisesService.deleteExercise(_id)
  //     .then(() => {
  //       setWorkoutDetails(prevWorkoutDetails => {
  //         const updatedExercises = prevWorkoutDetails.workout.exercises.filter(exercise => exercise._id !== _id);
  
  //         return {
  //           ...prevWorkoutDetails,
  //           workout: {
  //             ...prevWorkoutDetails.workout,
  //             exercises: updatedExercises
  //           }
  //         };
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }
  
  
  return (
    <>
      <div>
        <h1>Workout Details</h1>
        <h2>{formatDate(workoutDetails.workout.date)}</h2>
      </div>
      
      <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className='controls'>
        <button style ={{width: '20vw'}} onClick={removeWorkout}>Delete Workout</button>
        <Link to={`/workouts/${id}/update`}>Change Workout Date</Link>
        <Link to={`/workouts/${id}/exercises/create`}>Create New Exercise</Link>
      </div>
      
      <div id='main-exercise-div'>
      {exercises.map((exercise, index) => (
        <div className='exercises-div' key={index}>
        {console.log(exercise)}
          <h3>Exercise {index + 1}</h3>
          <p>Name: {exercise.name}</p>
          <p>Type: {exercise.type}</p>
          <p>Muscle: {exercise.muscle}</p>
          <p>Difficulty: {exercise.difficulty}</p>
          <div style ={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Link to={`/workouts/${id}/exercises/${exercise._id}/update`}>Edit Exercise</Link>
            <button style ={{width: '20vw'}} onClick={() => removeExercise(exercise._id)}>Delete Exercise</button>
          </div>

        </div> 
      ))}
      </div>


    </>
  );
}

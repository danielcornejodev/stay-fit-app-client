import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams to get the workout id from the URL params

export default function WorkoutDetails() {

  const { id } = useParams(); 

  console.log(id)

    // Here, you can use the workout id to fetch the specific workout details using Axios or any other method
  // For example:
  // const [workoutDetails, setWorkoutDetails] = useState(null);

  // useEffect(() => {
  //   WorkoutsService.getWorkout()
  //     .then((res) => setWorkoutDetails(res.data))
  //     .catch((error) => console.log(error));
  // }, [id]);

  // console.log('workout details:', workoutDetails )

  return (
    <>
    <div>
      <h2>Workout Details</h2>
      <p>Workout ID: {id}</p>
    </div>
    <br />
    <Link to={`/workouts/${id}/exercises/create`}>Create Exercise</Link>
    </>
  )
}
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import workoutsService from '../services/workouts.service';

export default function AddWorkoutsPage() {
    const [workouts, setWorkouts] = useState();
    const [date, setDate] = useState();
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        workoutsService.getAllWorkouts()
          .then(res => {
            console.log({resp: res.data});
          })
          .catch((error) => console.log(error));

      }, [])

      const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { date, exercises };

        // Send the token through the request "Authorization" Headers
        workoutsService.createWorkout(requestBody)
          .then((response) => {
          // Reset the state
          setDate("");
          setExercises([]);
        })
          .catch((error) => console.log(error));
      };

  return (
    <div>Workouts</div>
  )
}

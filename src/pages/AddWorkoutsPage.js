import axios from 'axios';
import React, { useEffect, useState } from 'react';
import workoutsService from '../services/workouts.service';

export default function AddWorkoutsPage() {
    const [workout, setWorkout] = useState({
      date: '',
      exercises: [],
      apiExercises: [] //pass in id's from API/
    });

    useEffect(() => {
        workoutsService.getAllWorkouts()
          .then(res => {
            console.log({resp: res.data});
          })
          .catch((error) => console.log(error));

      }, [])

      const handleChange = (event) => {
        event.preventDefault();

        setWorkout({
          ...workout, 
          [event.target.name]: event.target.value
        })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { workout };

        // Send the token through the request "Authorization" Headers
        workoutsService.createWorkout(requestBody)
          .then((response) => {
          // Reset the state
            setWorkout({
              date: '',
              exercises: [],
              apiExercises: []
            })
          })
          .catch((error) => console.log(error));
      };

      return (
        <div id='workout-form-cnt'>
          <form id='workout-form' onSubmit={handleSubmit}>
            <label>Select Date: </label>
            <input 
              type="date"
              name="date"
              value={workout.date}
              onChange={handleChange}
            />
            <br />
            <button type="submit">Create Workout</button>
          </form>
        </div>
      )
}

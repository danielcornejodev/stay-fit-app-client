import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddWorkoutsPage() {
    const [workouts, setWorkouts] = useState();
    const [date, setDate] = useState();
    const [exercises, setExercises] = useState([])

    const API_URL = 'http://localhost:5005';
    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
      
        axios.get(
          `${API_URL}/workouts`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then(res => {
            console.log({resp: res.data});
          })
          .catch((error) => console.log(error));

      }, [])

      const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { date, exercises };
       
        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');
       
        // Send the token through the request "Authorization" Headers
        axios
          .post(
          `${API_URL}/workouts/create`,
          requestBody,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
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

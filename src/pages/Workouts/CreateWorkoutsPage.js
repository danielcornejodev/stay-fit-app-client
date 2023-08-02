import React, { useContext, useEffect, useState } from 'react';
import workoutsService from '../../services/workouts.service';
import WorkoutContext from '../../context/workouts.context';
import { Link } from "react-router-dom";

export default function CreateWorkoutsPage() {
    const [formData, setFormData] = useState({
      date: '',
      exercises: [],
      apiExercises: [] //pass in id's from API/
    });

    const { workouts, setWorkouts, handleWorkoutSubmit } = useContext(WorkoutContext);

    useEffect(() => {
        workoutsService.getAllWorkouts()
          .then(res => {
            setWorkouts(res.data.workouts)
          })
          .catch((error) => console.log(error));

      }, [])

      const handleChange = (event) => {
        event.preventDefault();
    
        setFormData({
          ...formData, 
          [event.target.name]: event.target.value
        })

        console.log(workouts);
      }

      const handleSubmit = (e) => {
        e.preventDefault();

        handleWorkoutSubmit(formData);

        setFormData({
          date: '',
          exercises: [],
          apiExercises: [] 
        })

      };

      return (
        <div id='workout-form-cnt'>
          <form id='workout-form' onSubmit={handleSubmit}>
            <label>Select Date: </label>
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <br />
            <Link to={'/workouts'}><button type="submit">Create Workout</button></Link>
          </form>
        </div>
      )
}

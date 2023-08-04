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

    const { handleWorkoutSubmit } = useContext(WorkoutContext);

      const handleChange = (event) => {

        setFormData({
          ...formData, 
          [event.target.name]: event.target.value
        }

        )
      }

      const handleSubmit = (e) => {
        e.preventDefault();

        handleWorkoutSubmit(formData)
        
          setFormData({
            date: '',
            exercises: [],
            apiExercises: [] 
          })
        ;


      };

      return (
        <div id='workout-form-cnt'>
        {/* {console.log(formData)} */}
          <form id='workout-form' onSubmit={handleSubmit}>
            <label>Select Date: </label>
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button type="submit">Create Workout</button>
          </form>
        </div>
      )
}

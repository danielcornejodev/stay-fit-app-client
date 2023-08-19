import React, { useContext, useState } from 'react';
import WorkoutContext from '../../context/workouts.context';
import { AuthContext } from "../../context/auth.context"; 

export default function CreateWorkoutsPage() {
    const [formData, setFormData] = useState({
      date: '',
      exercises: []
    });

    const { user } = useContext(AuthContext); 

    const { handleWorkoutSubmit } = useContext(WorkoutContext);

      const handleChange = (event) => {
        setFormData({
          ...formData, 
          [event.target.name]: event.target.value
        }

        )
      }

      const id = user._id;

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id)
        handleWorkoutSubmit(formData)
        
          setFormData({
            date: '',
            exercises: []
          })
        ;


      };

      return (

      <div id='main-create-workout-div'>
        <div style={{width: '100%'}}>
          <video 
          width="100%" 
          loop
          muted
          autoPlay
          preload='auto'
          src='/assets/pexels-yan-krukov-8480550 (1080p).mp4'
          type='video/mp4'
          >
          </video>
        </div>
        <div id='create-workout-div'>
          <h1>Create Workout</h1>
          <p>Select a date and create workout to begin adding exercises and planning your workout schedule.</p>
        </div>
        <div id='workout-form-cnt'>
          <form id='workout-form' onSubmit={handleSubmit}>
            <label>Select Date: </label>
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button className='login-signup-btn' type="submit">Create Workout</button>
          </form>
        </div>
        </div>
      )
}

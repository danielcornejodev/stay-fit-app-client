import React, { useContext, useState } from 'react';
import workoutsService from '../../services/workouts.service';
import {  useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth.context"; 

export default function UpdateWorkoutPage() {

    const { user } = useContext(AuthContext); 

    const [formData, setFormData] = useState({
      date: ''
    });

    const { id } = useParams(); 


      const handleChange = (event) => {
        setFormData({
          ...formData, 
          [event.target.name]: event.target.value
        }

        )
      }

      const navigate = useNavigate();
  
      const handleUpdateSubmit = (id, formData) => {
              workoutsService.updateWorkout(id, formData)
              .then((res) => {
                navigate(`/workouts/workout/${id}`);
              })
              .catch((err) => console.log({ err }));
      };



      const handleSubmit = (e) => {
        e.preventDefault();

        handleUpdateSubmit(id, formData);
        
        setFormData({
          date: ''
        });


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
            <h1>Update Workout</h1>
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
              <button className='login-signup-btn' type="submit">Update Workout</button>
            </form>
        </div>
        </div>
      )
}

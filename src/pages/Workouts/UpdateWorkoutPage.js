import React, {  useState } from 'react';
import workoutsService from '../../services/workouts.service';
import {  useParams, useNavigate } from 'react-router-dom'

export default function CreateWorkoutsPage() {
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
                navigate(`/workouts/${id}`);
              })
              .catch((err) => console.log({ err }));
      };



      const handleSubmit = (e) => {
        e.preventDefault();

        handleUpdateSubmit(id, formData);
        
            setFormData({
            date: '',
            exercises: [],
            apiExercises: [] 
        });


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
            <button type="submit">Update Workout</button>
          </form>
        </div>
      )
}

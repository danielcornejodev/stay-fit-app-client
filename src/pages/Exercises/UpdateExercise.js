import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import exercisesService from '../../services/exercises.service';
import axios from 'axios';

export default function UpdateExercise() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    muscle: '',
    equipment: '',
    difficulty: '',
    instructions: ''
  });

  const [exercises, setExercises] = useState([]);
  const [apiExercises, setAPIExercises] = useState([]);
  
  const { id } = useParams(); 
  const { exerciseID } = useParams();
	
  const navigate = useNavigate();

	const handleExerciseSubmit = () => {
    exercisesService.updateExercise(exerciseID, formData)
			.then((res) => {
				setExercises([...exercises, res.data.exercises]);
				navigate(`/workouts/${id}`);
			})
			.catch((err) => console.log({ err }));
	};

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };



  const handleAPICall = (e) => {
    e.preventDefault();
    axios.get('https://api.api-ninjas.com/v1/exercises', { 
      headers: { 'X-Api-Key': 'pappYG+c3P/9aeLGJR+dYw==wnzcbOdE6zF1qne5' },
      params: {
        type: formData.type,
        muscle: formData.muscle,
        difficulty: formData.difficulty
      }
    })
    .then((res) => {
      setAPIExercises([...apiExercises, res.data]);
    })
    .catch((err) => {
      console.log({ err });
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    handleExerciseSubmit(formData)
    
    setFormData({
      name: '',
      type: '',
      muscle: '',
      equipment: '',
      difficulty: '',
      instructions: ''
    })
  ;


  };



  return (
    <>
    <div className='outer-form-page-cnt'>
      <div className='form-page-cnt'>
        <h1>Update Exercise</h1>

        <form className='form' id='create-exercise-form' onSubmit={handleSubmit}>

          <div className='label-input-div'>
            <label htmlFor="type">Step 1:</label>
            <select name="type" id="type" form="create-exercise-form" value={formData.type} onChange={(e) => handleChange(e)}>
              <option value="">--Please choose a Type--</option>
              <option value="Cardio">Cardio</option>
              <option value="Olympic_Weightlifting">Olympic Weightlifting</option>
              <option value="Plyometrics">Plyometrics</option>
              <option value="Powerlifting">Powerlifting</option>
              <option value="Strength">Strength</option>
              <option value="Stretching">Stretching</option>
              <option value="Strongman">Strongman</option>
            </select>
          </div>

          <div className='label-input-div'>
            <label htmlFor="muscle">Step 2:</label>
            <select name="muscle" id="muscle" form="create-exercise-form" value={formData.muscle} onChange={(e) => handleChange(e)}>
              <option value="">--Please choose a Muscle Group--</option>
              <option value="Abdominals">Abdominals</option>
              <option value="Abductors">Abductors</option>
              <option value="Adductors">Adductors</option>
              <option value="Biceps">Biceps</option>
              <option value="Calves">Calves</option>
              <option value="Chest">Chest</option>
              <option value="Forearms">Forearms</option>
              <option value="Glutes">Glutes</option>
              <option value="Hamstrings">Hamstrings</option>
              <option value="Lats">Lats</option>
              <option value="Lower_Back">Lower Back</option>
              <option value="Middle_Back">Middle Back</option>
              <option value="Neck">Neck</option>
              <option value="Quadriceps">Quadriceps</option>
              <option value="Traps">Traps</option>
              <option value="Triceps">Triceps</option>
            </select>
          </div>

          <div className='label-input-div'>
            <label htmlFor="difficulty">Step 3:</label>
            <select name="difficulty" id="difficulty" form="create-exercise-form" value={formData.difficulty} onChange={(e) => handleChange(e)}>
              <option value="">--Please choose a Difficulty Level--</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className='label-input-div'>
            <label htmlFor="difficulty">Step 4:</label>
            <button id='suggest-btn' onClick={handleAPICall}>Suggest Exercises</button>
          </div>

          <div>
            <p>Not in suggestions? Click here to enter Exercise</p>
          </div>

          <div className='label-input-div'>
            <label htmlFor="name">Name:</label>
            <input 
              type="text"
              name="name"
              placeholder='Enter your own exercise (optional)'
              value={formData.name} 
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div> 
    </div>
    <div>
      <h1>Suggested Exercises</h1>
      {console.log(apiExercises)}
      {apiExercises.map((exerciseArray, i) => (
        <div id='main-suggested-cnt' key={i}>
          {exerciseArray.map((exercise, j) => (
            <div key={j}className='apiExercise-cnt'>
              <div className='inner-apiExercise-cnt'>
                <h3>Difficulty: </h3><p> {exercise.difficulty}</p>
              </div>
              <div className='inner-apiExercise-cnt'>
                <h3>Equipment: </h3><p> {exercise.equipment}</p>
              </div> 
              <div className='inner-apiExercise-cnt'>
                <h3>Instructions: </h3><p> {exercise.instructions}</p>
              </div>
              <div className='inner-apiExercise-cnt'>
                <h3>Muscle: </h3><p> {exercise.muscle}</p>
              </div>
              <div className='inner-apiExercise-cnt'>
                <h3>Name: </h3><p> {exercise.name}</p>
              </div>
              <div className='inner-apiExercise-cnt'>
                <h3>Type: </h3><p> {exercise.type}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

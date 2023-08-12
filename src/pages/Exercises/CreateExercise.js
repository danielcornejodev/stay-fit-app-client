import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import exercisesService from '../../services/exercises.service';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function CreateExercise() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    muscle: ''
  });

  const [exercises, setExercises] = useState([]);
  const [apiExercises, setAPIExercises] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState(null);

  
  const { id } = useParams(); 
	
  const navigate = useNavigate();

	const handleExerciseSubmit = (data) => {
    exercisesService.createExercise(id, data)
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

  // const handleExerciseSelection = () => {
  //   if (selectedExercise) {
  //     // If a suggested exercise is selected, create and submit it
  //     exercisesService.createExercise(id, selectedExercise)
  //       .then((res) => {
  //         setExercises([...exercises, res.data.exercise]);
  //         navigate(`/workouts/${id}`);
  //       })
  //       .catch((err) => console.log({ err }));
  //   } else {
  //     // If no suggested exercise is selected, submit the manually entered exercise
  //     handleSubmit();
  //   }
  // };

  const handleExerciseSelection = () => {
    if (selectedExercise) {
      const temporaryId = uuidv4(); // Generate a unique temporary ID
      const exerciseWithId = {
        ...selectedExercise,
        _id: temporaryId
      };
    
      handleExerciseSubmit(exerciseWithId);
      
    } else {
      handleExerciseSubmit(formData);
    }
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
  



  return (
    <>
    {selectedExercise ? (
      <>
    <div className='outer-form-page-cnt'>
      <div className='form-page-cnt'>
        <h1>Create Exercise</h1>

        <form className='form' id='create-exercise-form' >

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
              disabled={selectedExercise}
            />
          </div>

          <button onClick={handleExerciseSelection}>{selectedExercise ? "Submit Selected Exercise" : "Submit"}</button>
        </form>
      </div> 
    </div>
    <div>
      <h1>Selected Exercises</h1>

      <div>
        <p>{selectedExercise.name}</p>
      </div>
      </div>
    </>
    ) : (
    <>
    <div className='outer-form-page-cnt'>
      <div className='form-page-cnt'>
        <h1>Create Exercise</h1>

        <form className='form' id='create-exercise-form' >

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
              disabled={selectedExercise}
            />
          </div>

          <button type="submit" onClick={handleExerciseSelection}>{selectedExercise ? "Submit Selected Exercise" : "Submit"}</button>
        </form>
      </div> 
    </div>
    <div>
      <h1>Suggested Exercises</h1>
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
              <button onClick={() => setSelectedExercise(exercise)}>Select Exercise</button>
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
    )}
    </>
  )
}

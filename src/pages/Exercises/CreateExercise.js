import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import exercisesService from '../../services/exercises.service';

export default function CreateExercise() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    muscle: '',
    equipment: '',
    difficulty: '',
    instructions: ''
  });

  const [exercises, setExercises] = useState([]);

  const { id } = useParams(); 
	
  const navigate = useNavigate();

	const handleExerciseSubmit = () => {
    exercisesService.createExercise(id, formData)
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
        <h1>Create Exercise</h1>

        <form className='form' id='create-exercise-form' onSubmit={handleSubmit}>

          <div className='label-input-div'>
            <label htmlFor="type">Step 1:</label>
            <select name="type" id="type" form="create-exercise-form" value={formData.type} onChange={(e) => handleChange(e)}>
              <option value="">--Please choose a Type--</option>
              <option value="cardio">Cardio</option>
              <option value="olympic_weightlifting">Olympic Weightlifting</option>
              <option value="plyometrics">Plyometrics</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="strength">Strength</option>
              <option value="stretching">Stretching</option>
              <option value="strongman">Strongman</option>
            </select>
          </div>

          <div className='label-input-div'>
            <label htmlFor="muscle">Step 2:</label>
            <select name="muscle" id="muscle" form="create-exercise-form" value={formData.muscle} onChange={(e) => handleChange(e)}>
              <option value="">--Please choose a Muscle Group--</option>
              <option value="abdominals">Abdominals</option>
              <option value="abductors">Abductors</option>
              <option value="adductors">Adductors</option>
              <option value="biceps">Biceps</option>
              <option value="calves">Calves</option>
              <option value="chest">Chest</option>
              <option value="forearms">Forearms</option>
              <option value="glutes">Glutes</option>
              <option value="hamstrings">Hamstrings</option>
              <option value="lats">Lats</option>
              <option value="lower_back">Lower Back</option>
              <option value="middle_back">Middle Back</option>
              <option value="neck">Neck</option>
              <option value="quadriceps">Quadriceps</option>
              <option value="traps">Traps</option>
              <option value="triceps">Triceps</option>
            </select>
          </div>

          <div className='label-input-div'>
            <label htmlFor="difficulty">Step 3:</label>
            <select name="difficulty" id="difficulty" form="create-exercise-form" value={formData.difficulty} onChange={(e) => handleChange(e)}>
              <option value="">--Please choose a Difficulty Level--</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className='label-input-div'>
            <label htmlFor="difficulty">Step 4:</label>
            <button id='suggest-btn'>Suggest Exercises</button>
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
    </div>
    </>
  )
}

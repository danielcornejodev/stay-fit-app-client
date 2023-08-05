import React from 'react'

export default function CreateExercise() {

  


  return (
    <>
    <div className='outer-form-page-cnt'>
      <div className='form-page-cnt'>
        <h1>Create Exercise</h1>

        <form className='form' id='create-exercise-form'>

          <div className='label-input-div'>
            <label for="type">Type:</label>
            <select name="type" id="type" form="create-exercise-form">
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
            <label for="muscle">Muscle:</label>
            <select name="muscle" id="muscle" form="create-exercise-form">
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
            <label for="difficulty">Difficulty:</label>
            <select name="difficulty" id="difficulty" form="create-exercise-form">
              <option value="">--Please choose a Difficulty Level--</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
            <button id='suggest-btn'>Suggest Exercise</button>
          </div>
          <div className='label-input-div'>
            <label for="name">Name (optional):</label>
            <input 
              type="text"
              name="name"
              placeholder='Enter your own exercise (optional)'
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div> 
    </div>
    <div>
      <h1>Suggested Exercise </h1>
    </div>
    </>
  )
}

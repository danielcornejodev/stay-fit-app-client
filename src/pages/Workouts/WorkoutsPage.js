import React, { useContext, useEffect, useState } from 'react';
import WorkoutContext from '../../context/workouts.context';
import workoutsService from '../../services/workouts.service';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"; 

export default function WorkoutsPage() {

  const { user } = useContext(AuthContext); 

  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [loading, setLoading] = useState(true);

  const userID = user._id;

  useEffect(() => {
    console.log(userID);
    workoutsService.getAllWorkouts(userID)
      .then(res => {
        console.log(res.data)
        setWorkouts(res.data.theUser.workouts)
        setLoading(false);// Set loading to false once data is fetched
      })
      .catch((error) => console.log(error));
  }, [])

  function formatDate(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return `${month}/${day}/${year}`;
  }


  return (

    <div id='workout-cnt'>
      <div>
        <video 
        width="100%" 
        loop
        muted
        autoPlay
        preload='auto'
        src='/assets/girlcurling.mp4'
        type='video/mp4'
        >
        </video>
      </div>
      <h1>Workout Schedule</h1>
      {loading ? ( // Conditional rendering based on the loading state
        <div>Loading...</div>
      ) : (
        workouts.map((workout, i) => (
          <div key={i} className='workout-entry'>
            <Link to={`/workouts/workout/${workout._id}`} style={{textDecoration: 'none'}}>
              <div className='workout-div'>
                {formatDate(workout.date)}
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

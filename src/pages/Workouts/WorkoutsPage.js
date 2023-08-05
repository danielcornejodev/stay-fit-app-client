import React, { useContext, useEffect, useState } from 'react';
import WorkoutContext from '../../context/workouts.context';
import workoutsService from '../../services/workouts.service';
import { Link } from "react-router-dom";

export default function WorkoutsPage() {

  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workoutsService.getAllWorkouts()
      .then(res => {
        setWorkouts(res.data.workouts)
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
      <p>Workouts Schedule</p>
      {loading ? ( // Conditional rendering based on the loading state
        <div>Loading...</div>
      ) : (
        workouts.map((workout, i) => (
          <div key={i} className='workout-entry'>
            <Link to={`/workouts/${workout._id}`} style={{textDecoration: 'none'}}>
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

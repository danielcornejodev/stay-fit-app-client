import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Workouts() {
    const [workouts, setWorkouts] = useState();

    useEffect(() => {
        axios.get('http://localhost:5005/workouts').then(res => {
            console.log({resp: res.data});
        }).catch(err => console.log({err}));
    }, [])

  return (
    <div>Workouts</div>
  )
}

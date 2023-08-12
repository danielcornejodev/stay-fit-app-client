import { Routes, Route } from 'react-router-dom';
import './App.css';
import DrawerAppBar from './components/DrawerAppBar';
import HomePage from './pages/HomePage';
import CreateWorkoutsPage from './pages/Workouts/CreateWorkoutsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import WorkoutsPage from './pages/Workouts/WorkoutsPage';
import WorkoutDetails from './pages/Workouts/WorkoutDetails';
import CreateExercise from './pages/Exercises/CreateExercise';
import UpdateWorkoutPage from './pages/Workouts/UpdateWorkoutPage';
import UpdateExercise from './pages/Exercises/UpdateExercise';

import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

import { WorkoutProvider } from './context/workouts.context';


function App() {
  return (
    <div className="App">
      <DrawerAppBar />
      <WorkoutProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/workouts/create' element={<IsPrivate> <CreateWorkoutsPage /> </IsPrivate>} />
          <Route path='/workouts' element={<IsPrivate> <WorkoutsPage /> </IsPrivate>} />
          <Route path='/workouts/:id' element={<IsPrivate> <WorkoutDetails /> </IsPrivate>} />
          <Route path='/workouts/:id/update' element={<IsPrivate> <UpdateWorkoutPage /> </IsPrivate>} />
          <Route path='/workouts/:id/exercises/create' element={<IsPrivate> <CreateExercise /> </IsPrivate>} />
          <Route path='/workouts/:id/exercises/:exerciseID/update' element={<IsPrivate> <UpdateExercise /> </IsPrivate>} />

          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon> } />
          <Route path="/login" element={ <LoginPage /> } />
        </Routes>
      </WorkoutProvider>
    </div>
  );
}

export default App;

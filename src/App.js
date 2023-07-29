import { Routes, Route } from 'react-router-dom';
import './App.css';
import DrawerAppBar from './components/DrawerAppBar';
import HomePage from './pages/HomePage';
import AddWorkoutsPage from './pages/AddWorkoutsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
  return (
    <div className="App">
      <DrawerAppBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/workouts/create' element={<IsPrivate> <AddWorkoutsPage /> </IsPrivate>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
    </div>
  );
}

export default App;

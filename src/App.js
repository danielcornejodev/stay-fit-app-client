import { Routes, Route } from 'react-router-dom';
import './App.css';
import DrawerAppBar from './components/DrawerAppBar';
import HomePage from './components/HomePage';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <DrawerAppBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/workouts' element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;

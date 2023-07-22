import { Routes, Route } from 'react-router-dom';
import './App.css';
import DrawerAppBar from './components/DrawerAppBar';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <DrawerAppBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

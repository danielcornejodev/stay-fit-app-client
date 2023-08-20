import axios from 'axios';

class WorkoutsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/projects
  createWorkout = requestBody => {
    return this.api.post('/api/workouts', requestBody);
  };

  // GET /api/workouts
  getAllWorkouts = (userID) => {
    return this.api.get(`/api/workouts/${userID}`);
  };
 

  // GET a single workout
  getWorkout = id => {
    return this.api.get(`/api/workouts/workout/${id}`);
  };

  // PUT /api/workouts/:id
  updateWorkout = (id, requestBody) => {
    return this.api.put(`/api/workouts/${id}`, requestBody);
  };

  // DELETE /api/workouts/:id
  deleteWorkout = id => {
    return this.api.delete(`/api/workouts/${id}`);
  };
}

// Create one instance object
const workoutsService = new WorkoutsService();

export default workoutsService;

import axios from 'axios';

class ExercisesService {
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


  createExercise = (id, requestBody) => {
    return this.api.post(`/api/exercises/workouts/${id}/exercises/create`, requestBody);
  };

  // GET /api/exercises
  getAllExercises = (id) => {
    return this.api.get(`/api/exercises/workouts/${id}`);
  };

  // GET /api/exercises/:id
  getExercise = id => {
    return this.api.get(`/api/exercises/${id}`);
  };

  // PUT /api/exercises/:id
  updateExercise = (id, requestBody) => {
    return this.api.put(`/api/exercises/${id}`, requestBody);
  };

  // DELETE /api/exercises/:id
  deleteExercise = id => {
    return this.api.delete(`/api/exercises/${id}`);
  };
}

// Create one instance object
const exercisesService = new ExercisesService();

export default exercisesService;

import axios from 'axios';

class ExercisesService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005'
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // CREATE a new exercise for a workout
  async createExercise(workoutId, requestBody) {
    try {
      const res = await this.api.post(`/api/exercises/workouts/${workoutId}/exercises/create`, requestBody);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // GET all exercises
  async getAllExercises() {
    try {
      const res = await this.api.get('/api/exercises');
      return res;
    } catch (error) {
      throw error;
    }
  }

  // GET a single exercise
  async getExercise(id) {
    try {
      const res = await this.api.get(`/api/exercises/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // UPDATE an exercise
  async updateExercise(id, requestBody) {
    try {
      const res = await this.api.put(`/api/exercises/${id}`, requestBody);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // DELETE an exercise
  async deleteExercise(id) {
    try {
      const res = await this.api.delete(`/api/exercises/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const exercisesService = new ExercisesService();

export default exercisesService;

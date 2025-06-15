import axios from 'axios';

class WorkoutsService {
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

  // POST /api/workouts
  async createWorkout(requestBody) {
    try {
      const res = await this.api.post('/api/workouts', requestBody);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // GET /api/workouts
  async getAllWorkouts(userID) {
    try {
      const res = await this.api.get(`/api/workouts/${userID}`);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // GET a single workout
  async getWorkout(id) {
    try {
      const res = await this.api.get(`/api/workouts/workout/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // PUT /api/workouts/:id
  async updateWorkout(id, requestBody) {
    try {
      const res = await this.api.put(`/api/workouts/${id}`, requestBody);
      return res;
    } catch (error) {
      throw error;
    }
  }

  // DELETE /api/workouts/:id
  async deleteWorkout(id, userID) {
    try {
      const res = await this.api.delete(`/api/workouts/${id}/${userID}`);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const workoutsService = new WorkoutsService();

export default workoutsService;

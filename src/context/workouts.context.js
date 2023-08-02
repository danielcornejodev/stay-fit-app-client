import { createContext, useState } from "react";
import workoutsService from "../services/workouts.service";

const WorkoutContext = createContext();

// every context should have a provider. This is what provides the child elements with shared values which helps avoid prop drilling and unneeded state lifting.
export const WorkoutProvider = ({ children }) => {
	const [workouts, setWorkouts] = useState([]);

	const handleWorkoutSubmit = (formData) => {
			workoutsService.createWorkout(formData)
			.then((res) => {
				console.log({ create: res.data });
				setWorkouts([...workouts, res.data.workouts]);
			})
			.catch((err) => console.log({ err }));
	};

	// the value you pass in the provider is what will be available to the children components of this context.
	return (
		<WorkoutContext.Provider value={{ workouts, setWorkouts, handleWorkoutSubmit }}>
			{children}
		</WorkoutContext.Provider>
	);
};

export default WorkoutContext;

/**
 *  To Create Context
 *  1. Create a context.js file, add all necessay boilerplate code and the states
 *  2. Wrap your App with Context in App.js or Wrap your Routes with context in App.js
 * 3. Use useContext(contextName) method to get your values in any components you want
 */
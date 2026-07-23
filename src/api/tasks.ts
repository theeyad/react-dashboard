import axios from "axios";

const tasksUrl = "https://jsonplaceholder.typicode.com/todos";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const numberOfDashboardTasks = 11;
const numberOfAllTasks = 150;

export async function getDashboardTasks() {
    try {
        const response = await axios.get<Task[]>(tasksUrl + `?_limit=${numberOfDashboardTasks}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export async function getTasks() {
    try {
      const response = await axios.get<Task[]>(tasksUrl + `?_limit=${numberOfAllTasks}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
}
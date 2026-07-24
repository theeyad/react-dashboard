import axios from "axios";
import type { Task } from "@/consts/tasks";

const tasksUrl = "https://jsonplaceholder.typicode.com/todos";

const numberOfDashboardTasks = 11;
const numberOfAllTasks = 150;

// For Overview Page
export async function getDashboardTasks() {
    try {
        const response = await axios.get<Task[]>(tasksUrl + `?_limit=${numberOfDashboardTasks}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

// For Tasks Page
export async function getTasks() {
    try {
      const response = await axios.get<Task[]>(tasksUrl + `?_limit=${numberOfAllTasks}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
}

// Update task completion status
export async function toggleTaskStatus(taskId: number, completed: boolean) {
    try {
        const response = await axios.patch<Task>(`${tasksUrl}/${taskId}`, { completed });
        return response.data;
    } catch (error) {
        console.error(`Error toggling task ${taskId} status:`, error);
        throw error;
    }
}

// Update task data
export async function updateTaskData({
  taskId,
  taskData,
}: {
  taskId: number;
  taskData: { title: string; completed: boolean; responsible: string };
}) {
    try {
        const response = await axios.patch<Task>(`${tasksUrl}/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.error(`Error updating task ${taskId} data:`, error);
        throw error;
    }
}
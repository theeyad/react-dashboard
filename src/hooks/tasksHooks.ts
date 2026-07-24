import { useQuery, useMutation } from "@tanstack/react-query";

import { getTasks, toggleTaskStatus, updateTaskData } from "@/api/tasks";
import { queryKeys } from "@/lib/queryKeys";
import { queryClient } from "@/lib/queryClient";

import type { Task } from "@/consts/tasks";

export function useTasks() {
  const tasks = useQuery({
    queryKey: queryKeys.tasks,
    queryFn: getTasks,
  });
  return tasks;
}

// Optimistic Toggle for task completed status
export function useToggleTaskStatus() {
  const mutation = useMutation({
    mutationFn: async ({
      taskId,
      completed,
    }: {
      taskId: number;
      completed: boolean;
    }) => {
      return toggleTaskStatus(taskId, completed);
    },
    onMutate: async ({ taskId, completed }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.tasks });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(queryKeys.tasks);

      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(queryKeys.tasks, (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map((t) => (t.id === taskId ? { ...t, completed } : t));
      });

      // Updating the Overview page tasks table data too
      queryClient.setQueryData<Task[]>(queryKeys.dashboardTasks, (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map((t) => (t.id === taskId ? { ...t, completed } : t));
      });

      // Return context with snapshotted tasks for rollback
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.tasks, context.previousTasks);
      }
    },
    // The `onSettled` callback is intentionally omitted.
    // This is because the JSONPlaceholder API does not persist any change.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
    // },
  });

  return (taskId: number) => {
    const tasks = queryClient.getQueryData<Task[]>(queryKeys.tasks);
    const task = tasks?.find((t) => t.id === taskId);
    if (task) {
      mutation.mutate({ taskId, completed: !task.completed });
    }
  };
}

export function useUpdateTaskData() {
  const mutation = useMutation({
    mutationFn: async ({
      taskId,
      taskData,
    }: {
      taskId: number;
      taskData: { title: string; completed: boolean; responsible: string };
    }) => {
      return updateTaskData({ taskId, taskData });
    },
    onMutate: async ({ taskId, taskData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.tasks });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(queryKeys.tasks);

      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(queryKeys.tasks, (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map((t) => (t.id === taskId ? { ...t, ...taskData } : t));
      });

      // Updating the Overview page tasks table data too
      queryClient.setQueryData<Task[]>(queryKeys.dashboardTasks, (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map((t) => (t.id === taskId ? { ...t, ...taskData } : t));
      });

      // Return context with snapshotted tasks for rollback
      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.tasks, context.previousTasks);
      }
    },
    // The `onSettled` callback is intentionally omitted.
    // This is because the JSONPlaceholder API does not persist any change.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
    // },
  });

  return (
    taskId: number,
    taskData: { title: string; completed: boolean; responsible: string }
  ) => {
    mutation.mutate({ taskId, taskData });
  };
}
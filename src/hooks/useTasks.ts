import { useQuery } from "@tanstack/react-query";

import { getTasks } from "@/api/tasks";
import { queryKeys } from "@/lib/queryKeys";

export function useTasks() {
    const tasks = useQuery({
        queryKey: queryKeys.tasks,
        queryFn: getTasks,
    });
    return tasks;
}

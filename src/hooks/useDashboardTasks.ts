import { useQuery } from "@tanstack/react-query";

import { getDashboardTasks } from "@/api/tasks";
import { queryKeys } from "@/lib/queryKeys";

export function useDashboardTasks() {
  const tasks = useQuery({
    queryKey: queryKeys.dashboardTasks,
    queryFn: getDashboardTasks,
  });
  return  tasks;
}

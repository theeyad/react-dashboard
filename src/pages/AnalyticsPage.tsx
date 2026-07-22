import ActivityLineChart from "@/components/charts/ActivityLineChart";
import AnalyticsAreaChart from "@/components/charts/AnalyticsAreaChart";
import TasksBarChart from "@/components/charts/TasksBarChart";
import TodosPieChart from "@/components/charts/TodosPieChart";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function AnalyticsPage() {
  const documentTitle = useDocumentTitle()
  return (
    <>
      <h1 className="text-2xl font-bold">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6">
        <div className="grid grid-cols-1 gap-8 ">
          <AnalyticsAreaChart />
          <ActivityLineChart />
          <TasksBarChart />
          <TodosPieChart />
        </div>
      </div>
    </>
  );
}

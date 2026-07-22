import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";

import { tasksBarChartData } from "@/data/tasksBarChartData"

export default function TasksBarChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Tasks Status Over Last Week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="aspect-auto w-full h-96">
          <BarChart
            responsive
            data={tasksBarChartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Completed Tasks"
              fill="#5C6B73"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="Pending Tasks"
              fill="#7F7F7F"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

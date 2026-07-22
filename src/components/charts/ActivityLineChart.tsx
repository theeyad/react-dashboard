import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer } from "../ui/chart";

import { activityLineChartData } from "@/data/activityLineChartData"

export default function ActivityLineChart() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Clients Activity</CardTitle>
        <CardDescription>
          Clients activity over the last 24 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="aspect-auto w-full h-96">
          <LineChart
            responsive
            data={activityLineChartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-3)"
            />
            <XAxis dataKey="name" stroke="var(--color-chart-3)" />
            <YAxis width="auto" stroke="var(--color-chart-3)" />
            <Tooltip
              cursor={{
                stroke: "var(--color-border-2)",
              }}
              contentStyle={{
                backgroundColor: "var(--color-surface-raised)",
                borderColor: "var(--color-border-2)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Reading"
              stroke="var(--color-chart-1)"
              dot={{
                fill: "var(--color-surface-base)",
              }}
              activeDot={{ r: 8, stroke: "var(--color-surface-base)" }}
            />
            <Line
              type="monotone"
              dataKey="Writing"
              stroke="var(--color-chart-2)"
              dot={{
                fill: "var(--color-surface-base)",
              }}
              activeDot={{ stroke: "var(--color-surface-base)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

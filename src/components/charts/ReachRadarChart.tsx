import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";
import { reachRadarChartData } from "@/data/reachRadarChartData"

const SimpleRadarChart = () => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Reach</CardTitle>
        <CardDescription>Reach by continent</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="aspect-auto w-full h-96">
          <RadarChart
            style={{
              aspectRatio: 1,
            }}
            responsive
            outerRadius="80%"
            data={reachRadarChartData}
            margin={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
            }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Reach"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SimpleRadarChart;

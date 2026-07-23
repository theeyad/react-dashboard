import {
  Pie,
  PieChart,
  type PieSectorShapeProps,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";

import { todosPieChartData } from "@/data/todosPieChartData";

import {
  PIE_CHART_COLORS,
  PIE_CHART_RADIAN,
} from "@/consts/pieChartConsts";

function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  percent,
}: any) {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * PIE_CHART_RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * PIE_CHART_RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
      className="text-[10px]"
    >
      <tspan x={x} dy="-0.5em">
        {name}
      </tspan>
      <tspan x={x} dy="1.2em">
        {percent && `${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  let fillOpacity: number;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={PIE_CHART_COLORS[props.index % PIE_CHART_COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: "fill-opacity 0.3s ease" }}
    />
  );
};

export default function TodosPieChart({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Todos</CardTitle>
        <CardDescription>Tasks To Make This Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="w-full h-106">
          <PieChart
            responsive
            style={{
              aspectRatio: 1,
            }}
          >
            <Pie
              data={todosPieChartData}
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={isAnimationActive}
              shape={MyCustomPie}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

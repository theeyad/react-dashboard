import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GlobeCard from "@/components/Globe";
import OverviewDataTable from "@/components/OverviewDataTable";
import AnalyticsAreaChart from "@/components/charts/AnalyticsAreaChart";

import { cardsData } from "@/data/analyticsAreaChartData";

export default function OverviewPage() {
  const documentTitle = useDocumentTitle();
  return (
    <>
      <h1 className="text-2xl font-bold">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
          {cardsData.map((card, index) => (
            <Card key={index} className="@container/card">
              <CardHeader>
                <CardDescription>{card.cardDescription}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {card.cardTitle}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    <TbTrendingUp />
                    {card.percentage}
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm grow justify-center">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.trendingText}{" "}
                  {card.trendingUp ? (
                    <TbTrendingUp className="size-4" />
                  ) : (
                    <TbTrendingDown className="size-4" />
                  )}
                </div>
                <div className="text-muted-foreground">{card.subText}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <AnalyticsAreaChart />
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_3fr] gap-4">
          <GlobeCard />
          <OverviewDataTable />
        </div>
      </div>
    </>
  );
}

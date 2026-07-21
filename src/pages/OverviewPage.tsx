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
import OverviewChart from "@/components/OverviewChart";

export default function OverviewPage() {
  const documentTitle = useDocumentTitle();
  return (
    <>
      <h1 className="text-2xl font-bold">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $1,250.00
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TbTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm grow justify-center">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <TbTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TbTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm grow justify-center">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Down 20% this period <TbTrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Active Accounts</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TbTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm grow justify-center">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Strong user retention <TbTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Engagement exceed targets
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                4.5%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TbTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm grow justify-center">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Steady performance increase <TbTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-4">
          <OverviewChart />
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_3fr] gap-4">
          <GlobeCard />
          <OverviewDataTable />
        </div>
      </div>
    </>
  );
}

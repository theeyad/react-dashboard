import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useDashboardTasks } from "@/hooks/useDashboardTasks";
import { ThreeDots } from "react-loader-spinner";

export default function OverviewDataTable() {
  const tasks = useDashboardTasks();

  return (
    <>
      <div className="rounded-lg border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Task ID</TableHead>
              <TableHead className="text-center">Task Name</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-106">
                  <div className="flex w-full items-center justify-center">
                    <ThreeDots
                      visible={true}
                      height="30"
                      width="30"
                      color="#ffffff"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : tasks.isError ? (
              <TableRow>
                <TableCell colSpan={3} className="h-106">
                  <div className="flex w-full items-center justify-center text-red-500">
                    Error: {tasks.error?.message || "Unknown error"}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tasks.data?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="text-center font-medium">
                    {task.id}
                  </TableCell>
                  <TableCell className="text-center">{task.title}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        task.completed === true ? "default" : "secondary"
                      }
                    >
                      {task.completed === true ? "Completed" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

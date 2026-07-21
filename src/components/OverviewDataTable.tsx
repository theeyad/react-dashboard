import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function OverviewDataTable() {
    const payments = [
  {
    id: "P001",
    name: "Sarah Smith",
    email: "[EMAIL_ADDRESS]",
    amount: 250.00,
    status: "completed",
  },
  {
    id: "P002",
    name: "Michael Johnson",
    email: "[EMAIL_ADDRESS]",
    amount: 120.00,
    status: "pending",
  },
  {
    id: "P003",
    name: "Emily Davis",
    email: "[EMAIL_ADDRESS]",
    amount: 400.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
  {
    id: "P004",
    name: "David Wilson",
    email: "[EMAIL_ADDRESS]",
    amount: 80.00,
    status: "completed",
  },
];

    return <>
        <div className="rounded-lg border w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Task ID</TableHead>
            <TableHead className="text-center">Task Name</TableHead>
            <TableHead className="text-center">Team Member Responsible</TableHead>
            <TableHead className="text-center">Deadline</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="text-center font-medium">{payment.id}</TableCell>
              <TableCell className="text-center">{payment.name}</TableCell>
              <TableCell className="text-center">{payment.email}</TableCell>
              <TableCell className="text-center font-medium">${payment.amount.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </>;
}

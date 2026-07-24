import { useMemo } from "react";
import {
  Search,
  CheckCircle2,
  Circle,
  FileSpreadsheet,
  FileJson,
  X,
} from "lucide-react";
import DataTable, { createTheme } from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useTasks, useToggleTaskStatus } from "@/hooks/tasksHooks";
import { useTaskFilterStore } from "@/stores/useTaskFilterStore";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ThreeDots } from "react-loader-spinner";

import { tasksTableCustomStyles, type Task } from "@/consts/tasks";

import { useUIStore } from "@/stores/useUIStore";
import TasksModal from "@/components/TasksModal";

// Define a unified custom theme that leverages tailwindcss theme variables
createTheme("custom-dashboard", {
  text: {
    primary: "var(--color-foreground, #000)",
    secondary: "var(--color-muted-foreground, #666)",
    disabled: "var(--color-muted-foreground, #666)",
  },
  background: {
    default: "transparent",
  },
  context: {
    background: "var(--color-accent, #eee)",
    text: "var(--color-accent-foreground, #000)",
  },
  divider: {
    default: "var(--color-border, rgba(0,0,0,0.1))",
  },
  button: {
    default: "var(--color-foreground, #000)",
    focus: "var(--color-accent, #eee)",
    hover: "var(--color-accent, #eee)",
    disabled: "var(--color-muted-foreground, #666)",
  },
  highlightOnHover: {
    default: "var(--table-row-hover, #fafafa)",
    text: "var(--color-foreground, #000)",
  },
  striped: {
    default: "var(--color-muted, #f9f9f9)",
    text: "var(--color-foreground, #000)",
  },
  // Structural settings
  spacing: { rowHeight: "56px", headerHeight: "56px", cellPaddingX: "16px" },
  typography: { fontSize: "14px", fontSizeHeader: "12px" },
  shape: { borderRadius: "8px" },
});

export default function TasksPage() {
  const documentTitle = useDocumentTitle();
  const tasksQuery = useTasks();
  const toggleTaskStatus = useToggleTaskStatus();

  const { search, status, setSearch, setStatus, reset } = useTaskFilterStore();

  const openModal = useUIStore((s) => s.openModal);
  const activeModal = useUIStore((s) => s.activeModal);
  const closeModal = useUIStore((s) => s.closeModal);

  // Filtered task data
  const filteredData = useMemo(() => {
    if (!tasksQuery.data) return [];
    return tasksQuery.data.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        status === "all" ||
        (status === "completed" && task.completed) ||
        (status === "pending" && !task.completed);
      return matchesSearch && matchesStatus;
    });
  }, [tasksQuery.data, search, status]);

  // CSV Exporter
  const exportToCSV = () => {
    const headers = "ID,Title,Status\n";
    const rows = filteredData
      .map(
        (t) =>
          `${t.id},"${t.title.replace(/"/g, '""')}",${
            t.completed ? "Completed" : "Pending"
          }`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `tasks_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.click();
  };

  // JSON Exporter
  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `tasks_${new Date().toISOString().split("T")[0]}.json`,
    );
    link.click();
  };

  // Column definitions
  const columns: TableColumn<Task>[] = useMemo(
    () => [
      {
        name: "Task ID",
        selector: (row) => row.id,
        sortable: true,
        width: "100px",
        center: true,
        style: {
          fontWeight: "600",
          fontFamily: "monospace",
        },
      },
      {
        name: "Task Title (in Latin)",
        selector: (row) => row.title,
        sortable: true,
        wrap: true,
        grow: 2,
        minWidth: "250px",
        style: {
          textTransform: "capitalize",
        },
      },
      {
        name: "Status",
        selector: (row) => (row.completed ? 1 : 0),
        sortable: true,
        width: "140px",
        center: true,
        cell: (row) => (
          <Badge variant={row.completed ? "default" : "outline"}>
            {row.completed ? "Completed" : "Pending"}
          </Badge>
        ),
      },
      {
        name: "Actions",
        width: "150px",
        center: true,
        cell: (row) => (
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              toggleTaskStatus(row.id);
            }}
            title={row.completed ? "Mark as Pending" : "Mark as Completed"}
          >
            {row.completed ? (
              <>
                <Circle className="size-4 text-muted-foreground" />
                <span className="text-xs">Undo</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-500">
                  Done
                </span>
              </>
            )}
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <h1 className="text-2xl font-bold px-4 pt-4">{documentTitle}</h1>
      <div className="px-4 py-6 lg:px-6">
        <Card className="w-full shadow-md overflow-hidden bg-card/50 backdrop-blur-md border">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
            <div>
              <CardTitle className="text-lg font-semibold">
                Advanced Tasks Directory
              </CardTitle>
              <CardDescription>
                Search, sort, filter, and export tasks fetched from the API.
              </CardDescription>
            </div>
            {/* Exporters and Refetch */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 w-20"
                onClick={exportToCSV}
                disabled={filteredData.length === 0}
              >
                <FileSpreadsheet className="size-3.5" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 w-20"
                onClick={exportToJSON}
                disabled={filteredData.length === 0}
              >
                <FileJson className="size-3.5" />
                JSON
              </Button>
            </div>
          </CardHeader>

          {/* Filtering controls */}
          <div className="p-4 flex flex-col sm:flex-row items-center gap-4 bg-muted/40 border-b">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by title..."
                className="pl-9 pr-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                className="h-9 px-3 rounded-md border border-input text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "all" | "completed" | "pending")
                }
              >
                <option className="bg-card text-foreground" value="all">
                  All Statuses
                </option>
                <option className="bg-card text-foreground" value="completed">
                  Completed Only
                </option>
                <option className="bg-card text-foreground" value="pending">
                  Pending Only
                </option>
              </select>

              {(search || status !== "all") && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={reset}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <CardContent className="p-0 w-full min-w-0 overflow-hidden">
            {tasksQuery.isLoading ? (
              <div className="flex w-full items-center justify-center py-20">
                <ThreeDots
                  visible={true}
                  height="45"
                  width="45"
                  color="var(--color-primary)"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              </div>
            ) : tasksQuery.isError ? (
              <div className="flex flex-col w-full items-center justify-center py-16 text-destructive gap-2">
                <span className="font-semibold">Failed to fetch tasks</span>
                <span className="text-xs text-muted-foreground">
                  {tasksQuery.error?.message || "An unknown error occurred"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tasksQuery.refetch()}
                  className="mt-2"
                >
                  Retry
                </Button>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredData}
                theme="custom-dashboard"
                customStyles={tasksTableCustomStyles}
                animateRows
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 20, 50]}
                responsive
                pointerOnHover
                highlightOnHover
                onRowClicked={(row) => openModal(row.id)}
                noDataComponent={
                  <div className="flex flex-col w-full items-center justify-center py-16 text-muted-foreground">
                    <span className="font-semibold">
                      No tasks matched your search
                    </span>
                    <span className="text-xs">
                      Try adjusting or clearing your filters
                    </span>
                  </div>
                }
              />
            )}
          </CardContent>
        </Card>
      </div>

      {activeModal !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-card text-foreground border rounded-lg shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <TasksModal />
          </div>
        </div>
      )}
    </>
  );
}

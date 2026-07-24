export const tasksTableCustomStyles: any = {
  header: {
    style: {
      minHeight: "56px",
      display: "none", // Hide the default built-in title header as we have our own CardHeader
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "var(--color-border, rgba(0,0,0,0.1))",
      backgroundColor: "var(--color-muted, #f9f9f9)",
      fontWeight: "600",
      fontSize: "0.875rem",
      color: "var(--color-foreground, #000)",
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "var(--color-border, rgba(0,0,0,0.1))",
      },
    },
  },
  cells: {
    style: {
      fontSize: "0.875rem",
      color: "var(--color-foreground, #000)",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "var(--color-border, rgba(0,0,0,0.1))",
      },
    },
  },
  rows: {
    style: {
      minHeight: "56px",
      backgroundColor: "var(--table-row-bg, #ffffff)",
      transition: "background-color 0.3s ease",
    },
    highlightOnHoverStyle: {
      backgroundColor: "var(--table-row-hover, #fafafa)",
      transition: "background-color 0.3s ease",
    },
  },
  pagination: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "var(--color-border, rgba(0,0,0,0.1))",
      color: "var(--color-foreground, #000)",
      backgroundColor: "transparent",
    },
  },
};

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  responsible?: string;
}

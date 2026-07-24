import { X } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";
import { teamMembers } from "@/data/teamMembers";
import { useTasks } from "@/hooks/tasksHooks";
import { useState } from "react";
import { useUpdateTaskData } from "@/hooks/tasksHooks";

export default function TasksModal() {
  const closeModal = useUIStore((s) => s.closeModal);
  const activeTaskId = useUIStore((s) => s.activeModal);

  const tasks = useTasks().data;
  const task = tasks?.find((t) => t.id === activeTaskId);

  const [taskStatus, setTaskStatus] = useState(
    task?.completed ? "completed" : "pending",
  );
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [taskResponsibility, setTaskResponsibility] = useState(task?.responsible || "none");

  const updateTaskData = useUpdateTaskData();

  function handleUpdateTaskData() {
    if (task?.id === undefined) return;
    updateTaskData(task.id, {
      title: taskTitle,
      completed: taskStatus === "completed",
      responsible: taskResponsibility,
    });
    closeModal();
  }

  return (
    <div className="grid grid-cols-2 gap-4 relative pt-8">
      <button
        className="absolute top-0 right-0 border p-2 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-200"
        onClick={closeModal}
      >
        <X className="size-4" />
      </button>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Task ID
        </span>
        <input
          type="text"
          value={task?.id || ""}
          className="border rounded-md px-3 py-1.5 bg-muted/30 text-sm focus:outline-none"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Task Status
        </span>
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          className="border rounded-md px-3 py-1.5 bg-background text-sm focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Task Title
        </span>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border rounded-md px-3 py-1.5 bg-muted/30 text-sm focus:outline-none"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Responsibility
        </span>
        <select
          value={taskResponsibility}
          onChange={(e) => setTaskResponsibility(e.target.value)}
          className="border rounded-md px-3 py-1.5 bg-background text-sm focus:outline-none"
        >
          <option value="none">Unassigned</option>
          {teamMembers.map((member) => (
            <option key={member.id} value={member.value}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleUpdateTaskData}
        className="col-span-2 justify-self-end px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Update
      </button>
    </div>
  );
}

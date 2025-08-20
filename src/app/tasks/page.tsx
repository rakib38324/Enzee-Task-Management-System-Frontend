/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaCalendar, FaPlus, FaTextHeight } from "react-icons/fa";
import Loading from "@/Components/Loading/Loading";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
};

// ====================
// Fetch function
// ====================
const fetchTasks = async (): Promise<Task[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/task`, {
    headers: { Authorization: `${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return data.data || [];
};

export default function TaskPage() {
  const queryClient = useQueryClient();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // ====================
  // Query: Get tasks
  // ====================
  const {
    data: tasks = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // ====================
  // Mutation: Add Task
  // ====================
  const addTaskMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/create-task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(newTask),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.errorMessage || "Failed to add task");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // ✅ refetch tasks
      setNewTask({ title: "", description: "", dueDate: "" });
      toast.success("Task added Successfully!!!🎉");
    },
    onError: (err: any) => {
      toast.error(err.message || "Error adding task ❌");
    },
  });

  // ====================
  // Mutation: Update Task Status
  // ====================
  const updateTaskMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: Task["status"];
    }) => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/update-status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // ✅ refetch tasks
      toast.success("Task updated Successfully!!!✅");
    },
    onError: () => {
      toast.error("Failed to update task ❌");
    },
  });

  // ====================
  // Columns
  // ====================
  const columns: { title: string; key: Task["status"]; color: string }[] = [
    { title: "To Do", key: "pending", color: "bg-yellow-100" },
    { title: "In Progress", key: "in-progress", color: "bg-blue-100" },
    { title: "Completed", key: "completed", color: "bg-green-100" },
  ];


  
  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10">
      <h1 className="text-2xl md:text-4xl underline font-serif font-bold text-center mb-10">
        My Tasks
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-gray-200">
          {columns.map((col) => {
            const filteredTasks = tasks.filter(
              (task) => task.status === col.key
            );

            return (
              <div
                key={col.key}
                className="p-4 border-r border-gray-200 min-h-[70vh] flex flex-col"
              >
                <h2 className="text-xl text-center border p-1 bg-teal-600 text-white rounded font-semibold mb-4">
                  {col.title}
                </h2>
                {/* Add Task Form */}
                {col.key === "pending" && (
                  <div className="mb-4 space-y-2">
                    {/* Title */}
                    <div className="relative">
                      <FaPlus className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Task title"
                        value={newTask.title}
                        onChange={(e) =>
                          setNewTask({ ...newTask, title: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div className="relative">
                      <FaTextHeight className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        placeholder="Task description"
                        value={newTask.description}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            description: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>

                    {/* Due Date */}
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                          setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => addTaskMutation.mutate()}
                      disabled={addTaskMutation.isPending}
                      className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
                    >
                      {addTaskMutation.isPending ? <Loading /> : "Add Task"}
                    </button>
                  </div>
                )}

                {/* Task Cards */}
                {filteredTasks.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                    No tasks here
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    {filteredTasks.map((task) => (
                      <div
                        key={task._id}
                        className={`${col.color} border border-gray-400 rounded-xl p-4 shadow hover:shadow-lg transition`}
                      >
                        <h3 className="font-bold text-lg">{task.title}</h3>
                        <p className="text-gray-700 text-sm mb-2">
                          {task.description}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          Due: {task.dueDate}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {/* Pending → only show "Move In Progress" */}
                          {task.status === "pending" && (
                            <button
                              onClick={() =>
                                updateTaskMutation.mutate({
                                  id: task._id,
                                  status: "in-progress",
                                })
                              }
                              disabled={updateTaskMutation.isPending}
                              className="px-3 py-1 text-xs rounded-lg bg-blue-200 hover:bg-blue-300 disabled:opacity-50"
                            >
                              {updateTaskMutation.isPending
                                ? "Updating..."
                                : "Move In Progress"}
                            </button>
                          )}

                          {/* In Progress → show "Move To Do" and "Move Completed" */}
                          {task.status === "in-progress" && (
                            <>
                              <button
                                onClick={() =>
                                  updateTaskMutation.mutate({
                                    id: task._id,
                                    status: "pending",
                                  })
                                }
                                disabled={updateTaskMutation.isPending}
                                className="px-3 py-1 text-xs rounded-lg bg-yellow-200 hover:bg-yellow-300 disabled:opacity-50"
                              >
                                {updateTaskMutation.isPending
                                  ? "Updating..."
                                  : "Move To Do"}
                              </button>

                              <button
                                onClick={() =>
                                  updateTaskMutation.mutate({
                                    id: task._id,
                                    status: "completed",
                                  })
                                }
                                disabled={updateTaskMutation.isPending}
                                className="px-3 py-1 text-xs rounded-lg bg-green-200 hover:bg-green-300 disabled:opacity-50"
                              >
                                {updateTaskMutation.isPending
                                  ? "Updating..."
                                  : "Move Completed"}
                              </button>
                            </>
                          )}

                          {/* Completed → show "Move To Do" and "Move In Progress" */}
                          {task.status === "completed" && (
                            <>
                              <button
                                onClick={() =>
                                  updateTaskMutation.mutate({
                                    id: task._id,
                                    status: "pending",
                                  })
                                }
                                disabled={updateTaskMutation.isPending}
                                className="px-3 py-1 text-xs rounded-lg bg-yellow-200 hover:bg-yellow-300 disabled:opacity-50"
                              >
                                {updateTaskMutation.isPending
                                  ? "Updating..."
                                  : "Move To Do"}
                              </button>

                              <button
                                onClick={() =>
                                  updateTaskMutation.mutate({
                                    id: task._id,
                                    status: "in-progress",
                                  })
                                }
                                disabled={updateTaskMutation.isPending}
                                className="px-3 py-1 text-xs rounded-lg bg-blue-200 hover:bg-blue-300 disabled:opacity-50"
                              >
                                {updateTaskMutation.isPending
                                  ? "Updating..."
                                  : "Move In Progress"}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isFetching && (
        <p className="text-center text-sm text-gray-400 mt-2">
          🔄 Syncing latest tasks...
        </p>
      )}
    </section>
  );
}

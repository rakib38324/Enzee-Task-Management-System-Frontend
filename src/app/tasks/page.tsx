/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  FaCalendar,
  FaPlus,
  FaTextHeight,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Loading from "@/Components/Loading/Loading";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
};

export default function TaskPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // ====================
  // Fetch function
  // ====================
  const fetchTasks = async (): Promise<Task[]> => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/task`, {
      headers: { Authorization: `${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    return data.data || [];
  };

  const queryClient = useQueryClient();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState<string>("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [formData, setFormData] = useState<Task | null>(null);

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
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: Task["status"];
    }) => {
      
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
      if (!res.ok) throw new Error("Failed to update task status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task status updated ✅");
    },
    onError: () => {
      toast.error("Failed to update status ❌");
    },
  });

  // ====================
  // Mutation: Update Task Info (title, desc, dueDate)
  // ====================
  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/update-task/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update task info");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsEditing(false);
      toast.success("Task info updated 🎉");
    },
    onError: (error: any) => {
      toast.error(error.message || "Update failed ❌");
    },
  });

  // ====================
  // Mutation: Delete Task
  // ====================
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/task/delete-task/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete task");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted 🗑️");
      setTaskId("");
      setConfirmDelete(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Delete failed ❌");
    },
  });

  // ====================
  // Modal handlers
  // ====================
  const handleEdit = (task: Task) => {
    setFormData(task);
    setIsEditing(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (formData) updateTaskMutation.mutate(formData);
  };

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
                      className="w-full bg-teal-500 cursor-pointer text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50"
                    >
                      {addTaskMutation.isPending
                        ? "Adding Task..."
                        : "Add Task"}
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
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{task.title}</h3>
                            <p className="text-gray-700 text-sm mb-2">
                              {task.description}
                            </p>
                            <p className="text-xs text-gray-500 mb-3">
                              Due: {task.dueDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <FaEdit
                              className="text-blue-600 cursor-pointer"
                              onClick={() => handleEdit(task)}
                            />
                            <FaTrash
                              className="text-red-600 cursor-pointer"
                              onClick={() => {
                                setTaskId(task._id);
                                setConfirmDelete(true);
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {task.status === "pending" && (
                            <button
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  id: task._id,
                                  status: "in-progress",
                                })
                              }
                              disabled={updateStatusMutation.isPending}
                              className="px-3 py-1 cursor-pointer text-xs rounded-lg bg-blue-200 hover:bg-blue-300 disabled:opacity-50"
                            >
                              {updateStatusMutation.isPending
                                ? "Updating..."
                                : "Move In Progress"}
                            </button>
                          )}

                          {task.status === "in-progress" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: task._id,
                                    status: "pending",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="px-3 py-1 text-xs cursor-pointer rounded-lg bg-yellow-200 hover:bg-yellow-300 disabled:opacity-50"
                              >
                                {updateStatusMutation.isPending
                                  ? "Updating..."
                                  : "Move To Do"}
                              </button>

                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: task._id,
                                    status: "completed",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="px-3 py-1 text-xs cursor-pointer rounded-lg bg-green-200 hover:bg-green-300 disabled:opacity-50"
                              >
                                {updateStatusMutation.isPending
                                  ? "Updating..."
                                  : "Move Completed"}
                              </button>
                            </>
                          )}

                          {task.status === "completed" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: task._id,
                                    status: "pending",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="px-3 py-1 text-xs cursor-pointer rounded-lg bg-yellow-200 hover:bg-yellow-300 disabled:opacity-50"
                              >
                                {updateStatusMutation.isPending
                                  ? "Updating..."
                                  : "Move To Do"}
                              </button>

                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: task._id,
                                    status: "in-progress",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="px-3 py-1 text-xs cursor-pointer rounded-lg bg-blue-200 hover:bg-blue-300 disabled:opacity-50"
                              >
                                {updateStatusMutation.isPending
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

      {/* Modal for editing */}
      {isEditing && formData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-90">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
              Edit Task Informations
            </h2>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Title"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Description"
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updateTaskMutation.isPending}
                className="px-4 py-2 rounded cursor-pointer bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50"
              >
                {updateTaskMutation.isPending ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg text-center font-semibold mb-4">
              Do you want delete this task?
            </h2>

            <div className="flex justify-center gap-10 mt-10">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setTaskId("");
                }}
                className="px-4 py-2 rounded cursor-pointer text-white bg-green-500 hover:bg-green-600"
              >
                Cancel
              </button>

              <button
                disabled={deleteTaskMutation.isPending}
                onClick={() => {
                  deleteTaskMutation.mutate(taskId);
                }}
                className="px-4 py-2 rounded cursor-pointer bg-red-500 text-white hover:bg-red-600"
              >
                {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

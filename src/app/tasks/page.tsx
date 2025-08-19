"use client";
import { useState } from "react";
import { FaCalendar, FaPlus, FaTextHeight } from "react-icons/fa";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "completed";
  dueDate: string;
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Finish UI Design",
      description: "Complete the homepage and dashboard UI.",
      status: "todo",
      dueDate: "2025-08-25",
    },
    {
      id: 2,
      title: "Write Documentation",
      description: "Prepare user guide for the task manager.",
      status: "inprogress",
      dueDate: "2025-08-22",
    },
    {
      id: 3,
      title: "Deploy Project",
      description: "Deploy the Next.js app on Vercel.",
      status: "completed",
      dueDate: "2025-08-20",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const addTask = () => {
    if (!newTask.title || !newTask.dueDate) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: "todo",
        dueDate: newTask.dueDate,
      },
    ]);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const changeStatus = (id: number, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns: { title: string; key: Task["status"]; color: string }[] = [
    { title: "To Do", key: "todo", color: "bg-yellow-100" },
    { title: "In Progress", key: "inprogress", color: "bg-blue-100" },
    { title: "Completed", key: "completed", color: "bg-green-100" },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10">
      <h1 className="text-2xl md:text-4xl underline font-serif font-bold text-center mb-10">
        My Tasks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-gray-200">
        {columns.map((col) => {
          const filteredTasks = tasks.filter((task) => task.status === col.key);

          return (
            <div
              key={col.key}
              className={`p-4 border-r border-gray-200 min-h-[70vh] flex flex-col`}
            >
              <h2 className="text-xl text-center border p-1 bg-teal-600 text-white rounded font-semibold mb-4">
                {col.title}
              </h2>

              {/* Add task input in To Do */}
              {col.key === "todo" && (
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
                    onClick={addTask}
                    className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
                  >
                    Add Task
                  </button>
                </div>
              )}

              {/* Task cards */}
              {filteredTasks.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                  No tasks here
                </div>
              ) : (
                <div className="space-y-4 flex-1">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
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
                        {col.key !== "todo" && (
                          <button
                            onClick={() => changeStatus(task.id, "todo")}
                            className="px-3 py-1 text-xs rounded-lg bg-yellow-200 hover:bg-yellow-300"
                          >
                            Move To Do
                          </button>
                        )}
                        {col.key !== "inprogress" && (
                          <button
                            onClick={() => changeStatus(task.id, "inprogress")}
                            className="px-3 py-1 text-xs rounded-lg bg-blue-200 hover:bg-blue-300"
                          >
                            Move In Progress
                          </button>
                        )}
                        {col.key !== "completed" && (
                          <button
                            onClick={() => changeStatus(task.id, "completed")}
                            className="px-3 py-1 text-xs rounded-lg bg-green-200 hover:bg-green-300"
                          >
                            Move Completed
                          </button>
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
    </section>
  );
}

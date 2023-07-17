import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Task from "./Task";

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTask = () => {
    const newTask = {
      title,
      id: nanoid(),
      subtasks: [],
    };

    setTodos((prevTodos) => [...prevTodos, newTask]);
    setTitle("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTask]));
  };

  const handleAddSubtask = (taskIndex, subtaskTitle) => {
    const newSubtask = {
      id: nanoid(),
      title: subtaskTitle,
      completed: false,
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[taskIndex].subtasks.push(newSubtask);
      return updatedTodos;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleDeleteTask = (taskIndex) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(taskIndex, 1);
      return updatedTodos;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleDeleteSubTask = (taskIndex, subtaskIndex) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[taskIndex].subtasks.splice(subtaskIndex, 1);
      return updatedTodos;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEditTask = (taskIndex, newTaskTitle) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[taskIndex].title = newTaskTitle;
      return updatedTodos;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleTaskCompletion = (taskIndex, isCompleted) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[taskIndex].completed = isCompleted;
      return updatedTodos;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your Task..."
        />
        <button
          onClick={handleAddTask}
          className="ml-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>

      {todos.map((task, taskIndex) => (
        <Task
          key={task.id}
          taskIndex={taskIndex}
          handleAddSubtask={handleAddSubtask}
          handleDeleteSubTask={handleDeleteSubTask}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          handleTaskCompletion={handleTaskCompletion}
          task={task}
        />
      ))}
    </div>
  );
};

export default TodoList;

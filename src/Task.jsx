import React, { useState } from "react";

const Task = ({
  task,
  taskIndex,
  handleAddSubtask,
  handleDeleteTask,
  handleDeleteSubTask,
  handleEditTask,
  handleTaskCompletion,
}) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);

  const handleSubtaskTitleChange = (e) => {
    setNewSubtaskTitle(e.target.value);
  };

  const handleAddSubtaskClick = () => {
    if (newSubtaskTitle) {
      handleAddSubtask(taskIndex, newSubtaskTitle);
      setNewSubtaskTitle("");
    }
  };

  const handleDeleteTaskClick = () => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      handleDeleteTask(taskIndex);
    }
  };

  const handleDeleteSubTaskClick = (subtaskIndex) => {
    if (window.confirm("Are you sure you want to delete the Subtask?")) {
      handleDeleteSubTask(taskIndex, subtaskIndex);
    }
  };

  const handleEditTaskClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
    setEditedTaskTitle(task.title);
  };

  const handleSaveEditClick = () => {
    handleEditTask(taskIndex, editedTaskTitle);
    setIsEditing(false);
  };

  const handleEditedTaskTitleChange = (e) => {
    setEditedTaskTitle(e.target.value);
  };

  return (
    <div className="border rounded-md p-4 my-4">
      {isEditing ? (
        <div className="flex items-center mb-2">
          <input
            type="text"
            className="w-full bg-white border border-gray-300 rounded py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={editedTaskTitle}
            onChange={handleEditedTaskTitleChange}
          />
          <button
            className="ml-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSaveEditClick}
          >
            Save
          </button>
          <button
            className="ml-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleCancelEditClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center mb-2">
          <h4
            className={`text-lg font-semibold ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleEditTaskClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-2 cursor-pointer text-blue-500 hover:text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 8a5.002 5.002 0 00-9.935-.5H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleDeleteTaskClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-2 cursor-pointer text-red-500 hover:text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      )}
      <div className="flex items-center mb-2">
        <input
          type="text"
          className="w-full bg-white border border-gray-300 rounded py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your sub tasks"
          value={newSubtaskTitle}
          onChange={handleSubtaskTitleChange}
        />
        <button
          className="ml-2 px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleAddSubtaskClick}
        >
          Add Subtask
        </button>
      </div>
      {task.subtasks.map((subtask, subtaskIndex) => (
        <div key={subtask.id} className="flex items-center mb-2">
          <p className={`mr-2 ${subtask.completed ? "line-through" : ""}`}>
            {subtask.title}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleDeleteSubTaskClick(subtaskIndex)}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Task;

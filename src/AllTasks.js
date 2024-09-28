import { useState } from "react";
import Task from "./Task";


export default function AllTasks({ tasks, setTasks, totalTime, onDeleteOneTask }) {
  const [isEdit, setIsEdit] = useState(null);

  function handleUpdateTask(el) {
    setTasks(tasks.map(t => t.id === el.id ? el : t));
  }

  return (
    <table className="all-tasks">
      <tbody>
        {tasks.map((el, i) => <Task key={el.id} element={el} slno={i + 1} isEdit={isEdit} setIsEdit={setIsEdit} onUpdateTask={handleUpdateTask} totalTime={totalTime} onDeleteOneTask={onDeleteOneTask} />)}
      </tbody>
    </table>
  );
}
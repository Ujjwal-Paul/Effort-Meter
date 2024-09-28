import { useEffect, useState } from "react";

import Progress from "./Progress";
import AddAnother from "./AddAnother";
import Details from "./Details";


export default function App() {
  const [logoName, setLogoName] = useState(localStorage.getItem('logoName') || 'EFFORT METER');
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  useEffect(() => {
    localStorage.setItem('logoName', logoName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [logoName, tasks]);


  const totalTime = tasks.reduce((acc, el) => acc + el.time, 0);

  function handleAddAnotherTask(el) {
    setTasks(pre => [...pre, el]);
  }

  function handleDeleteOneTask(el) {
    setTasks(pre => pre.filter(e => e.id !== el.id));
  }

  return (
    <div className="App">
      <input className="logo" value={logoName} onChange={(e) => setLogoName(e.target.value)} title="Tap to change the name" />

      <Progress totalTime={totalTime} />

      <AddAnother onAddAnotherTask={handleAddAnotherTask} />

      <Details tasks={tasks} setTasks={setTasks} totalTime={totalTime} onDeleteOneTask={handleDeleteOneTask} />

      <footer>
        Made by <i style={{ fontWeight: 700 }}>Ujjwal Paul</i>
      </footer>

    </div>
  );
}
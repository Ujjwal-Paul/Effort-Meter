import { useState } from "react";
import { getSeconds } from "./utils";


export default function AddAnother({ onAddAnotherTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');

  function handleAddAnotherButton() {
    setTaskName('');
    setTime('');
    setLink('');
    setIsOpen(!isOpen);
  }

  function handleSubmitButton(e) {
    if (taskName && time)
      e.preventDefault();

    if (!taskName || !time)
      return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      time: getSeconds(time),
      link,
    };

    onAddAnotherTask(newTask);

    handleAddAnotherButton();
  }

  return (
    <div className="add-another">
      <button className="another-btn" onClick={handleAddAnotherButton}>{isOpen ? 'Close' : 'Add Another'}</button>

      {isOpen &&
        <form className="another-form">
          <label>Task Name<span style={{ color: 'red' }}>*</span> </label>
          <input type="text" required value={taskName} onChange={(e) => setTaskName(e.target.value)} />

          <label>Time<span style={{ color: 'red' }}>*</span> </label>
          <input type="text" required value={time} onChange={(e) => setTime(e.target.value)} />

          <label>Link</label>
          <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />

          <button onClick={handleSubmitButton}>Submit</button>
        </form>}

    </div>
  );
}
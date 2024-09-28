import { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';

import editBox from './images/edit.png';
import deleteBox from './images/delete.png';
import saveBox from './images/save.png';
import doneBox from './images/done.png';


function getSeconds(str) {
  let part1 = 0;
  let part2 = 0;
  let flag = true;
  let isHour = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] >= '0' && str[i] <= '9') {
      if (flag) {
        part1 = part1 * 10 + (str[i] - '0');
      }
      else {
        part2 = part2 * 10 + (str[i] - '0');
      }
    }
    else {
      flag = false;
    }

    if (str[i] === 'h' || str[i] === 'H') isHour = true;
  }

  if (!isHour) {
    return part1 * 60;
  }

  return part1 * 3600 + part2 * 60;
}

function getTime(seconds) {
  if (seconds === 0) return '0min';

  let hr = Math.trunc(seconds / 3600);
  seconds -= (hr * 3600);
  let mn = Math.trunc(seconds / 60);
  let time = (hr ? `${hr}hr` : '') + (mn ? `${mn}min` : '');
  return time;
}

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

      <Footer />
    </div>
  );
}

function Progress({ totalTime }) {
  const [mouseIn, setMouseIn] = useState(false);

  const percentage = Math.trunc(totalTime / (8 * 36));

  return (
    <div className="progress-container">
      <div className="progress-bar" onMouseEnter={() => setMouseIn(true)} onMouseLeave={() => setMouseIn(false)}>
        <CircularProgressbar
          value={percentage}
          styles={{
            path: {
              stroke: `#0a9396`,
              strokeLinecap: 'butt',
              transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            trail: {
              stroke: '#222',
            },
            text: {
              fill: '#0a9396',
              fontSize: '16px',
            },
          }}
        />

        <div className="text">
          {mouseIn ?
            <>
              <p>{getTime(totalTime)}</p>
              <p style={{ fontSize: 'min(24px, 6vw)' }}>out of 8hr</p>
            </>
            :
            <>
              <p>{`${percentage}%`}</p>
              <p>Done</p>
            </>
          }
        </div>
      </div>

    </div>
  )
}

function AddAnother({ onAddAnotherTask }) {
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
    }

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
        </form>
      }

    </div>
  );
}

function Details({ tasks, setTasks, totalTime, onDeleteOneTask }) {

  function handleDeleteAll() {
    const response = window.confirm('Do you want to delete all details?')

    if (response) {
      setTasks([]);
    }
  }

  return (
    <div className="details">
      <p className="heading">Details</p>

      {tasks.length > 0 ?
        <div className="details-container">
          <AllTasks tasks={tasks} setTasks={setTasks} totalTime={totalTime} onDeleteOneTask={onDeleteOneTask} />
        </div>
        :
        <p className="no-details">No details till now. <br></br> Add some details to see here.</p>
      }

      <button className="delete-all" onClick={handleDeleteAll}>Delete All Details</button>

    </div>
  )
}

function AllTasks({ tasks, setTasks, totalTime, onDeleteOneTask }) {
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
  )
}

function Task({ element, slno, isEdit, setIsEdit, onUpdateTask, totalTime, onDeleteOneTask }) {
  const [taskName, setTaskName] = useState(element.name);
  const [time, setTime] = useState(getTime(element.time));
  const [link, setLink] = useState(element.link);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const selected = isEdit ? isEdit.id === element.id : false;
  const percentage = Math.trunc(element.time / totalTime * 100
  );

  function handleClickOnEditButton() {
    if (isSaving) return;
    if (!taskName || !time) return;

    if (!isEdit) {
      setIsEdit(element);
      setIsEditing(true);
    }
    else if (isEdit.id === element.id) {
      const modifiedTask = {
        id: element.id,
        name: taskName,
        time: getSeconds(time),
        link: link ? link : element.link,
      }

      setIsEditing(false);
      setIsSaving(true);

      setTimeout(() => {
        onUpdateTask(modifiedTask);

        setTaskName(modifiedTask.name);
        setTime(getTime(modifiedTask.time));
        setLink(modifiedTask.link);
        setIsSaving(false);
        setIsEdit(null);
      }, 1 * 1000);
    }
  }

  return (
    <tr className="task">
      <td>{slno}</td>
      <td>
        <input type="text" value={taskName} disabled={!selected} onChange={(e) => setTaskName(e.target.value)} className={(selected ? 'selected' : '') + ' type1'} />
      </td>
      <td>
        <input type="text" value={time} className={(selected ? 'selected' : '') + ' center type2'} disabled={!selected} onChange={(e) => setTime(e.target.value)} />
      </td>
      <td className="center">{percentage}%</td>
      <td className="center">
        {
          selected ?
            <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className={(selected ? 'selected' : '') + ' type1'}></input> :
            element.link ?
              <a href={element.link} target="blank">Link</a> :
              '-'
        }
      </td>

      <td><img src={selected ? isSaving ? doneBox : isEditing ? saveBox : editBox : editBox} alt='edit' title="edit" onClick={handleClickOnEditButton} /></td>
      <td><img src={deleteBox} alt='delete' title="delete" onClick={() => onDeleteOneTask(element)} /></td>
    </tr>
  );
}

function Footer() {
  return (
    <footer>
      Made by <i style={{ fontWeight: 700 }}>Ujjwal Paul</i>
    </footer>
  )
}

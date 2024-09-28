import AllTasks from "./AllTasks";


export default function Details({ tasks, setTasks, totalTime, onDeleteOneTask }) {
  function handleDeleteAll() {
    const response = window.confirm('Do you want to delete all details?');

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
        <p className="no-details">No details till now. <br></br> Add some details to see here.</p>}

      <button className="delete-all" onClick={handleDeleteAll}>Delete All Details</button>

    </div>
  );
}

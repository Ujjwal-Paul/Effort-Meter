import { useState } from "react";
import { getSeconds, getTime } from './utils';

import editBox from './images/edit.png';
import deleteBox from './images/delete.png';
import saveBox from './images/save.png';
import doneBox from './images/done.png';


export default function Task({ element, slno, isEdit, setIsEdit, onUpdateTask, totalTime, onDeleteOneTask }) {
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
            }, 1000);
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
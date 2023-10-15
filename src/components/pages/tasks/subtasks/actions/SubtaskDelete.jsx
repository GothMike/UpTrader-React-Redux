import { subtaskDelete } from "../../../../../redux/actions/subtasksActions";
import { useDispatch } from "react-redux";

import Delete from "../../../../../assets/Delete.svg";

const SubtaskDelete = ({ task, subtask }) => {
  const { subTasks } = task;
  const { id } = subtask;

  const dispatch = useDispatch();

  const onDelete = (e) => {
    e.preventDefault();

    const deleteSubtask = {
      id: id,
    };

    task.subTasks = subTasks.filter((item) => item.id !== deleteSubtask.id);

    dispatch(subtaskDelete(task.ProjectId, task.id, task));
  };

  return <img onClick={onDelete} src={Delete} alt="Delete" />;
};

export default SubtaskDelete;

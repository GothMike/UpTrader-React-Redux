import { taskDeleted } from "../../../../redux/actions/taskActions";
import { useDispatch } from "react-redux";

import Delete from "../../../../assets/Delete.svg";

const TaskDelete = ({ task }) => {
  const dispatch = useDispatch();

  const onDelete = (e) => {
    e.preventDefault();

    dispatch(taskDeleted(task));
  };

  return <img onClick={onDelete} src={Delete} alt="Delete" />;
};

export default TaskDelete;

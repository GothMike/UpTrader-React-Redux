import { useSelector } from "react-redux";
import SubtaskItem from "../subtasks/SubtaskItem";
import Spinner from "../../../spinner/Spinner";

const SubtaskList = ({ subtask }) => {
  const taskLoadingStatus = useSelector((state) => state.tasks.taskLoadingStatus);

  switch (taskLoadingStatus) {
    case "loading":
      return (
        <div className="subtask">
          <h4 className="subtask__header">Подзадачи</h4>
          <Spinner />
        </div>
      );
    case "idle":
      return (
        <div className="subtask">
          <h4 className="subtask__header">Подзадачи</h4>
          {subtask.map((subtask) => (
            <SubtaskItem key={subtask.id} subtask={subtask} />
          ))}
        </div>
      );
    case "error":
      return (
        <div className="subtask">
          <h4 className="subtask__header">Подзадачи</h4>
          <h5>Произошла ошибка</h5>
        </div>
      );
    default:
      return (
        <>
          <h5>Глобальная непредвиденная ошибка</h5>
        </>
      );
  }
};

export default SubtaskList;

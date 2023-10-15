import { useSelector } from "react-redux";
import SubtaskEdit from "./actions/SubtaskEdit";
import Delete from "../../../../assets/Delete.svg";

const SubtaskItem = ({ subtask }) => {
  const taskLoadingStatus = useSelector((state) => state.tasks.taskLoadingStatus);
  console.log(taskLoadingStatus);
  return (
    <>
      <div key={subtask.id} className="subtask__card">
        <div className="subtask__leftSide">
          <input type="checkbox" className="subtask__checkbox" />
          <div className="substask__descr">{subtask.description}</div>
        </div>
        <div className="subtask__rightSide">
          <SubtaskEdit task={subtask} />
          <img src={Delete} alt="Delete" />
        </div>
      </div>
    </>
  );
};

export default SubtaskItem;

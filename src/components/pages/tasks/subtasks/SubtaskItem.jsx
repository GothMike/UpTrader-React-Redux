import { useSelector } from "react-redux";
import SubtaskEdit from "./actions/SubtaskEdit";
import SubtaskDelete from "./actions/SubtaskDelete";
import Delete from "../../../../assets/Delete.svg";

const SubtaskItem = ({ task, subtask }) => {
  return (
    <>
      <div key={subtask.id} className="subtask__card">
        <div className="subtask__leftSide">
          <input type="checkbox" className="subtask__checkbox" />
          <div className="substask__descr">{subtask.description}</div>
        </div>
        <div className="subtask__rightSide">
          <SubtaskEdit task={task} subtask={subtask} />
          <SubtaskDelete task={task} subtask={subtask} />
        </div>
      </div>
    </>
  );
};

export default SubtaskItem;

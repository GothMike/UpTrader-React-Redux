import { useState } from "react";
import { useDispatch } from "react-redux";
import SubtaskEdit from "./actions/SubtaskEdit";
import { subtaskUpdate } from "../../../../redux/actions/subtasksActions";
import PropTypes from "prop-types";

import SubtaskDelete from "./actions/SubtaskDelete";

const SubtaskItem = ({ task, subtask }) => {
  const [completedSubtask, setCompletedSubtask] = useState(false);
  const { subTasks } = task;
  const dispatch = useDispatch();

  const onCompleted = (e) => {
    e.preventDefault();

    const updatedCompletedSubtask = !completedSubtask;

    console.log(updatedCompletedSubtask);
    const updateSubtask = {
      ...subtask,
      isCompleted: updatedCompletedSubtask,
    };

    task.subTasks = subTasks.map((subtask) => {
      if (subtask.id === updateSubtask.id) {
        return {
          ...subtask,
          ...updateSubtask,
        };
      }
      return subtask;
    });

    setCompletedSubtask(updatedCompletedSubtask);
    dispatch(subtaskUpdate(task.ProjectId, task.id, task));
  };

  return (
    <>
      <div
        key={subtask.id}
        className={`subtask__card ${subtask.isCompleted ? "subtask__completed" : ""}`}
      >
        <div className="subtask__leftSide">
          <input
            checked={subtask.isCompleted}
            onChange={(e) => {
              onCompleted(e);
            }}
            type="checkbox"
            className="subtask__checkbox"
          />
          <div className="subtask__wrapper">
            <div className="subtask__descr">{subtask.description}</div>
          </div>
        </div>
        <div className="subtask__rightSide">
          <SubtaskEdit task={task} subtask={subtask} />
          <SubtaskDelete task={task} subtask={subtask} />
        </div>
      </div>
    </>
  );
};

SubtaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  subtask: PropTypes.object.isRequired,
};

export default SubtaskItem;

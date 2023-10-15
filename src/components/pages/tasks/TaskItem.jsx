import { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import TaskEdit from "./actions/TaskEdit";
import TaskDelete from "./actions/TaskDelete";
import TaskCard from "./TaskCard";
import { chooseTask } from "../../../redux/actions/taskActions";
import PropTypes from "prop-types";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [showCard, setShowCard] = useState(false);
  const card = showCard ? <TaskCard task={task} show={showCard} /> : null;
  const { id, title, taskNumber, priority } = task;
  const cardView = !priority ? "task__card" : "task__card task__card_highPriority";
  const priorityView = !priority ? (
    <div className="task__card-priority"></div>
  ) : (
    <div className="task__card-priority task__card-priority_high"></div>
  );

  const chooseTaskCard = (task) => {
    dispatch(chooseTask(task));
    setShowCard(!showCard);
  };

  return (
    <>
      <Draggable draggableId={id} key={id} index={taskNumber}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${cardView} ${snapshot.isDragging ? "task__dragging" : ""}`}
          >
            <div className="task__card-header" onClick={() => chooseTaskCard(task)}>
              <div className="task__card-number">{id}</div>
              <div className="task__card-title">{title}</div>
            </div>
            <div className="task__card-wrapper">
              <TaskEdit task={task} />
              <TaskDelete task={task} />
              {priorityView}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      {card}
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    taskNumber: PropTypes.number.isRequired,
    priority: PropTypes.bool,
  }).isRequired,
};

export default TaskItem;

import { Draggable } from "react-beautiful-dnd";
import TaskEdit from "./actions/TaskEdit";
import TaskDelete from "./actions/TaskDelete";
import TaskCard from "./TaskCard";

const TaskItem = ({ task }) => {
  const { id, title, taskNumber, priority } = task;
  const cardView = !priority ? "task__card" : "task__card task__card_highPriority";
  const priorityView = !priority ? (
    <div className="task__card-priority"></div>
  ) : (
    <div className="task__card-priority task__card-priority_high"></div>
  );

  return (
    <Draggable draggableId={`${id}`} key={id} index={taskNumber}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={cardView}
        >
          <div className="task__card-header">
            <div className="task__card-number">{taskNumber}</div>
            <div className="task__card-title">{title}</div>
          </div>
          <div className="task__card-wrapper">
            <TaskCard task={task} />
            <TaskEdit task={task} />
            <TaskDelete task={task} />
            {priorityView}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;

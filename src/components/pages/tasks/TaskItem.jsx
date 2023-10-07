import { Draggable } from "react-beautiful-dnd";

const TaskItem = ({ task, index }) => {
  console.log(task);
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className="task__card"
        >
          <div className="task__card-index">#{task.id}</div>
          <div className="task__card-title">{task.task}</div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;

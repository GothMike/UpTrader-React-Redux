import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskList = ({ title, tasks, id }) => {
  return (
    <>
      <div className="task__board">
        <div className="task__subtitle">{title}</div>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              className="task__list"
            >
              {tasks.map((task, index) => (
                <TaskItem key={index} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default TaskList;

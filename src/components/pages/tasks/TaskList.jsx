import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import Spinner from "../../spinner/Spinner";
import { useSelector } from "react-redux";

const TaskList = ({ title, tasks, id }) => {
  const taskLoadingStatus = useSelector((state) => state.tasks.tasksLoadingStatus);

  switch (taskLoadingStatus) {
    case "loading":
      return (
        <>
          <div className="task__board">
            Проекты
            <div className="task__subtitle">{title}</div>
            <div className="task__list">
              <Spinner />
            </div>
          </div>
        </>
      );
    case "idle":
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
                  {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} index={task.taskNumber} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </>
      );
    case "error":
      return (
        <>
          <div className="task__board">
            Проекты
            <h2 className="task__subtitle">{title}</h2>
            <h3 className="task__list">Произошла ошибка</h3>
          </div>
        </>
      );
    default:
      return <h2 className="task__subtitle">Глобальная непредвиденная ошибка</h2>;
  }
};

export default TaskList;

import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import Spinner from "../../spinner/Spinner";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const TaskList = ({ title, tasks, id }) => {
  const taskLoadingStatus = useSelector((state) => state.tasks.tasksLoadingStatus);
  const searchQuery = useSelector((state) => state.tasks.dataEntry);

  const renderFilterData = (arr) => {
    const filteredData = arr.filter((item) => {
      const titleMatches = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const taskIdMatches = String(item.id).includes(searchQuery);

      return titleMatches || taskIdMatches;
    });

    return filteredData.map((task) => {
      return <TaskItem key={task.id} task={task} index={task.taskNumber} />;
    });
  };

  const filteredTasks = renderFilterData(tasks);

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
                  className={`task__list ${snapshot.isDraggingOver ? "task__droppable" : ""}`}
                >
                  {filteredTasks}
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

TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default TaskList;

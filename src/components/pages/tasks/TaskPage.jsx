import Container from "../../container/Container";
import Header from "../../header/Header";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { tasksFetching, saveUpdatedTask } from "../../../redux/actions/taskActions";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";

const TaskPage = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const { taskId } = useParams();

  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [completed, setCompleted] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksFetching(taskId));
  }, []);

  useEffect(() => {
    renderData(tasks);
  }, [tasks]);

  const renderData = (arr) => {
    const queueTasks = arr.filter((task) => task.isQueue);
    const developmentTasks = arr.filter((task) => task.isDevelopment);
    const completedTasks = arr.filter((task) => task.isDone);

    queueTasks.sort((a, b) => a.taskNumber - b.taskNumber);
    queueTasks.forEach((task, index) => {
      task.taskNumber = index + 1;
    });
    developmentTasks.sort((a, b) => a.taskNumber - b.taskNumber);
    developmentTasks.forEach((task, index) => {
      task.taskNumber = index + 1;
    });

    completedTasks.sort((a, b) => a.taskNumber - b.taskNumber);
    completedTasks.forEach((task, index) => {
      task.taskNumber = index + 1;
    });

    setQueue(queueTasks);
    setDevelopment(developmentTasks);
    setCompleted(completedTasks);
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceList = getListById(source.droppableId);
    const destinationList = getListById(destination.droppableId);

    if (sourceList === destinationList) {
      return;
    }

    const updatedSourceList = removeItemById(draggableId, sourceList);
    const task = findItemById(draggableId, sourceList);

    const updatedTask = {
      ...task,
      isQueue: destination.droppableId === "1",
      isDevelopment: destination.droppableId === "2",
      isDone: destination.droppableId === "3",
    };

    const updatedDestinationList = [...destinationList, updatedTask];

    updateListById(source.droppableId, updatedSourceList);
    updateListById(destination.droppableId, updatedDestinationList);

    dispatch(saveUpdatedTask(taskId, updatedTask.id, updatedTask));
    dispatch(tasksFetching(taskId));
  };

  const getListById = (listId) => {
    if (listId === "1") return queue;
    if (listId === "2") return development;
    if (listId === "3") return completed;
    return [];
  };

  const updateListById = (listId, updatedList) => {
    if (listId === "1") {
      setQueue(updatedList);
    } else if (listId === "2") {
      setDevelopment(updatedList);
    } else if (listId === "3") {
      setCompleted(updatedList);
    }
  };

  const findItemById = (id, array) => {
    return array.find((item) => item.id === id);
  };

  const removeItemById = (id, array) => {
    return array.filter((item) => item.id !== id);
  };

  return (
    <Container>
      <Header />
      <section className="task">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="task__title">Задачи</div>
          <div className="task__boards">
            <TaskList title={"Очередь"} tasks={queue} id={"1"} />
            <TaskList title={"В работе"} tasks={development} id={"2"} />
            <TaskList title={"Выполнено"} tasks={completed} id={"3"} />
          </div>
        </DragDropContext>
        <TaskCard />
      </section>
    </Container>
  );
};

export default TaskPage;

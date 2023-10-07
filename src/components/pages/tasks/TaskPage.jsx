import Container from "../../container/Container";
import Header from "../../header/Header";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { DragDropContext } from "react-beautiful-dnd";

const TaskPage = () => {
  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    fetch("https://651b2642194f77f2a5ae49fd.mockapi.io/api/Projects/1/Tasks")
      .then((response) => response.json())
      .then((json) => {
        setQueue(json.filter((task) => task.isQueue));
        setDevelopment(json.filter((task) => task.isDevelopment));
        setCompleted(json.filter((task) => task.isDone));
      });
  }, []);

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

    const updatedDestinationList = [
      ...destinationList,
      { ...task, completed: destinationList === completed },
    ];

    updateListById(source.droppableId, updatedSourceList);
    updateListById(destination.droppableId, updatedDestinationList);
  };

  function getListById(listId) {
    if (listId === "1") return queue;
    if (listId === "2") return development;
    if (listId === "3") return completed;
    return [];
  }

  function updateListById(listId, updatedList) {
    if (listId === "1") setQueue(updatedList);
    else if (listId === "2") setDevelopment(updatedList);
    else if (listId === "3") setCompleted(updatedList);
  }

  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

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
      </section>
    </Container>
  );
};

export default TaskPage;

import { createPortal } from "react-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SubtaskCreate from "./subtasks/actions/SubtaskCreate";
import { useEffect } from "react";
import { taskFetching } from "../../../redux/actions/taskActions";
import SubtaskList from "./subtasks/SubtaskList";

const TaskCard = ({ task, show }) => {
  const { id, title, description, ProjectId, timeOfWork } = task;
  const taskEntity = useSelector((state) => state.tasks.task);
  const [portalVisible, setPortalVisible] = useState(show);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskFetching(ProjectId, id));
  }, []);

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal modal__card`}>
                <div className="modal__form">
                  <div className="modal__header">
                    <h2 className="modal__title">Просмотр карточки задачи</h2>
                    <div onClick={() => setPortalVisible(!portalVisible)} className="modal__close">
                      &times;
                    </div>
                  </div>
                  <div className="modal__wrapper modal__wrapper_task modal__wrapper_task-card">
                    <div className="modal__item modal__item-card">
                      <h2>Задача - {title}</h2>
                    </div>
                    <div className="modal__item">
                      <h3>Описание задачи:</h3>
                      <h4>{description}</h4>
                    </div>
                    <div className="modal__item">
                      <h3>Время до окончания выполнения задачи: </h3>
                      <h4> {timeOfWork} дней</h4>
                    </div>
                    <SubtaskList subtask={taskEntity.subTasks} />
                    <SubtaskCreate task={task} />
                  </div>
                </div>
              </div>
            </>,
            document.body
          )}
        </>
      );
    } else {
      return null;
    }
  };
  return <>{renderPortal()}</>;
};

export default TaskCard;

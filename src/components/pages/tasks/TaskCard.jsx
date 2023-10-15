import { createPortal } from "react-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SubtaskCreate from "./subtasks/actions/SubtaskCreate";
import { useEffect } from "react";
import { taskFetching } from "../../../redux/actions/taskActions";
import SubtaskList from "./subtasks/SubtaskList";

const TaskCard = ({ task }) => {
  const { id, title, description, ProjectId } = task;
  const taskEntity = useSelector((state) => state.tasks.task);

  const [portalVisible, setPortalVisible] = useState(false);
  const overlayActive = portalVisible ? "modal__overlay_active" : "";

  const dispatch = useDispatch();
  const taskLoadingStatus = useSelector((state) => state.tasks.taskLoadingStatus);

  useEffect(() => {
    dispatch(taskFetching(ProjectId, id));
  }, []);

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal modal_task modal_task-card`}>
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
                  <SubtaskList subtask={taskEntity.subTasks} />
                  <SubtaskCreate task={task} />
                </div>
              </div>
              <div
                onClick={() => setPortalVisible(!portalVisible)}
                className={`modal__overlay ${overlayActive}`}
              ></div>
            </>,
            document.body
          )}
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <h2 onClick={() => setPortalVisible(!portalVisible)}>Тест</h2>
      {renderPortal()}
    </>
  );
};

export default TaskCard;

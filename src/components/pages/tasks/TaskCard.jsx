import { createPortal } from "react-dom";
import { useState } from "react";
import Change from "../../../assets/Change.svg";
import Delete from "../../../assets/Delete.svg";
import SubtaskCreate from "./actions/subtasks/SubtaskCreate";

const TaskCard = ({ task }) => {
  const [portalVisible, setPortalVisible] = useState(false);

  const { id, title, description, subTasks, priority, ProjectId, isQueue, isDevelopment, isDone } =
    task;

  const renderPortal = () => {
    if (portalVisible) {
      return (
        <>
          {createPortal(
            <>
              <div className={`modal modal_task modal_task-card`}>
                <div className="modal__header">
                  <h2 className="modal__title">Редактирование задачи</h2>
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
                  <div className="subtask">
                    <h4 className="subtask__header">Подзадачи</h4>
                    {subTasks.map((task) => (
                      <div key={task.id} className="subtask__card">
                        <div className="subtask__leftSide">
                          <input type="checkbox" className="subtask__checkbox" />
                          <div className="substask__descr">{task.description}</div>
                        </div>
                        <div className="subtask__rightSide">
                          <img src={Change} alt="Change" />
                          <img src={Delete} alt="Delete" />
                        </div>
                      </div>
                    ))}
                    <SubtaskCreate />
                  </div>
                </div>

                <div className="modal__footer modal__footer_task"></div>
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
  return (
    <>
      <h2 onClick={() => setPortalVisible(!portalVisible)}>Тест</h2>
      {renderPortal()}
    </>
  );
};

export default TaskCard;

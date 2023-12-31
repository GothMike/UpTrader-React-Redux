import ProjectCreate from "../pages/projects/actions/ProjectCreate";
import TaskCreate from "../pages/tasks/actions/TaskCreate";
import SearchPanel from "../searchPanel/SearchPanel";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const id = useParams();
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const Create = isEmpty(id) ? <ProjectCreate /> : <TaskCreate id={id} />;
  const backToProject = isEmpty(id) ? null : (
    <Link to={`/projects`}>
      <button className="button button__edit">Вернуться на страницу с объектами</button>
    </Link>
  );

  return (
    <>
      <header className="header">
        <h1 className="header__title">
          Добро пожаловать веб-приложение <br />
          <span>UpTrader</span>
        </h1>

        <div className="header__wrapper">
          <SearchPanel />
          <div className="header__buttons">
            {backToProject}
            {Create}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

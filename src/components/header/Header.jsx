import ProjectCreate from "../pages/projects/actions/ProjectCreate";

const Header = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">
          Добро пожаловать веб-приложение <br />
          <span>UpTrader</span>
        </h1>
        <div className="header__wrapper">
          <form className="header__search">
            <input
              className="header__input"
              placeholder="Поиск"
              aria-label="Поиск"
              name="search"
              type="text"
            />
          </form>
          <ProjectCreate />
        </div>
      </header>
    </>
  );
};

export default Header;

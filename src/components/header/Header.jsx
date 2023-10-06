import { useDispatch } from "react-redux";
import { toogleModal } from "../../redux/actions/projectActions";

const Header = () => {
  const dispatch = useDispatch();
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
          <button onClick={() => dispatch(toogleModal())} className="button">
            Создать
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;

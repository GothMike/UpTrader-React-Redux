import { Link } from "react-router-dom";
import Container from "../../container/Container";
const Page404 = () => {
  return (
    <Container>
      <div className="error">
        <h1>К сожалению такой страницы не существует</h1>
        <Link to="/">Вернуться на начальную страницу</Link>
      </div>
    </Container>
  );
};

export default Page404;

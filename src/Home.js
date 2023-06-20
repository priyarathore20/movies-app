import Movie from "./Movies";
import Search from "./Search";

const Home = () => {
  return (
    <>
      <div className="container">
        <Search />
        <Movie />
      </div>
    </>
  );
};

export default Home;
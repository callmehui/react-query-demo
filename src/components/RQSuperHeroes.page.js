import { Link } from "react-router-dom";
import { useSuperHeroerData } from "../hooks/useSuperHeroesData";

/** SuperHeros页 */
const RQSuperHeroesPage = () => {
  const { isLoading, isFetching, isError, data, error, refetch } =
    useSuperHeroerData();

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      <button onClick={refetch}>refresh</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroesPage;

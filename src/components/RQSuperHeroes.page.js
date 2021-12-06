import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useSuperHeroerData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";

/** SuperHeros页 */
const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { isLoading, isFetching, isError, data, error, refetch } =
    useSuperHeroerData();

  const { mutate } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    mutate({ name, alterEgo });
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heros Page</h2>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add super Hero</button>
      </div>
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

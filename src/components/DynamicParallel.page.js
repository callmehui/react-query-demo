import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

/** 动态并行查询 */
const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((heroId) => ({
      queryKey: ["super-hero", heroId],
      queryFn: () => fetchSuperHero(heroId),
    }))
  );

  console.log({ queryResults });

  return <div>DynamicParallelPage</div>;
};

export default DynamicParallelPage;

import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// const fetchSuperHeroData = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

const fetchSuperHeroData = ({ queryKey }) => {
  /** queryKey 为 useQuery的第一个参数，所以heroId为queryKey第二个参数 */
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  // return useQuery(["super-hero", heroId], () => fetchSuperHeroData(heroId));

  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetchSuperHeroData, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};

import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

/** superHero detail */
const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  const { isLoading, isError, data, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperHeroPage;

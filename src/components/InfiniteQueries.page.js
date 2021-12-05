import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    data,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h3 key={color.id}>
                  {color.id}. {color.name}
                </h3>
              ))}
            </Fragment>
          );
        })}
      </div>

      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
        <div>{isFetching && !isFetchingNextPage ? "fetching..." : null}</div>
      </div>
    </>
  );
};

export default InfiniteQueriesPage;

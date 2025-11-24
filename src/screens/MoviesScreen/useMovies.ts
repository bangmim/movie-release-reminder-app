import { useCallback, useMemo } from 'react';

import { getDiscoverMovies } from '../../modules/ApiRequest';
import { useInfiniteQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Movie } from '../../types';

const useMovies = () => {
  const getUpcomingMovies = useCallback(async ({ pageParam = 1 }) => {
    const result = await getDiscoverMovies({
      releaseDateGte: moment().format('YYYY-MM-DD'),
      releaseDateLte: moment().add(1, 'years').format('YYYY-MM-DD'),
      page: pageParam,
    }).catch(error => console.log(error));
    return result;
  }, []);

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['upcoming-movies'],
      queryFn: getUpcomingMovies,
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        if (
          lastPage &&
          'page' in lastPage &&
          lastPage.page < lastPage.totalPages
        ) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  const movies = useMemo(() => {
    return data?.pages.reduce<Movie[]>((allMovies, page) => {
      if (page && 'results' in page) {
        return allMovies.concat(page.results);
      }
      return allMovies;
    }, []);
  }, [data]);

  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);
  return {
    movies,
    isLoading,
    loadMore,
    canLoadMore: hasNextPage,
    refresh,
  };
};

export default useMovies;

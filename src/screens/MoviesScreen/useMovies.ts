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
    const allMovies = data?.pages.reduce<Movie[]>((acc, page) => {
      if (page && 'results' in page) {
        return acc.concat(page.results);
      }
      return acc;
    }, []);

    // 개발 모드에서 오늘 날짜인 테스트 영화 추가
    let moviesWithTest = allMovies || [];
    if (__DEV__) {
      const today = moment().format('YYYY-MM-DD');
      const hasTodayMovie = moviesWithTest.some(
        movie => movie.releaseDate === today,
      );

      if (!hasTodayMovie) {
        const testMovie: Movie = {
          id: 999999, // 테스트용 고유 ID
          title: '테스트 영화 (오늘 개봉)',
          originalTitle: 'Test Movie (Released Today)',
          releaseDate: today,
          overview:
            '푸시 알림 테스트를 위한 테스트 영화입니다. 이 영화의 알림은 5초 후에 도착합니다.',
          postUrl: null,
        };
        moviesWithTest = [testMovie, ...moviesWithTest];
      }
    }

    // 개봉일 순서로 정렬 (오름차순: 빠른 날짜부터)
    return moviesWithTest.sort((a, b) => {
      const dateA = moment(a.releaseDate);
      const dateB = moment(b.releaseDate);

      // 날짜가 없는 경우 뒤로 보냄
      if (!dateA.isValid() && !dateB.isValid()) {
        return 0;
      }
      if (!dateA.isValid()) {
        return 1;
      }
      if (!dateB.isValid()) {
        return -1;
      }

      return dateB.diff(dateA);
    });
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

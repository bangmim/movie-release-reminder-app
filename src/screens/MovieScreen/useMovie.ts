import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getMovieDetails } from '../../modules/ApiRequest';
import moment from 'moment';

interface useMovieParams {
  id: number;
}
const useMovie = ({ id }: useMovieParams) => {
  const getMovie = useCallback(async () => {
    // 테스트 영화인 경우 더미 데이터 반환
    if (__DEV__ && id === 999999) {
      const today = moment().format('YYYY-MM-DD');
      return {
        id: 999999,
        genres: [],
        title: '테스트 영화 (오늘 개봉)',
        originalTitle: 'Test Movie (Released Today)',
        overview:
          '푸시 알림 테스트를 위한 테스트 영화입니다. 이 영화의 알림은 5초 후에 도착합니다.',
        posterUrl: null,
        releaseDate: today,
        runtime: null,
        casts: [],
        crews: [],
        videos: [],
      };
    }
    return getMovieDetails({ id });
  }, [id]);

  const { data, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: getMovie,
  });

  return {
    movie: data,
    isLoading,
  };
};

export default useMovie;

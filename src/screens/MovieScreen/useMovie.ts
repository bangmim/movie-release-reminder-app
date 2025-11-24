import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getMovieDetails } from '../../modules/ApiRequest';

interface useMovieParams {
  id: number;
}
const useMovie = ({ id }: useMovieParams) => {
  const getMovie = useCallback(() => getMovieDetails({ id }), [id]);
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

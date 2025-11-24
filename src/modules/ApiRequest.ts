import axios from 'axios';
import { Movie } from '../types';
import moment from 'moment';

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjMyZTBmOTM1YjFkMTczNmY5ZDUzMzBjZWJlNjBlNyIsIm5iZiI6MTczMDcwMTYyOS41ODgwMTM2LCJzdWIiOiI2NmQ5M2JiZDhmYTkyM2M4YmNiZDliMzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MiZszl5cMlJwR8DpuPKwg3D0LNxyfwQuagbnALa9hfg';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
    language: 'ko-KR',
  },
});
const getImageUrl = (path: string | null) =>
  path !== null ? `${IMG_URL}/${path}` : null;
interface MovieResponse {
  poster_path: string | null;
  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  title: string;
}
interface GetDiscoverMoviesResponse {
  page: number;
  results: MovieResponse[];
  total_results: number;
  total_pages: number;
}
interface GetDiscoverMoviesParams {
  releaseDateGte?: string;
  releaseDateLte?: string;
  page?: number;
}

interface getMovieDetailParams {
  id: number;
}
interface GetCreditsResponse {
  cast: {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string | null;
    character: string;
  }[];
  crew: {
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string | null;
    job: string;
  }[];
}
interface GetVideosResponse {
  results: {
    name: string;
    key: string;
    site: string;
    type: string;
    id: string;
  }[];
}
interface GetReleaseDateResponse {
  id: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      iso_639_1: string;
      release_date: string;
      type: number;
      note: string;
    }[];
  }[];
}
interface GetMovieResponse {
  id: number;
  genres: {
    id: number;
    name: string;
  };
  title: string;
  original_title: string;
  overview: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: string | null;
  videos: GetVideosResponse;
  release_dates: GetReleaseDateResponse;
}

export const getDiscoverMovies = async ({
  releaseDateGte,
  releaseDateLte,
  page,
}: GetDiscoverMoviesParams) => {
  // 개봉 예정 영화
  const response = await instance.get<GetDiscoverMoviesResponse>(
    'discover/movie',
    {
      params: {
        ['release_date.gte']: releaseDateGte,
        ['release_date.lte']: releaseDateLte,
        language: 'ko',
        page: page,
      },
    },
  );

  const movies: Movie[] = response.data.results.map<Movie>(r => ({
    id: r.id,
    title: r.title,
    originalTitle: r.original_title,
    releaseDate: r.release_date,
    overview: r.overview,
    postUrl: getImageUrl(r.poster_path),
  }));

  return {
    page: response.data.page,
    results: movies,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  };
};
export const getMovieDetails = async ({ id }: getMovieDetailParams) => {
  const { data: movie } = await instance.get<GetMovieResponse>(`movie/${id}`, {
    params: {
      append_to_response: 'credit,videos,release_dates',
      language: 'ko',
    },
  });

  const { data: credits } = await instance.get<GetCreditsResponse>(
    `movie/${id}/credits`,
  );
  const releaseDate = (() => {
    const releaseDateKR = movie.release_dates.results.find(
      r => r.iso_3166_1 === 'KR',
    )?.release_dates[0].release_date;

    if (releaseDateKR !== null) {
      return moment(releaseDateKR).format('YYYY-MM-DD');
    }
    return movie.release_date;
  })();

  return {
    id: movie.id,
    genres: movie.genres,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterUrl: getImageUrl(movie.poster_path),
    releaseDate: releaseDate,
    runtime: movie.runtime,
    casts: credits.cast.map(cast => ({
      id: cast.id,
      knownForDepartment: cast.known_for_department,
      name: cast.name,
      profileUrl: getImageUrl(cast.profile_path),
      character: cast.character,
    })),
    crews: credits.crew.map(crew => ({
      id: crew.id,
      knownForDepartment: crew.known_for_department,
      name: crew.name,
      profileUrl: getImageUrl(crew.profile_path),
      job: crew.job,
    })),
    videos: movie.videos.results.map(video => ({
      name: video.name,
      key: video.key,
      site: video.site,
      type: video.type,
      id: video.id,
    })),
  };
};

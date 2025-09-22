interface BaseRecommendation {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

interface MovieRecommendation extends BaseRecommendation {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

interface SeriesRecommendation extends BaseRecommendation {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type Recommendation = MovieRecommendation | SeriesRecommendation;

export interface Recommendations {
  page: number;
  results: Recommendation[];
  total_pages: number;
  total_results: number;
}

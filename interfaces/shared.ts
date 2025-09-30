import { PersonShort } from "./person";

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface BaseShortMedia {
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

export interface MovieShort extends BaseShortMedia {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface SeriesShort extends BaseShortMedia {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export type MediaShort = MovieShort | SeriesShort;

export type CombinedShort = MovieShort | SeriesShort | PersonShort;

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

import { MovieShort, SeriesShort } from "./shared";

export type Recommendation = MovieShort | SeriesShort;

export interface Recommendations {
  page: number;
  results: Recommendation[];
  total_pages: number;
  total_results: number;
}

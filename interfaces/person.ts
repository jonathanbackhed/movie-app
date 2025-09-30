import { Gender } from "@/constants/enums";
import { MovieShort, SeriesShort } from "@/interfaces/shared";
import { Image } from "@/interfaces/images";

export interface Person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: Gender;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}

export interface PersonShort {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
  known_for: (MovieShort | SeriesShort)[];
}

export interface PersonMovieCredit extends MovieShort {
  character: string;
  credit_id: string;
  order: number;
}
export interface PersonMovieJobCredit extends MovieShort {
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonSeriesCredit extends SeriesShort {
  character: string;
  credit_id: string;
  episode_count: number;
  first_credit_air_date: string;
}
export interface PersonSeriesJobCredit extends SeriesShort {
  credit_id: string;
  department: string;
  job: string;
  episode_count: number;
  first_credit_air_date: string;
}

export interface PersonExternalIds {
  id: number | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  imdb_id: string | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
}

export interface PersonImages {
  id: number;
  profiles: Image[];
}

export interface PersonCredits {
  id: number;
  cast: (PersonMovieCredit | PersonSeriesCredit)[];
  crew: (PersonMovieJobCredit | PersonSeriesJobCredit)[];
}

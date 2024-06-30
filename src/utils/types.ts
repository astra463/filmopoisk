export interface Actor {
  name: string;
  photo: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  release_year: number;
  actors?: Actor[];
  rating?: number;
  poster: string;
  total_rates_count?: number;
}

export type MoviesServerResponse = {
  search_result: Movie[],
  total_pages: number;
}

export interface MoviesItem extends Movie {
  isLarge: boolean;
}
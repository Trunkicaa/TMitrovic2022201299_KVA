export interface Actor {
  actorId: number;
  name: string;
  createdAt: string;
}

export interface MovieActor {
  movieActorId: number;
  movieId: number;
  actorId: number;
  actor: Actor;
}

export interface Genre {
  genreId: number;
  name: string;
  createdAt: string;
}

export interface MovieGenre {
  movieGenreId: number;
  movieId: number;
  genreId: number;
  genre: Genre;
}

export interface Director {
  directorId: number;
  name: string;
  createdAt: string;
}

export interface Projection {
  startTime: string; 
}

export enum PriceType {
  Normal = 300,
  VIP = 500,
  Premium3D = 700
}

export interface Movie {
  movieId: number;
  internalId: string;
  corporateId: string;
  directorId: number;
  title: string;
  originalTitle: string;
  description: string;
  shortDescription: string;
  poster: string;
  startDate: string;
  shortUrl: string;
  runTime: number;
  active: boolean;
  createdAt: string;
  updatedAt: string | null;
  price: PriceType[];
  userRating: boolean | null;
  

  projection: Projection[];
  director: Director;
  movieActors: MovieActor[];
  movieGenres: MovieGenre[];
}

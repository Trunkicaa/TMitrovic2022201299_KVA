import axios from 'axios';

const client = axios.create({
  baseURL: 'https://movie.pequla.com/api',
  headers: {
    'Accept': 'application/json'
  }
});

export class MovieService {
  static async getMovies(search: string = '', size: number=0, page:number=12) {
  return client.get('/movie', {
    params: {
      search: search
    }
  });
}


  static async getMovieById(id: number) {
    return client.get(`/movie/${id}`);
  }
}


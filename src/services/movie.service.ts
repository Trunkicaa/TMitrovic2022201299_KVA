import axios from 'axios';


const client = axios.create({
  baseURL: 'https://movie.pequla.com/api',
  headers: {
    Accept: 'application/json',
  },
});

export class MovieService {
  static async getMovies(search = '', size = 0, page = 12) {
    return client.get('/movie', {
      params: { search, size, page },
    });
  }

  static async getMovieById(id: number) {
    return client.get(`/movie/${id}`);
  }

  static async getGenres(): Promise<{ data: any[] }> {
  return client.get('/genre');
}

const now = new Date();
const iso = now.toISOString(); // ✅ "2025-07-01T14:23:45.000Z"


}

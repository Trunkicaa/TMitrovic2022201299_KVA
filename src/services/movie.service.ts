import axios from 'axios';
import { PriceType, Projection } from '../models/movie.model';
import { Movie } from '../models/movie.model';
import { Injectable } from '@angular/core';



const client = axios.create({
  baseURL: 'https://movie.pequla.com/api',
  headers: {
    Accept: 'application/json',
  },
});

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  static async getMovies(search = '', size = 0, page = 12) {
    return client.get('/movie', {
      params: { search, size, page },
    });
  }

  static async getMovieById(id: number): Promise<{ data: Movie }> {
    return client.get(`/movie/${id}`);
  }

  static async getGenres(): Promise<{ data: any[] }> {
    return client.get('/genre');
  }

  static generateProjections(): Projection[] {
    const projections: Projection[] = [];
    const now = new Date();

    for (let i = 0; i < 10; i++) {
      const projDate = new Date(now);
      projDate.setDate(now.getDate() + i);
      projections.push({ startTime: projDate.toISOString() });
    }
    return projections;
  }

  public static priceToLabel(price: number): string {
    switch (price) {
      case PriceType.Normal: return 'Normal (300€)';
      case PriceType.VIP: return 'VIP (500€)';
      case PriceType.Premium3D: return 'Premium 3D (700€)';
      default: return price.toString();
    }
  }

}




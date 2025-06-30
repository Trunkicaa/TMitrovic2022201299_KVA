import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: Movie[] | null = null
  public error: string | null = null

  constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        // rsp.data contains all movies; show only first 12
        this.movies = rsp.data.slice(0, 12);
      })
      .catch(e => this.error = `${e.code}: ${e.message}`);

  }
}

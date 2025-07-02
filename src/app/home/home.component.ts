import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public movies: Movie[] | null = null
  public error: string | null = null
  public user: UserModel | null = null;

  ngOnInit() {
    this.user = UserService.getActiveUser();

    MovieService.getMovies()
      .then(rsp => {
        this.movies = rsp.data.slice(0, 12);
      })
      .catch(e => this.error = `${e.code}: ${e.message}`);
  }

  constructor(public utils: UtilsService) {
  this.user = UserService.getActiveUser();

  MovieService.getMovies()
    .then(rsp => {
      this.movies = rsp.data.slice(0, 12);
    })
    .catch(e => this.error = `${e.code}: ${e.message}`);
}
}



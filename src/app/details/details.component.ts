import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { CommonModule, NgIf } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details',
  imports: [NgIf, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  public movie: Movie | null = null;
  public userRating: boolean | null = null;
  public user: UserModel | null = null;
  

  constructor(
    private route: ActivatedRoute,
    public utils: UtilsService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  this.user = UserService.getActiveUser();

  const id = +this.route.snapshot.params['id'];
  MovieService.getMovieById(id).then((response: { data: Movie }) => {
    this.movie = response.data;
    const storedRatings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    this.userRating = storedRatings[id.toString()] ?? null;
    console.log('Movie id:', id);
    console.log('Stored ratings:', storedRatings);
    console.log('User rating for this movie:', this.userRating);
  });
}

  get projectionList(): string {
  if (!this.movie?.projection?.length) return 'N/A';
  return this.movie.projection
    .map(p => new Date(p.startTime).toLocaleString())
    .join(', ');
}

  get genreList(): string {
    if (!this.movie?.movieGenres?.length) return 'N/A';
    return this.movie.movieGenres.map(mg => mg.genre?.name ?? 'Unknown').join(', ');
  }

  get actorList(): string {
    if (!this.movie?.movieActors?.length) return 'N/A';
    return this.movie.movieActors.map(ma => ma.actor.name).join(', ');
  }
}

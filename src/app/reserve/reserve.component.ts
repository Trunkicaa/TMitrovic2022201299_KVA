import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie, MovieActor } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve',
  imports: [CommonModule, MatCardModule, NgIf, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, MatTableModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {
  public movie: Movie | null = null
  public selectedTicketCount: number = 1
  public selectedPrice: 300 | 500 | 700 = 300;
  public selectedProjectionTime: string | null = null;

  public constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      MovieService.getMovieById(movieId).then(response => {
        this.movie = response.data;
        console.log('Loaded movie:', this.movie);
        if (!this.movie.projection || this.movie.projection.length === 0) {
          this.movie.projection = MovieService.generateProjections();
        }
      });
    });
  }

  public doReserve() {
    if (!this.selectedProjectionTime) {
      alert('Please select a projection time!');
      return;
    }
    if (!this.movie) return;
    const result = UserService.createReservation({
      id: new Date().getTime(),
      movieId: this.movie.movieId,
      movieTitle: this.movie.title,
      director: this.movie.director.name,
      description: this.movie.shortDescription,
      pricePerItem: this.selectedPrice,
      ticketNumber: this.selectedTicketCount,
      rating: null,
      status: 'rezervisano',
      projectionTime: this.selectedProjectionTime,
      runTime: this.movie.runTime,
      startDate: this.movie.startDate,
      actors: this.movie.movieActors.map(ma => ma.actor.name)
    });

    result
      ? alert('Rezervacija uspesno dodata u korpu')
      : alert('An error occured while creating an order');
  }
}

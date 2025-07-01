import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CinemaModel } from '../../models/cinema.model';
import { CinemaService } from '../../services/cinema.service';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reserve',
  imports: [MatCardModule, NgIf, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatButtonModule, FormsModule, MatTableModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {
  public movie: Movie | null = null
  public cinema: CinemaModel[] = CinemaService.getCinemas()
  public selectedCinema: number = this.cinema[0].id
  public selectedTicketCount: number = 1
  public selectedPrice: number = 500 | 300

  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router: Router) {
    route.params.subscribe(params => {
      console.log(params)
      MovieService.getMovieById(params['id'])
        .then(rsp => {
          this.movie = rsp.data
        })
    })
  }

  public doReserve() {

    const result = UserService.createReservation({
      id: new Date().getTime(),
      movieId: this.movie!.movieId,
      movieTitle: this.movie!.title,
      director: this.movie!.director.name,
      description: this.movie!.description,
      cinema: CinemaService.getCinemaById(this.selectedCinema)!,
      pricePerItem: this.selectedPrice,
      ticketNumber: this.selectedTicketCount,
      status: 'rezervisano',
      rating: null,

    });

    result ? this.router.navigate(['/user']) : alert('An error occured while creating an order')
  }
}

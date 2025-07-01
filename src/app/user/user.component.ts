import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MovieService } from '../../services/movie.service';
import { ReserveModel } from '../../models/reserve.model';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-user',
  imports: [NgIf, MatButtonModule, MatCardModule, MatTableModule, RouterLink, MatExpansionModule, MatIconModule, MatInputModule, MatDatepickerModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  displayedColumns: string[] = ['movieId', 'movieTitle', 'cinema', 'director', 'ticketNumber', 'pricePerItem', 'total', 'status', 'actions'];
  public user: UserModel | null = null
  public userCopy: UserModel | null = null
  public movieList: any[] = [];


  constructor(private router: Router) {
    const activeUser = UserService.getActiveUser();

    if (!activeUser) {
      router.navigate(['/home']);
      return;
    }

    this.user = activeUser;
    this.userCopy = { ...activeUser };
   
    MovieService.getMovies('', 12, 1)
      .then(response => {
        this.movieList = response.data;
      })
      .catch(error => {
        console.error('Failed to load movies:', error);
      });
  }

  public doChangePassword() {
    const newPassword = prompt('Enter your new password')
    if (newPassword == '' || newPassword == null) {
      alert('Password cannot be empty')
      return
    }
    alert(UserService.changePassword(newPassword) ? 'Password has been changed' : 'Failed to change password')

  }

  public doCancel(reserve: ReserveModel) {
    if (UserService.changeReservationStatus('otkazano', reserve.id)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doWatch(reserve: ReserveModel) {
    if (UserService.changeReservationStatus('gledano', reserve.id)) {
      this.user = UserService.getActiveUser()
    }
  }

  public doRating(reserve: ReserveModel, rate: boolean) {
    if (UserService.changeRating(rate, reserve.id)) {
      this.user = UserService.getActiveUser()
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MovieService } from '../../services/movie.service';
import { ReserveModel } from '../../models/reserve.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-user',
  imports: [CommonModule ,NgIf, MatButtonModule, MatCardModule, MatTableModule, RouterLink, MatExpansionModule, MatIconModule, MatInputModule, MatDatepickerModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [ 'movieTitle', 'director', 'ticketNumber', 'pricePerItem', 'total', 'projectionTime', 'runTime', 'startDate', 'actors', 'status', 'actions'];
  public user: UserModel | null = null
  public userCopy: UserModel | null = null
  public movieList: any[] = [];
  reviewData: { [movieId: number]: { rating: number; comment: string } } = {};

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

  ngOnInit() {
    const activeUser = UserService.getActiveUser();
    if (!activeUser) {
      this.router.navigate(['/home']);
      return;
    }
    this.user = activeUser;
    console.log('Active user:', this.user);

    this.userCopy = { ...activeUser };

    MovieService.getMovies('', 12, 1)
      .then(response => {
        this.movieList = response.data;
      })
      .catch(error => {
        console.error('Failed to load movies:', error);
      });
    this.applyStoredRatingsToUserReservations();
  }

  public editReservation(reserve: ReserveModel) {
    const deleted = UserService.deleteReservation(reserve.id);

    if (!deleted) {
      alert('Failed to delete reservation');
      return;
    }

    if (this.user && this.user.reserve) {
      this.user.reserve = this.user.reserve.filter(r => r.id !== reserve.id);
    }

    this.router.navigate(['/details', reserve.movieId, 'reserve']);
  }

  public deleteReservation(reserve: ReserveModel) {
    const confirmed = confirm('Are you sure you want to delete this reservation?');
    if (!confirmed) return;

    const deleted = UserService.deleteReservation(reserve.id);

    if (!deleted) {
      alert('Failed to delete reservation');
      return;
    }

    if (this.user && this.user.reserve) {
      this.user.reserve = this.user.reserve.filter(r => r.id !== reserve.id);
    }
  }

  public changePassword() {
    const newPassword = prompt('Enter your new password')
    if (newPassword == '' || newPassword == null) {
      alert('Password cannot be empty')
      return
    }
    alert(UserService.changePassword(newPassword) ? 'Password has been changed' : 'Failed to change password')
  }

  public changeAddress() {
    const newAddress = prompt('Enter your new address')
    if (newAddress == '' || newAddress == null) {
      alert('Address cannot be empty')
      return
    }
    alert(UserService.changeAddress(newAddress) ? 'Address has been changed' : 'Failed to change address')
  }

  public changeFirstName() {
    console.log("changeFirstName called");
    const newFirstName = prompt('Enter your new first name');
    if (newFirstName == '' || newFirstName == null) {
      alert('First Name cannot be empty');
      return;
    }
    alert(UserService.changeFirstName(newFirstName) ? 'First Name has been changed' : 'Failed to change first name');
  }


  public changeLastName() {
    const newLastName = prompt('Enter your new last name')
    if (newLastName == '' || newLastName == null) {
      alert('Last Name cannot be empty')
      return
    }
    alert(UserService.changeLastName(newLastName) ? 'Last Name has been changed' : 'Failed to change last name')
  }

  public changePhoneNumber() {
    const newPhoneNumber = prompt('Enter your new phone number');
    if (newPhoneNumber == null || newPhoneNumber.trim() === '') {
      alert('Phone number cannot be empty');
      return;
    }

    const validPattern = /^[0-9+\-\s()]+$/;
    if (!validPattern.test(newPhoneNumber)) {
      alert('Phone number contains invalid characters. Only digits, spaces, +, -, and parentheses are allowed.');
      return;
    }

    const digitsOnly = newPhoneNumber.replace(/\D/g, '');

    if (digitsOnly.length > 15) {
      alert('Phone number must contain less than 15 digits and be valid.');
      return;
    }

    alert(UserService.changePhoneNumber(newPhoneNumber) ? 'Phone number has been changed' : 'Failed to change phone number');
  }



  public doCancel(reserve: ReserveModel) {
    if (UserService.changeReservationStatus('otkazano', reserve.id)) {
      this.user = UserService.getActiveUser();
    }
  }

  public doWatch(reserve: ReserveModel) {
    if (UserService.changeReservationStatus('gledano', reserve.id)) {
      this.user = UserService.getActiveUser();
      const userReserve = this.user?.reserve.find(r => r.id === reserve.id);

      if (userReserve && userReserve.rating === undefined) {
        userReserve.rating = null;
      }
      this.applyStoredRatingsToUserReservations();
    }
  }

  applyStoredRatingsToUserReservations() {
    if (!this.user || !this.user.reserve) return;

    const storedRatings = JSON.parse(localStorage.getItem('movieRatings') || '{}');

    for (const reservation of this.user.reserve) {
      const rating = storedRatings[reservation.movieId?.toString() || ''];
      if (rating !== undefined) {
        reservation.rating = rating;
      }
    }
  }


  doRating(reserve: ReserveModel, liked: boolean) {
    let storedRatings = JSON.parse(localStorage.getItem('movieRatings') || '{}');
    storedRatings[reserve.movieId.toString()] = liked;
    localStorage.setItem('movieRatings', JSON.stringify(storedRatings));
    reserve.rating = liked;

    if (this.user) {
      const index = this.user.reserve.findIndex(r => r.id === reserve.id);
      if (index !== -1) {
        this.user.reserve[index].rating = liked;
      }
    }
  }
}

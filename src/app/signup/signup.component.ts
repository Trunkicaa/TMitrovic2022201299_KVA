import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  imports: [NgIf, ReactiveFormsModule, NgFor, MatCardModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, RouterLink, MatPseudoCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public genres: string[] = [];
  public selectedGenres: { [key: string]: boolean } = {};

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
    MovieService.getGenres()
      .then(response => {
        const genreObjects = response.data;
        this.genres = genreObjects.map(g => g.name); 
        this.genres.forEach(genre => (this.selectedGenres[genre] = false));
        this.cdr.markForCheck();
      })
      .catch(error => console.error('Error loading genres:', error));
  }

  doSignup() {
    const chosenGenres = Object.keys(this.selectedGenres).filter((g) => this.selectedGenres[g]);
    if (this.email == '' || this.password == '') {
      alert('Email or/and password require filled forms')
    }
    if (this.password !== this.repeatPassword) {
      alert('LOZINKA SE NE PODUDARA')
      return
    }


    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: Number(this.phone),
      address: this.address,
      reserve: [],
      selectedGenres: chosenGenres
    })
    result ? this.router.navigate(['/login']): alert('Email is already taken')
  }


  public email = '';
  public password = '';
  public repeatPassword = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';
}
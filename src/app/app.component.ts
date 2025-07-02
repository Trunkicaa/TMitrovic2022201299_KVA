import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatCardModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public service = UserService

  public constructor(private router: Router) {}

  public doLogout() {
    localStorage.removeItem('active')
    this.router.navigate(['/login'])
  }
}

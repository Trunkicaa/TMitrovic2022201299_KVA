import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string = ''
  public password: string = ''

  constructor(private router: Router) { 
    if (UserService.getActiveUser()) {
      router.navigate([`/user`])
      return
    }
  }

  public doLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    const loggedIn = UserService.login(this.email, this.password);
    console.log('Login result:', loggedIn);

    if (loggedIn) {
      this.router.navigate(['/user']);
      return;
    }
    alert('Bad email or password');
  }

}

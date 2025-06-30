import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-user',
  imports: [JsonPipe,NgFor, NgIf, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  displayedColumns: string[] = ['movieId', 'movieTitle', 'director', 'actions','ticketNumber', 'pricePerItem', 'total'];
  public user: UserModel | null = null

  constructor(private router: Router, public utils: UtilsService) {
    const activeUser = UserService.getActiveUser();

    if (!activeUser) {
      router.navigate(['/home']);
      return; // IMPORTANT: stop further execution if no user
    }
    this.user = activeUser
  }


  public doChangePassword() {
    const newPassword = prompt('Enter your new password')
    if (newPassword == '' || newPassword == null) {
      alert('Password cannot be empty')
      return
    }
    alert(UserService.changePassword(newPassword) ? 'Password has been changed' : 'Failed to change password')

  }
}

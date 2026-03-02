import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthPocketbaseService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private authService: AuthPocketbaseService) {}

  logout() {
    this.authService.logout();
  }
}

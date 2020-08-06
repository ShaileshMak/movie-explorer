import { Component, OnInit } from '@angular/core';
import { genres } from '../genres';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  genresList: any[] = genres;
  searchQuery: String = '';
  yearQuery: String = '';
  isLoggedIn: Boolean = false;
  certifications: any[];

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.certifications = Constants.US_RATTING;
    this.router.events.subscribe(() => {
      this.isUserLoggedIn();
    })
  }

  searchMovieByYear(event: KeyboardEvent) {
    const currentYear: Number = new Date().getFullYear();
    const val: String = this.searchQuery;
    if (val && val.length === 4 && Number(val) > 1960 && Number(val) <= Number(currentYear)) {
      this.router.navigate(['movies/years/', val, 1]);
      this.searchQuery = '';
    } else {
      if (event.keyCode === 13)
        alert('Please enter valid year');
    }
  }

  searchMovie(event: KeyboardEvent) {
    const query: String = this.searchQuery;
    if (!isNaN(Number(query))) {
      this.searchMovieByYear(event);
      return;
    }
    this.router.navigate(['movies/search/', query, 1]);
    this.searchQuery = '';
  }

  logout(event: Event) {
    this.authService.LogoutUser();
    this.router.navigate(['login']);
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}

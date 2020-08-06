import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../model/Movie';
import { Constants } from '../../config/constants';
import { FavoriteMovieService } from '../favorite-movie.service';
import { FavoriteMovie } from 'src/model/FavoriteMovie';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  @Input() movie: Movie;

  url: string = '';
  showFavButton: Boolean = false;
  isFavorite: Boolean = false;

  constructor(private favoriteMovieService: FavoriteMovieService,
    private authService: AuthService) { }

  ngOnInit() {
    this.showFavButton = this.authService.isLoggedIn() || false;
    this.isFavorite = this.movie.isFavorite || false;
    this.url = this.movie.poster_path ? `https://image.tmdb.org/t/p/w200/${this.movie.poster_path}` : Constants.imagePlaceHolderURI;
  }

  toggleFavorite(event) {
    event.preventDefault();
    this.isFavorite = !this.isFavorite;
    this.isFavorite ? this.addToFavorite() : this.removeFromFavorite();
  }

  addToFavorite() {
    const favoriteMovie: FavoriteMovie = {
      userName: this.authService.getUserName(),
      movieId: this.movie.id,
      title: this.movie.title,
      poster_path: this.movie.poster_path,
    };

    this.favoriteMovieService.AddFavoriteMovie(favoriteMovie).subscribe(
      resp => {
        console.log(`added ${favoriteMovie.title} as favorite`);
      },
      err => {
        console.log(err)
      }
    )
  }

  removeFromFavorite() {
    const favoriteMovie: FavoriteMovie = {
      userName: this.authService.getUserName(),
      movieId: this.movie.id,
      title: this.movie.title,
      poster_path: this.movie.poster_path,
    };
    this.favoriteMovieService.RemoveFavoriteMovie(favoriteMovie).subscribe(
      resp => {
        console.log(`removed ${favoriteMovie.title} as favorite`);
      },
      err => {
        console.log(err)
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { genres } from '../genres';
import { Movie } from '../../model/Movie';
import { MoviesService } from '../../services/movies.service';
import { Constants } from '../../config/constants'
import { FavoriteMovieService } from '../favorite-movie.service';
import { FavoriteMovie } from 'src/model/FavoriteMovie';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movieTypes: string[] = ['popular', 'now_playing', 'upcoming', 'top_rated'];
  moviesTitle: string = '';
  popularMovies: Movie[];
  now_playingMovies: Movie[];
  upcomingMovies: Movie[];
  top_ratedMovies: Movie[];
  movies: Movie[];

  //pagination
  currentPage: number = 1;
  totalPages: number = 0;

  isLoggedIn: Boolean = false;

  isGenresType: Boolean = false;
  isCertificationType: Boolean = false;
  isYearType: Boolean = false;
  isByCast: Boolean = false;
  isSearchMovie: Boolean = false;
  isFavoriteMovie: Boolean = false;

  favoriteMoviesId: number[] = [];
  favoriteMovies = [];


  constructor(private route: ActivatedRoute,
    private favoriteMovieService: FavoriteMovieService,
    private moviesService: MoviesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.favoriteMovies.length <= 0 && this.loadFavoriteMovie();
    } else {
      this.loadMoviesForFlow()
    }

  }

  loadFavoriteMovie() {
    if (this.isLoggedIn) {
      return this.favoriteMovieService.GetFavoriteMovies().subscribe((data: any) => {
        this.favoriteMovies = data.movies.map(movie => ({ ...movie, isFavorite: true }));
        this.favoriteMoviesId = this.favoriteMovies.map(movie => { return movie.movieId });
        this.loadMoviesForFlow();
      });
    }
  }

  loadMoviesForFlow() {
    this.route.params.subscribe(params => {
      const path = this.route.snapshot.routeConfig.path;
      const rountConf = Constants.routes;
      const allowedPath = [
        rountConf.HOME,
        rountConf.MOVIE_BY_CAST,
        rountConf.MOVIE_BY_YEAR,
        rountConf.MOVIE_GENRE,
        rountConf.MOVIE_CERTIFICATION,
        rountConf.MOVIE_SEARCH,
        rountConf.FAVOURITE_MOVIE
      ];
      if (allowedPath.indexOf(path) > -1) {
        const genreId = this.route.snapshot.params.genre;
        this.isGenresType = genreId ? true : false;

        const certificationId = this.route.snapshot.params.certification;
        this.isCertificationType = certificationId ? true : false;

        const yearId = this.route.snapshot.params.year;
        this.isYearType = yearId ? true : false;

        const castId = this.route.snapshot.params.cast;
        this.isByCast = castId ? true : false;

        const searchId = this.route.snapshot.params.query;
        this.isSearchMovie = searchId ? true : false;

        this.isFavoriteMovie = path.indexOf(rountConf.FAVOURITE_MOVIE) > -1

        if (this.isGenresType) {
          this.loadGenreMovies(genreId);
        } else if (this.isCertificationType) {
          this.loadCertificationMovies(certificationId);
        } else if (this.isYearType) {
          this.loadYearMovies(yearId);
        } else if (this.isByCast) {
          this.loadMoviesByCast(castId);
        } else if (this.isSearchMovie) {
          this.searchMovie(searchId);
        } else if (this.isFavoriteMovie) {
          this.movies = this.favoriteMovies;
        } else {
          this.movieTypes.forEach(type => this.loadMovies(type));
        }
      }
    });
    this.currentPage = 1;
  }

  loadMovies(type: string) {
    return this.moviesService.GetMovies(type).subscribe((data: any) => {
      this[`${type}Movies`] = this.applyFavorite(data.results);
    });
  }

  loadGenreMovies(genre: string,) {
    return this.moviesService.GetMovieByGenres(genre, this.currentPage).subscribe((data: any) => {
      this.movies = this.applyFavorite(data.results);
      const selectedGenre = genres.filter(function (g) {
        return g.id === Number(genre);
      });
      this.moviesTitle = `${selectedGenre[0].name} Movies`;
      this.setTotalPages(data.total_pages);
    });
  }

  loadCertificationMovies(certification: string,) {
    return this.moviesService.GetMovieByCertification(certification, this.currentPage).subscribe((data: any) => {
      this.movies = this.applyFavorite(data.results);
      this.moviesTitle = `${certification} rated Movies`;
    });
  }

  loadYearMovies(year: string) {
    return this.moviesService.GetMovieByYears(year, this.currentPage).subscribe((data: any) => {
      this.moviesTitle = `${year} Movies`;
      this.movies = this.applyFavorite(data.results);
      this.setTotalPages(data.total_pages);
    });
  }

  loadMoviesByCast(cast: string) {
    return this.moviesService.GetMovieByCast(cast, this.currentPage).subscribe((data: any) => {
      this.moviesTitle = `${this.route.snapshot.params.castName}'s Movies`;
      this.movies = this.applyFavorite(data.results);
      this.setTotalPages(data.total_pages);
    });
  }

  searchMovie(query: string) {
    return this.moviesService.SearchMovie(query, this.currentPage).subscribe((data: any) => {
      this.moviesTitle = `${query} Movies`;
      this.movies = this.applyFavorite(data.results);
      this.setTotalPages(data.total_pages);
    });
  }

  setTotalPages(totalPages) {
    this.totalPages = totalPages;
  }

  previousPage() {
    this.currentPage--;
    const routeList = this.route.snapshot.url.map(segment => segment.path);
    routeList[routeList.length - 1] = this.currentPage.toString();
    this.router.navigate(routeList);
  }

  nextPage() {
    this.currentPage++;
    const routeList = this.route.snapshot.url.map(segment => segment.path);
    routeList[routeList.length - 1] = this.currentPage.toString();
    this.router.navigate(routeList);
  }

  applyFavorite(movies) {
    let favMovies = movies;
    if (this.isLoggedIn) {
      favMovies = movies.map(movie => ({ ...movie, movieId: movie.id, isFavorite: this.favoriteMoviesId.indexOf(movie.id) > -1 }));
    }
    return favMovies;
  }

}

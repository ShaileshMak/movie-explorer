import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../services/movies.service';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  movie;
  url: string = '';
  movieGenre: string = '';
  movieCasts: any[] = [];
  isImageAvailable: Boolean = false;
  movieVideos: any[] = [];
  currentVideoID: string = '';
  currentVideoIndex: number = 0;
  showAllCast: Boolean = false;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private movieService: MoviesService) { }

  movieId: number;
  certification: string;
  certificationUrl: string;

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.params.id);
    this.setDetails()
    this.setMovieCasts();
    this.setMovieVideos();
    this.setMovieReleaseData();
  }

  setDetails() {
    return this.movieService.GetMovieById(this.movieId).subscribe((data: any) => {
      this.movie = data;
      data.genres && data.genres.length > 0 && this.setMovieGenre(data.genres);
      this.url = this.movie.poster_path ? `https://image.tmdb.org/t/p/w300/${this.movie.poster_path}` : Constants.imagePlaceHolderURI;
    });
  }

  setMovieCasts() {
    return this.movieService.GetMovieCast(this.movieId).subscribe((data: any) => {
      this.movieCasts = data.cast;
    });
  }

  setMovieVideos() {
    return this.movieService.GetMovieVideos(this.movieId).subscribe((data: any) => {
      this.movieVideos = data.results;
      this.changeVideo(0);
    });
  }

  setMovieReleaseData() {
    return this.movieService.GetMovieReleaseData(this.movieId).subscribe((data: any) => {
      let releaseData = data.results.filter(country => country.iso_3166_1 == 'US');
      this.certification = releaseData[0].release_dates[0].certification.toLowerCase();
      this.certificationUrl = `../../assets/${this.certification}_rated.png`;
    });
  }

  setMovieGenre(genres: string) {
    this.movieGenre = genres;
  }

  closeDetails() {
    this.location.back();
  }

  changeVideo(index: number) {
    this.currentVideoIndex = index;
    this.currentVideoID = this.movieVideos[index].key;
  }

}

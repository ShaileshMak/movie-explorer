import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';

import { Keys } from '../config/keys';
import { FavoriteMovie } from 'src/model/FavoriteMovie';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMovieService {
  baseurl = Keys.FAVOURITE_API_URI;
  constructor(private http:HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  httpBaseParams = new HttpParams();

  GetFavoriteMovies() {    
    return this.http.get<any>(`${this.baseurl}/`);
  }

  AddFavoriteMovie(favoriteMovie:FavoriteMovie) {
    return this.http.post<any>(`${this.baseurl}/add`, favoriteMovie);
  }

  RemoveFavoriteMovie(favoriteMovie:FavoriteMovie) {
    return this.http.post<any>(`${this.baseurl}/remove`, favoriteMovie);
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

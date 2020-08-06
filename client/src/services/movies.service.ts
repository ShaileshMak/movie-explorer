import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Keys } from '../config/keys';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseurl = Keys.MOVIE_API_URI;

  constructor(private http:HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpBaseParams = new HttpParams().set('api_key','db47087e5397fdc433250d440d49688d');
      //.set('certification','PG-13');
      //.set('sort_by','release_date.desc');
      //.set('with_original_language', 'te');

  GetMovies(type:string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/movie/${type}`, {params: this.httpBaseParams})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieById(id:number):Observable<any> {
    return this.http.get<any>(`${this.baseurl}/movie/${id}`, {params: this.httpBaseParams})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieByGenres(genre:string, pageNo:number):Observable<any> {
    var params = this.httpBaseParams.set('with_genres',genre).set('page', pageNo.toString());
    return this.http.get<any>(`${this.baseurl}/discover/movie`, {params:params})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieByCertification(certification:string, pageNo:number):Observable<any> {
    var params = this.httpBaseParams.set('certification.gte',certification).set('page', pageNo.toString());
    return this.http.get<any>(`${this.baseurl}/discover/movie`, {params:params})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieByYears(year:string, pageNo:number):Observable<any> {
    var params = this.httpBaseParams.set('primary_release_year',year).set('page', pageNo.toString());
    return this.http.get<any>(`${this.baseurl}/discover/movie`, {params:params})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieByCast(castId:string, pageNo:number):Observable<any> {
    var params = this.httpBaseParams.set('with_cast',castId).set('page', pageNo.toString());
    return this.http.get<any>(`${this.baseurl}/discover/movie`, {params:params})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  SearchMovie(query:string, pageNo:number):Observable<any> {
    var params = this.httpBaseParams.set('query',query).set('page', pageNo.toString());
    return this.http.get<any>(`${this.baseurl}/search/movie`, {params:params})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieCast(movieId:number):Observable<any> {
    return this.http.get<any>(`${this.baseurl}/movie/${movieId}/credits`, {params:this.httpBaseParams})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieVideos(movieId:number):Observable<any> {
    return this.http.get<any>(`${this.baseurl}/movie/${movieId}/videos`, {params:this.httpBaseParams})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
  }

  GetMovieReleaseData(movieId:number):Observable<any> {
    return this.http.get<any>(`${this.baseurl}/movie/${movieId}/release_dates`, {params:this.httpBaseParams})
    .pipe(
      (retry(1)),
      catchError(this.errorHandl)
    )
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

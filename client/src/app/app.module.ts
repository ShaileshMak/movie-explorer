import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth.service';
import { MoviesService } from '../services/movies.service';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailComponent } from './detail/detail.component';
import { MovieCastComponent } from './movie-cast/movie-cast.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { FavoriteMovieService } from './favorite-movie.service';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { SafeURLPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ThumbnailComponent,
    MoviesComponent,
    DetailComponent,
    MovieCastComponent,
    RegisterComponent,
    LoginComponent,
    YoutubePlayerComponent,
    SafeURLPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    MoviesService,
    FavoriteMovieService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

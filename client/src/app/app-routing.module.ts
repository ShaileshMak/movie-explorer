import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { MoviesComponent } from './movies/movies.component';
import { Constants } from '../config/constants';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: Constants.routes.REGISTER, component: RegisterComponent},
  { path: Constants.routes.LOGIN, component: LoginComponent},
  { path: Constants.routes.HOME, component: MoviesComponent, pathMatch: 'full'},
  { path: Constants.routes.MOVIE_GENRE, component: MoviesComponent },
  { path: Constants.routes.MOVIE_CERTIFICATION, component: MoviesComponent },
  { path: Constants.routes.FAVOURITE_MOVIE, component: MoviesComponent , canActivate: [AuthGuard]},
  { path: Constants.routes.MOVIE_BY_YEAR, component: MoviesComponent },
  { path: Constants.routes.MOVIE_BY_CAST, component: MoviesComponent },
  { path: Constants.routes.MOVIE_SEARCH, component: MoviesComponent },
  { path: Constants.routes.MOVIE_DETAIL, component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

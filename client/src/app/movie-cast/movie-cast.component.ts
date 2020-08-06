import { Component, OnInit, Input } from '@angular/core';
import { Cast } from '../../model/Cast';
import { Constants } from '../../config/constants'

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.css']
})
export class MovieCastComponent implements OnInit {

  @Input() cast: Cast;

  url:string = '';

  constructor() { }

  ngOnInit() {
    this.url = this.cast.profile_path ? `https://image.tmdb.org/t/p/w200/${this.cast.profile_path}` : Constants.imagePlaceHolderURI;
  }
  
}

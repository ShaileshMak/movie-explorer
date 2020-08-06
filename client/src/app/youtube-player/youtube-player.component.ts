import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {
  private BASE_URL: string = 'https://www.youtube.com/embed/'
  videoURL: string;
  private _videoId: string;

  @Input() set videoId(value: string) {
    this._videoId = value;
    this.videoURL = `${this.BASE_URL}${this.videoId}`;
  }

  get videoId(): string {
    return this._videoId;
  }

  constructor() { }

  ngOnInit() { }
}

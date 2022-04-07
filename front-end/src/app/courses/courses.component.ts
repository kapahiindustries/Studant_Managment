import { Component, OnInit, ViewChild } from '@angular/core';

import { VimeoService } from '../services/vimeo.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  user: string = 'michaelbattcock';

  videos: any;
  albums: any;
  videoUrl: any;
  videoDescription: any;

  constructor(private _vimeoService: VimeoService) { }

  ngOnInit() {
    this.videos = this._vimeoService.getVideos(this.user);
    this.videos.subscribe((x: any) => {
      console.log("======", x[0])
      this.videoUrl = x[0].url;
      this.videoDescription = x[0].title;
    })
  }

  public setVideo(url: any, description: any) {
    this.videoUrl = url;
    this.videoDescription = description;
  }

}

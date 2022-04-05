import { Component, OnInit, ViewChild } from '@angular/core';

import { VimeoService } from '../services/vimeo.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  user: string = 'user171569630';

  videos: any;
  albums: any;

  constructor(private _vimeoService: VimeoService) { }

  ngOnInit() {
    this.videos = this._vimeoService.getVideos(this.user);

    this.videos.subscribe((x: any) => {
      console.log('videos');
      console.log(x);
    })
  }

}

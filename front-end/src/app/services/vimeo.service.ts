import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class VimeoService {

    constructor(private http: HttpClient) { }

    getVideos(user: any) {
        return this.http.get('https://vimeo.com/api/v2/' + user + '/videos.json');

    }

}
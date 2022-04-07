import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class VimeoService {

    constructor(private http: HttpClient) { }

    getVideos(user: any) {
        return this.http.get('../assets/vimeo.json');

    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../constant/constants';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})


/**
 * This class is for creating services related to user management
 */
export class AuthService {

    constructor(private readonly httpClient: HttpClient) {
    }

    /**
   * method to add user
   */
    public login(postData: Object): Observable<LoginModel> {
        const endPoint = 'api/login';
        return this.httpClient.post<LoginModel>(`${environment.baseUrl}${endPoint}`, postData);
    }

}


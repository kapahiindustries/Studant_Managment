import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = localStorage.getItem('token');
        const headersItem = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${authToken}`)
            .set('Access-Control-Allow-Origin', '*')

        const customReq = request.clone({ headers: headersItem });

        return next.handle(customReq);
    }
}

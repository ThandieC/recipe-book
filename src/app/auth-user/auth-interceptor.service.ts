import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthUserService } from './auth-user.service';
import { from } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor (
        private authService: AuthUserService,
        private store: Store<fromApp.AppState>
    ) { }
    
    intercept( req: HttpRequest<any>, next: HttpHandler ) {

        return this.store.select('auth').pipe(
            take( 1 ),
            map( authState => {
                return authState.user
            }),
            exhaustMap( user => { 

                if ( !user ) {
                    return next.handle(req)
                }
                
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle( modifiedReq );
            } )
        );
        
    }

}

// the function take(number) ensures that we take values from Subscription only a specified number of times, and after that automayically
// unsubscribe. It prevents an ongoing subscription which is not necessary as we want the user info only once when fetch recipes is called.
// After fetching the user data with take(), replace the authService.user observable with the httpClient observable using exhaustMap().
        

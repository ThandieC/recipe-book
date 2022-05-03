import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthUserService } from './auth-user.service';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor (
        private authService: AuthUserService,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate( route: ActivatedRouteSnapshot, router: RouterStateSnapshot ):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take( 1 ),
            map( authState => {
                return authState.user
            }),
            map(
            user => {
                const userAuthenticated = !!user;
                if ( userAuthenticated ) {
                    return true;
                }
                else {
                    return this.router.createUrlTree( [ '/home' ] );
                }
            }
        ));
    }
}

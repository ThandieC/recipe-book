import { Injectable } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}

@Injectable( { providedIn: 'root' } )
    
export class AuthUserService {

    expirationDurationTimer: any;

    constructor (
        private store: Store<fromApp.AppState>
    ) { }
   
    setLogoutTimer( expirationDuration: number ) {
        console.log( expirationDuration );
        this.expirationDurationTimer = setTimeout( () => {
            this.store.dispatch(new AuthActions.Logout())
        } , expirationDuration);
    }

    clearLogoutTimer() {
            if ( this.expirationDurationTimer ) {
                clearTimeout( this.expirationDurationTimer );
                this.expirationDurationTimer = null;
            }
        }
}

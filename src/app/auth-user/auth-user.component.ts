import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthUserService } from './auth-user.service';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

@Component( {
    selector: 'app-auth-user',
    templateUrl: './auth-user.component.html',
    styleUrls: ['./auth-user.component.css']
})

export class AuthUserComponent implements OnInit, OnDestroy {

    isLogingMode = true;
    isLoading = false;
    errorMsg: string = null;
    private storeSub: Subscription;

    constructor (
        private authUserService: AuthUserService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit() {
        this.storeSub = this.store.select( 'auth' ).subscribe( authState => {
            this.isLoading = authState.loading;
            this.errorMsg = authState.loggingError;
        })
    }

    onSwitchMode() {
        this.isLogingMode = !this.isLogingMode;
    }

    onSubmit( form: NgForm ) {
        if ( !form.valid ) {
            return
        }

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

      if ( this.isLogingMode ) {

            this.store.dispatch( new authActions.LoginStart( { email: email, password: password } ) );

        } else {

            this.store.dispatch(new authActions.SignupStart({email: email, password: password}))

        }

      form.reset();

    }

    onHandleError() {
        this.store.dispatch(new authActions.ClearError())
    }

    ngOnDestroy() {
        if ( this.storeSub ) {
            this.storeSub.unsubscribe()
        }
    }

}

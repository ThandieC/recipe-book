import { Component, OnInit } from '@angular/core';
import { AuthUserService } from './auth-user/auth-user.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as authActions from './auth-user/store/auth.actions';


@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )

export class AppComponent implements OnInit{

  constructor (
    private authService: AuthUserService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
      this.store.dispatch(new authActions.AutoLogin())
  }

}

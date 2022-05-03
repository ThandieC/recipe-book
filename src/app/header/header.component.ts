import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth-user/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;
  navbarCollapsed = true;

  @Output() selectedComp = new EventEmitter<String>();
  clickedBtn: String;

  onToggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    //this.userSub = this.authUser.user.subscribe(
    this.store
      .select('auth')
      .pipe(map((authState) => authState.user)) // remove curly braces and return statement to make statement inline because there is only 1 return statement and no other line of code.
      .subscribe((user) => {
        this.isAuthenticated = !!user; //  this is equal to   !user ? false : true;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSelect(clicked: String) {
    this.selectedComp.emit(clicked);
  }

  onSaveRecipes() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    // this.authUser.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
}

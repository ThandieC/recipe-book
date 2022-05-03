import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor (
        private store: Store<fromApp.AppState>,
        private action$: Actions
    ) { }
    
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
        
        this.store.dispatch( new RecipesActions.FetchRecipes() );
        return this.action$.pipe(
            ofType( RecipesActions.SET_RECIPES ),
            take(1)
        );

    }

} 
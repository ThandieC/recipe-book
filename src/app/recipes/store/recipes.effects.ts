import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators'
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {

    @Effect()
    fetchRecipes = this.action$.pipe(
        ofType( RecipesActions.FETCH_RECIPES ),
        switchMap( () => {
            return this.http.get<Recipe[]>( 'https://recipe-app-3fdb7.firebaseio.com/recipes.json', )
                .pipe(
                    map( recipes => {
                        return recipes.map( recipe => {
                            // Set the default value of ingredients to an empty array to avoid errors if no ingredients are set by using the Array's map() method.
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            }
                        } )
                    } ),
                    map( recipe => {
                        return new RecipesActions.SetRecipes( recipe );
                    } )
                )
        } )
    );

    @Effect({dispatch: false})
    saveRecipes = this.action$.pipe(
        ofType( RecipesActions.STORE_RECIPES ),
        withLatestFrom(this.store.select('recipes')), // Allows us to merge a value from another observable
        switchMap( ([actionData, recipesState]) => { // Array Destructuring (use of square brackets to store array elements in variables)
            return this.http.put( 'https://recipe-app-3fdb7.firebaseio.com/recipes.json', recipesState.recipes)
        })
    );

        constructor (
            private action$: Actions,
            private http: HttpClient,
            private store: Store<fromApp.AppState>
    ) { }
}

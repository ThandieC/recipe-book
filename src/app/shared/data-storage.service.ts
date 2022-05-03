import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthUserService } from '../auth-user/auth-user.service';
import * as fromApp from '../store/app.reducer';
import * as recipesActions from '../recipes/store/recipes.actions';

@Injectable( { providedIn: 'root' } )

export class DataStorageService {

    constructor (
        private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthUserService,
        private store: Store<fromApp.AppState>
    ) { }
    
    storeRecipes() {
        
        const recipes = this.recipeService.getRecipeList();
        this.httpClient.put( 'https://recipe-app-3fdb7.firebaseio.com/recipes.json', recipes).subscribe(
            responseData => {
                console.log(responseData)
            }
        );

    };

    fetchRecipes() {
        
        return this.httpClient.get<Recipe[]>( 'https://recipe-app-3fdb7.firebaseio.com/recipes.json',)
            .pipe(
                map( recipes => {
                    return recipes.map( recipe => {
                        // Set the default value of ingredients to an empty array to avoid errors if no ingredients are set by using the Array's map() method.
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                } ),
                tap<Recipe[]>( recipes => {
                    // this.recipeService.setRecipe( recipes );
                    this.store.dispatch(new recipesActions.SetRecipes(recipes))
                } )
            )

    }

}

// tap() steps into the observable and runs some code without changing the observable's outcome. In this case it retrieves 
// the  updated recipe array.

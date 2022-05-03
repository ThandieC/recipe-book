import * as fromShopping from '../shopping/store/shopping.reducer';
import * as fromAuth from '../auth-user/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipes from '../recipes/store/recipes.reducer';

export interface AppState {
    shopping: fromShopping.State,
    auth: fromAuth.State,
    recipes: fromRecipes.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    shopping: fromShopping.shoppingReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer,
}

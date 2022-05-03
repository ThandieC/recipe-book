import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

export interface State {
    recipes: Recipe[]
}
const initialState: State = {
    recipes: []
};

export function recipesReducer( state = initialState, action: RecipesActions.recipeActionTypes ) {

    switch ( action.type ) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [ ...action.payload ],
            };
           
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }

        case RecipesActions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[ action.payload.index ],
                ...action.payload.newRecipe,
            };

            const updatedRecipes = [ ...state.recipes ];
            updatedRecipes[ action.payload.index ] = updatedRecipe;

            return {
                ...state,
                recipes : updatedRecipes,
            }

        case RecipesActions.DELETE_RECIPE:
            const newRecipes = [ ...state.recipes ];
            newRecipes.splice( action.payload, 1 );
            return {
                ...state,
                recipes: newRecipes,
            }

        default:
            return state
    }

}

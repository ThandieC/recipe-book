import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingActions from './shopping.actions';
import { Recipe } from '../../recipes/recipe.model';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState = {
    ingredients : [],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingReducer( state = initialState, action: ShoppingActions.ShoppingActionTypes ) {
    switch ( action.type ) {
        case ShoppingActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload ]
            };
            break;

        case ShoppingActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [ ...state.ingredients, ...action.payload ]
            };
            break;

        case ShoppingActions.UPDATE_INGREDIENT:
            const oldIngredient = state.ingredients[ state.editedIngredientIndex ];
            const updatedIngredient = {
                ...oldIngredient, // pull out everything in the old ingredient to avoid overwriting data you are not editing.
                ...action.payload, // overwrite the old ingredient with the new ingredient from the payload.
            }
            const updatedIngredients = [ ...state.ingredients ];
            updatedIngredients[ state.editedIngredientIndex ] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
            break;

        case ShoppingActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    (ingr, ingrIndex) => {
                        return ingrIndex !== state.editedIngredientIndex
                    } ),
                editedIngredient: null,
                editedIngredientIndex: -1
            }
            break;

        case ShoppingActions.START_EDIT:
            return {
                ...state,
                editedIngredient: { ...state.ingredients[ action.payload ] },
                editedIngredientIndex: action.payload
            }
            break;

        case ShoppingActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null, // reset the ingredient
                editedIngredientIndex: -1,
            }
            break;
        default:
            return state
    }
}

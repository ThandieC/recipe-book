import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model'
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable()
export class ShoppingListService{

    // Use Subject instead of event emmiter to emit events as it is more efficient
    ingredientsChanged = new Subject<Ingredient[]>();
 //   ingredientsChanged = new EventEmitter<Ingredient[]>();

    editIngredient = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Potatoes', 5),
        new Ingredient('Chicken', 1),
       ];
    
    getIngredient(index: number){
        return this.ingredients[index];
    }

    getIngredientsList(){
        return this.ingredients.slice();
    }
  
    addNewIngredient( ingredient:Ingredient ) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, updatedIngredient: Ingredient){
           this.ingredients[index] = updatedIngredient;
           this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}  
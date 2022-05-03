import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingActions from '../shopping/store/shopping.actions';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
} )
  
export class ShoppingComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  subscription: Subscription;

  constructor (
    private store: Store<fromApp.AppState>,
  ) { }
  
  ngOnInit() {
    this.ingredients = this.store.select( 'shopping' );
    // this.ingredients = this.shoppingService.getIngredientsList();
    // this.subscription = this.shoppingService.ingredientsChanged.subscribe(
    //   (ingredientList:Ingredient[])=>{
    //     this.ingredients = ingredientList;
    //   }
    // );
  }
  
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onIngredientEdit(index: number){
    // this.shoppingService.editIngredient.next(index);
    this.store.dispatch( new ShoppingActions.StartEdit( index
    ) )
  }
  
}
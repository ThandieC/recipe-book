import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../store/shopping.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

 @ViewChild( 'form' ) ingrForm: NgForm;
 subscription: Subscription;
 editMode = false;
//  editedIngredientIndex: number;

  constructor (
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select( 'shopping' ).subscribe(
      stateData => {
        if ( stateData.editedIngredientIndex > -1 ) {
          this.editMode = true;
          const editedIngredient = stateData.editedIngredient;
          this.ingrForm.setValue({
          name: editedIngredient.ingrName,
          amount: editedIngredient.ingrAmount
        });
        }
        else {
          this.editMode = false;
        }

      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingActions.StopEdit())
  }

  onSubmit(form: NgForm) {
      const myForm = form.value;
      const newIngredient:Ingredient = new Ingredient(myForm.name, +myForm.amount);
    if ( this.editMode ) {
      this.store.dispatch( new ShoppingActions.UpdateIngredient( newIngredient ))
      } else {
        this.store.dispatch(new ShoppingActions.AddIngredient(newIngredient));
      }
      form.reset();
      this.editMode = false;
  }

  deleteItem( form: NgForm ) {
    this.store.dispatch(new ShoppingActions.DeleteIngredient())
    this.onClear(form);
  }

  onClear(form: NgForm){
    form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingActions.StopEdit())
  }
}

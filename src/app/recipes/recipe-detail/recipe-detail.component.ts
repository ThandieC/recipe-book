import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingActions from '../../shopping/store/shopping.actions';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  displayedRecipe: Recipe;
  id: number;
  constructor (
    private route: ActivatedRoute, private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(){

    // this.route.params.subscribe(
    //   (params: Params)=>{
    //     this.id = +params['id'];
    //     // this.displayedRecipe = this.recipeService.getRecipe(this.id);
    //     this.store.select( 'recipes' ).pipe(
    //       map( recipeState => {
    //         return recipeState.recipes
    //       } ),
    //       map( recipes => {
    //         return recipes[this.id]
    //       })
    //     ).subscribe(
    //       recipe => {
    //         this.displayedRecipe = recipe
    //       }
    //     )
    //   }
    // );
    // MORE ELEGANT ALTERNATIVE TO ABOVE METHOD

    this.route.params.pipe(
      map( params => {
        return +params['id']
      } ),
      switchMap( id => {
        this.id = id;
        return this.store.select('recipes')
      } ),
      map( recipeState => {
        return recipeState.recipes.find( (data, index) => {
          return index === this.id
        })
      })
    ).subscribe(
      recipe => {
        return this.displayedRecipe = recipe
      }
    )
  }

  shopForIngredients() {
    //this.recipeService.addToShoppingList(this.displayedRecipe.ingredients)
    this.store.dispatch(new ShoppingActions.AddIngredients(this.displayedRecipe.ingredients))
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route}); // append 'edit' to the current path.
   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); // alternatively, go up one level first, to Recipes, then  re-construct your path from there.
  }

  onDeleteRecipe(){ 
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch( new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
}

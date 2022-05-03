import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select( 'recipes' ).pipe(
      map( recipesState => {
       return recipesState.recipes
      })
    ).subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes;
      }
    );
  }

  createNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}

import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() newRecipe: Recipe;
  @Input() index: number;

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {}
  onLoadRecipe() {
    this.router.navigate([this.index], { relativeTo: this.route });
  }

  setDefaultPic() {
    this.newRecipe.imageSrc = 'assets/images/beef-braai.jpg';
  }
}

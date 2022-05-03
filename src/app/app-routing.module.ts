import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'recipes', loadChildren: () => import( './recipes/recipes.module' ).then( m => m.RecipesModule ) },
  { path: 'shopping', loadChildren: () => import( './shopping/shopping.module' ).then( m => m.ShoppingModule ) },
  { path: 'auth', loadChildren: () => import('./auth-user/auth.module').then(m => m.AuthModule)}
] ;

@NgModule({
  imports: [ RouterModule.forRoot( appRoutes, {
    preloadingStrategy: PreloadAllModules,
    //initialNavigation: 'enabled'
    onSameUrlNavigation: 'reload'
  } ) ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}

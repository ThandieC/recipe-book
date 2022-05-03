import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingComponent } from './shopping.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule( {
    declarations: [
        ShoppingComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        RouterModule.forChild([{ path: '', component: ShoppingComponent }]),
        FormsModule,
        SharedModule
    ],
})

export class ShoppingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { AttributeTypeDirective } from './attribute-type.directive';

@NgModule( {
    declarations: [
        DropdownDirective, 
        LoadingSpinnerComponent,
        AlertComponent,
        AttributeTypeDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DropdownDirective, 
        LoadingSpinnerComponent,
        AlertComponent,
        AttributeTypeDirective,
        CommonModule,
    ]
})
export class SharedModule {}

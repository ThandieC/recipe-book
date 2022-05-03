import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthUserComponent } from './auth-user.component';

@NgModule( {
    declarations: [
        AuthUserComponent,
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        RouterModule.forChild( [ { path: '', component: AuthUserComponent } ] ),
        SharedModule
    ]
})
export class AuthModule { }

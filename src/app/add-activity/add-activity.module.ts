import { DeleteActivityComponent } from './past-activity/delete-activity.component';
import { environment } from './../../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { PastActivityComponent } from './past-activity/past-activity.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { AddActivityComponent } from './add-activity.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AddActivityComponent,
    NewActivityComponent,
    PastActivityComponent,
    DeleteActivityComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule

    
  ]
})
export class AddActivityModule { }

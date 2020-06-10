import { EventEmitter } from 'protractor';
import { DeleteActivityComponent } from './delete-activity.component';
import { AddActivityService } from './../add-activity.service';
import { Activity } from './../activity.model';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';





@Component({
  selector: 'app-past-activity',
  templateUrl: './past-activity.component.html',
  styleUrls: ['./past-activity.component.css']
})
export class PastActivityComponent implements OnInit, AfterViewInit, OnDestroy{

  displayedColumns = ['status','priority', 'activity', 'start_time', 'end_time', 'date','actions']
  dataSource = new MatTableDataSource<Activity>()
  dbSubscription = new Subscription
  checkboxValue: boolean = false
  toBeDeleted: Activity
  selection = new SelectionModel<Activity>(false, null);
  clashActivitySubscription: Subscription
  matRow: Object

  @ViewChild(MatSort, {static: false}) sort: MatSort

  constructor(
    private addActivityService: AddActivityService,
    private store: Store<fromRoot.State>,
    private dialog: MatDialog
    ) {}


  ngOnInit(): void {
    
    this.store.select(fromRoot.getActivity)
      .subscribe((activities: Activity[]) =>{
        console.log("look here!")
        console.log(activities)
        this.dataSource.data = activities
      })  
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.clashActivitySubscription = this.addActivityService.clashActivitySubject
      .subscribe( activities=>{
        console.log(activities)
    })
  }

  deleteRow(data:Activity){
    console.log('Data is here!')
    this.store.select(fromRoot.getActivity)
      .subscribe((activities:Activity[])=>{
        for (var i=0; i<activities.length; i++){
          if (activities[i].id === data.id){
            this.toBeDeleted = activities[i]
            if (this.checkboxValue){
              this.addActivityService.deleteFromDatabase(this.toBeDeleted)
            }else{
              const dialogRef= this.dialog.open(DeleteActivityComponent)
              dialogRef.afterClosed().subscribe(result=>{
                if(result){
                  this.addActivityService.deleteFromDatabase(this.toBeDeleted)
              }
            })
          }  
        }
      }
    })
  }

  checkbox(event){
    console.log(event)
    this.checkboxValue = event.checked
    console.log(this.checkboxValue)
  }

  receiveClashActivity(activityList){
    // So im having difficult with this feature. 
    // Idea is to have clashed activity highlighted in my data, but I can't figure it out ><
    // const activities: Activity[] = this.dataSource.data
    // for (var i=0; i<activities.length; i++){
    //   if (activities[i].priority === activities.priority) {
    //     console.log("found it!!")
    //     console.log(activities[i])
    //       }
    //     }
    }
  

  ngOnDestroy(){
    this.clashActivitySubscription.unsubscribe
  }


 





  // If not done, throw dialogue checkbox warning user.

}
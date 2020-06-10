import { UiService } from './../../ui/ui.service';
import { take } from 'rxjs/operators';
import { Activity } from './../activity.model';
import { AddActivityService } from './../add-activity.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'
import { Subject } from 'rxjs';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {

  constructor(
    private addActivityService: AddActivityService,
    private store: Store<fromRoot.State>,
    private uiService: UiService
  ) {}

  Valid: boolean = true
  validTime: boolean 
  listOfClashActivities: Activity[] = []


  ngOnInit(): void {
  }

  // wHAT I NEED TO DO FOR THIS COMPONENT:
  // How to throw and show errors! 
  
  
  checkClashing(formValue){
    console.log("working!")
    this.store.select(fromRoot.getActivity).pipe(take(1))
      .subscribe((activities: Activity[]) =>{
        console.log(activities)
        for (var i=0; i<activities.length; i++){
          console.log("gg down avaliable list")
          if (activities[i].priority === formValue.priority ||
              activities[i].activity === formValue.activity ||
              activities[i].start_time === formValue.start_time ||
              activities[i].end_time === formValue.end_time){
            console.log("errors found in line")
            console.log(activities[i])
            this.listOfClashActivities.push({...activities[i]})
            console.log(this.listOfClashActivities)
            this.addActivityService.clashActivity = this.listOfClashActivities
            this.Valid = false
            console.log(this.Valid)
            const message = "You have clashing inputs. Clashes highlighted in To-Do-List"
            this.uiService.showSnackbar(message, null, 3000)
          }else{
            this.Valid = true
            console.log(this.Valid)
          }
        }
    })
  }

  addNewActivity(form:NgForm){
    console.log(form)
    this.checkClashing(form.value)
    this.checkTime(form.value.start_time, form.value.end_time)
    if (this.Valid && this.validTime){
      this.addActivityService.addActivityToDatabase({...form.value, date: new Date })
      form.resetForm()
      const message = "Activity has successfully been added to To-Do-List"
      this.uiService.showSnackbar(message, null, 3000)
    }else{
      this.addActivityService.sendClashActivity()
    }
  }

  checkTime(start_time, end_time){
    if (start_time <= end_time){
      this.validTime = true
      console.log(this.validTime)
    }else{
      this.validTime = false
      console.log(this.validTime)
    }

  }

  resetButton(form:NgForm){
    console.log("impt")
    console.log(form)
    this.Valid = true
    form.resetForm()
  }

  
}
  

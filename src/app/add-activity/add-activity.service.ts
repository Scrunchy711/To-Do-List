import { Activity } from './activity.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'
import * as Activities from '../add-activity/add-activity.actions'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AddActivityService {

  private fbSubs: Subscription[] = []  

  constructor(
    private db: AngularFirestore,
    private store: Store<fromRoot.State>
    ) { }

  activitiesDatabase= new Subject<Activity[]>()
  clashActivity: any
  clashActivitySubject = new Subject<Activity>()


  fetchActivitiesDatabase(){
    this.fbSubs.push(
      this.db.collection('Activities')
      .snapshotChanges().pipe(map(docArray => {
        // throw(new Error)
          return docArray.map(doc => {
            const data: any = doc.payload.doc.data()
            return {
              id: doc.payload.doc.id,
              priority: data.priority,
              activity: data.activity,
              start_time: data.start_time,
              end_time: data.end_time,
              date: data.date
            }
          })
        }))
        .subscribe((activities: Activity[]) =>{
          this.store.dispatch( new Activities.ShowActivities(activities))
      }))
    }

  addActivityToDatabase(addActivityForm: Object){
    console.log(addActivityForm)
    this.db.collection('Activities').add(addActivityForm)
  }
  
  cancelSubscriptions(){
    this.fbSubs.forEach(sub=>{sub.unsubscribe})
  }

  deleteFromDatabase(activity: Activity){
    this.db.collection('Activities').doc(activity.id).delete()
      .then(function(){
        console.log("Delete successfully")
      })
      .catch(function(error){
        console.log("Error removing document", error)
      })
  }

  sendClashActivity(){
    this.clashActivitySubject.next(this.clashActivity)
  }


}

import { AngularFirestore } from '@angular/fire/firestore';
import { AddActivityService } from './add-activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  constructor(
    private addActivityService: AddActivityService,
    ) { }

  ngOnInit(): void {
    this.addActivityService.fetchActivitiesDatabase()
  }
}

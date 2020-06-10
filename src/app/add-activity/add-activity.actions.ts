import { Activity } from './activity.model';
import { Action } from '@ngrx/store'

export const SHOW_ACTIVITIES = '[Activites] Show Activities'


export class ShowActivities implements Action {
    readonly type = SHOW_ACTIVITIES

    constructor(public payload: Activity[]){}
}


export type AddActivityActions = ShowActivities
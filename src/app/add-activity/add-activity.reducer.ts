import { Activity } from './activity.model';
import { AddActivityActions, SHOW_ACTIVITIES } from './add-activity.actions';



export interface State {
    listOfActivities: Activity[]
}

const initialState: State =  {
    listOfActivities: []
}

export function addActivityReducer(state = initialState, action: AddActivityActions){
    switch (action.type){
        case SHOW_ACTIVITIES : 
            return{
                listOfActivities : action.payload
            }
        default:{
            return state
        }
    }
}

export const getActivity = (state: State) => state.listOfActivities

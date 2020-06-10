import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.action'



export interface State {
    isAuthenticated: boolean
}

const initialState: State =  {
    isAuthenticated: false
}

export function authReducer(state = initialState, action: AuthActions){
    switch (action.type){
        case SET_AUTHENTICATED:
            console.log("isAuth=true")
            return{
                isAuthenticated: true
                
            }
        case SET_UNAUTHENTICATED:
            console.log("isAuth=false")
            return {
                isAuthenticated: false
            }
        default:{
            return state
        }
    }
}

export const getIsAuth = (state: State)=>state.isAuthenticated
import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
    user: User,
    loggingError: string,
    loading: boolean,
}

const initialState: State = {
    user: null,
    loggingError: null,
    loading: false,
}

export function authReducer( state = initialState, action: authActions.authActionTypes ) {
    switch ( action.type ) {

        case authActions.SIGNUP_START:
        case authActions.LOGIN_START:
            return {
                ...state,
                loggingError: null,
                loading: true,
            };
        
        case authActions.SIGNUP_SUCCESS:
            const newUser = new User(
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.expirationDate
            )
                
            return {
                ...state,
                user: newUser,
                loggingError: null,
                loading: false
            }

        case authActions.AUTHENTICATION_SUCCESS:
            const loggedUser = new User(
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: loggedUser,
                loggingError: null,
                loading: false,
            };
        
        case authActions.AUTHENTICATION_FAIL:
            return {
                ...state,
                user: null,
                loggingError: action.payload,
                loading: false,
            };
        
        case authActions.CLEAR_ERROR:
            return {
                ...state,
                loggingError: null,
            };
        
        case authActions.AUTO_LOGIN:
            // const currentDate = new Date( new Date().getTime());
            // if ( currentDate > action.payload.expirationDate ) {

            return {
                ...state,
                // user: autoUser,
            }
        
        case authActions.AUTO_LOGOUT:
            return {
                ...state,
                user: null,
            }
        
        case authActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        
        default:
            return state;
    }
}

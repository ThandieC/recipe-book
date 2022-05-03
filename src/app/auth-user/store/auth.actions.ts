import { Action } from '@ngrx/store'

export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATION_SUCCESS = '[Auth] Authentication Success';
export const AUTHENTICATION_FAIL = '[Auth] Authentication Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';
export const LOGOUT = '[Auth] Logout'; 

export class SignupStart implements Action{
    readonly type = SIGNUP_START;

    constructor(public payload: {email: string, password: string}){}
}

export class SignupSuccess implements Action{
    readonly type = SIGNUP_SUCCESS;

    constructor ( public payload: {
        email: string,
        id: string,
        token: string,
        expirationDate: Date
    } ) { }
}

export class LoginStart implements Action{
    readonly type = LOGIN_START;

    constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticationSuccess implements Action{
    readonly type = AUTHENTICATION_SUCCESS;
    constructor ( public payload: {
        email: string,
        id: string,
        token: string,
        expirationDate: Date,
        redirect: boolean,
    } ) { }
};

export class AuthenticationFail implements Action {
    readonly type = AUTHENTICATION_FAIL;

    constructor(public payload: string){}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
};

export class AutoLogout implements Action{
    readonly type = AUTO_LOGOUT;
};

export class Logout implements Action{
    readonly type = LOGOUT;
};

export type authActionTypes =
    | SignupStart
    | SignupSuccess
    | LoginStart
    | AuthenticationSuccess
    | AuthenticationFail
    | ClearError
    | AutoLogin
    | AutoLogout
    | Logout;

import Axios from "axios";

export const TOGGLE_FORMS = 'TOGGLE_FORMS';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const SET_IS_SUPPORT_PROVIDER = 'SET_IS_SUPPORT_PROVIDER';
export const TOGGLE_OFF_SUPPORT_PROVIDER = 'TOGGLE_SUPPORT_PROVIDER';


export const toggleForms = () => ({
  type: TOGGLE_FORMS,
});

export const setSessionID = id => ({
  type: SET_SESSION_ID,
  payload: id,
});

export const setIsSupportProvider = () => ({
  type: SET_IS_SUPPORT_PROVIDER,
});

export const toggleOffSupportProvider = () =>({
  type: TOGGLE_OFF_SUPPORT_PROVIDER,
})
import {
  EDIT_ROVER,
  EDIT_ROVER_FULFILLED,
  EDIT_ROVER_REJECTED,
  FETCH_ROVER,
  FETCH_ROVER_FULFILLED,
  FETCH_ROVER_REJECTED,
  FETCH_ROVERS,
  FETCH_ROVERS_FULFILLED,
  FETCH_ROVERS_REJECTED,
  REMOVE_ROVER,
  REMOVE_ROVER_FULFILLED,
  REMOVE_ROVER_REJECTED,
} from '../actions/rover';

export default function rovers(
  state = {
    isFetching: false,
    isFetchingSingle: false,
    isEditing: false,
    isRemoving: false,
    rovers: null,
    rover: null,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case FETCH_ROVERS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_ROVERS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        rovers: action.payload,
        error: null,
      };
    case FETCH_ROVERS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case FETCH_ROVER:
      return {
        ...state,
        isFetchingSingle: true,
      };
    case FETCH_ROVER_FULFILLED:
      return {
        ...state,
        isFetchingSingle: false,
        rover: action.payload,
        error: null,
      };
    case FETCH_ROVER_REJECTED:
      return {
        ...state,
        isFetchingSingle: false,
        error: action.payload,
      };
    case EDIT_ROVER:
      return {
        ...state,
        isEditing: true,
      };
    case EDIT_ROVER_FULFILLED:
      return {
        ...state,
        isEditing: false,
        rover: action.payload,
        error: null,
      };
    case EDIT_ROVER_REJECTED:
      return {
        ...state,
        isEditing: false,
        error: action.payload,
      };
    case REMOVE_ROVER:
      return {
        ...state,
        isRemoving: true,
      };
    case REMOVE_ROVER_FULFILLED:
      return {
        ...state,
        isRemoving: false,
        rovers: null,
        error: null,
      };
    case REMOVE_ROVER_REJECTED:
      return {
        ...state,
        isRemoving: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

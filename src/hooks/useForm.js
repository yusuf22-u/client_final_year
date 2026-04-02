import { useReducer } from "react";

const ACTIONS = {
  UPDATE_FIELD: "UPDATE_FIELD",
  SET_ERROR: "SET_ERROR",
  RESET: "RESET",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case ACTIONS.RESET:
      return action.initialState;

    default:
      return state;
  }
};
export const useForm = (initialState) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateField = (field, value) => {
    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      field,
      value,
    });
  };

  const setError = (field, error) => {
    dispatch({
      type: ACTIONS.SET_ERROR,
      field,
      error,
    });
  };

  return {
    values: state.values,
    errors: state.errors,
    updateField,
    setError,
    dispatch,
  };
};
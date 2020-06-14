import { DISPLAY_ERROR } from "../../types";

export const displayError = (error, errorText) => ({
  type: DISPLAY_ERROR,
  payload: {
    error,
    errorText,
  }
}) 

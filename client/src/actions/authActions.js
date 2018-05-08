import axios from "axios";
import { GET_ERRORS } from "./types";

// Register User action creator
export const registerUser = (userData, history) => dispatch => {
  // dispatch comes from thunk
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // redirect
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

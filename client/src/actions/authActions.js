import { TEST_DISPATCH } from "./types";

// Register User action creator
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};

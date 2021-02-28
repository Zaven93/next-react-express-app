import { GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAIL } from "../constants/jobsConstants"

export const jobsReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_JOBS_REQUEST:
      return {
        loading: true,
        query: payload ? payload : null,
      }
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: payload,
      }
    case GET_JOBS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

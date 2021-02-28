import { GET_JOBS_REQUEST } from "../constants/jobsConstants"

export const getJobs = (query) => ({ type: GET_JOBS_REQUEST, query }) // This is an action creator which will trigger the saga watcher and all the async operation will occur there

// export const searchJob = (query) => ({ type: GET_JOBS_SEARCH, payload: query })

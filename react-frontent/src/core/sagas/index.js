import { put, takeLatest, all } from "redux-saga/effects"
import axios from "axios"
import { GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAIL } from "../constants/jobsConstants"

function* fetchJobs({ query }) {
  const { data } = yield axios.get(
    `http://localhost:4000/api/jobs${query ? `?q=${query.toLowerCase()}` : ""}`
  )

  if (!data) {
    yield put({ type: GET_JOBS_FAIL, payload: "Some error occurred" })
  }

  yield put({ type: GET_JOBS_SUCCESS, payload: data.data })
}

function* actionWatcher() {
  yield takeLatest(GET_JOBS_REQUEST, fetchJobs) // This function is watching for GET_JOBS_REQUEST action, when the saga middleware receives this action it call fetchJobs function
}

export default function* rootSaga() {
  yield all([actionWatcher()]) // Here we can pass many watchers as an array items
}

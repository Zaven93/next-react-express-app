import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Carousel, Spinner } from "react-bootstrap"
import { getJobs } from "../../core/actions/jobsAction"
import JobCard from "../../components/JobCard"
import FilterButton from "../../components/FilterButton"
import "./JobsScreen.styles.scss"

const JobsScreen = ({ setEnableSearch, debouncedValue }) => {
  const [showList, setShowList] = useState(false)

  const dispatch = useDispatch()

  const { jobs, loading } = useSelector((state) => state.jobs)

  useEffect(() => {
    if (!debouncedValue) {
      return dispatch(getJobs())
    }

    dispatch(getJobs(debouncedValue))
  }, [debouncedValue, dispatch])

  return (
    <>
      {loading ? (
        <Spinner className='spinner' animation='grow' />
      ) : (
        <div className={`jobs__screen-container container ${!showList && "with-carousel"}`}>
          <div className='jobs__screen-filter-buttons'>
            <FilterButton
              className='filter__button-by-company'
              variant='secondary'
              size='md'
              title='Filter by Company'
              triggerHandler={() => {
                setEnableSearch(true)
                setShowList(true)
              }}
            />
            <FilterButton
              className='filter__button-new-jobs'
              variant='info'
              size='md'
              title='New jobs'
              triggerHandler={() => {
                setShowList(true)
                dispatch(getJobs("recent"))
              }}
            />
          </div>
          {showList && (
            <div className='row'>
              {jobs?.map((job) => (
                <div className='col-md-6 col-lg-4'>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
          {!showList && jobs && (
            <Carousel
              className='jobs__screen-slider'
              nextIcon={
                <span className='next-icon'>
                  <i class='fas fa-chevron-right'></i>
                </span>
              }
              prevIcon={
                <span className='prev-icon'>
                  <i class='fas fa-chevron-left'></i>
                </span>
              }>
              {jobs?.map((job) => (
                <Carousel.Item>
                  <JobCard job={job} />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      )}
    </>
  )
}

export default JobsScreen

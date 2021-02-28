import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { QueryClient, useQuery } from "react-query"
import { dehydrate } from "react-query/hydration"
import { Carousel, Spinner, Navbar, Form, FormControl } from "react-bootstrap"
import JobCard from "../../components/JobCard"
import FilterButton from "../../components/FilterButton"
import useDebounce from "../../core/hooks/useDebounce"

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showList, setShowList] = useState(false)
  const [enableSearch, setEnableSearch] = useState(false)

  const debouncedValue = useDebounce(searchTerm, 1000)

  const { data, refetch: fetchJobs, isLoading } = useQuery(
    "jobs",
    async () => {
      const { data } = await axios.get(
        `https://stormy-harbor-22855.herokuapp.com/api/jobs${
          debouncedValue ? `?q=${debouncedValue.toLowerCase()}` : ""
        }`
      )

      return data
    },
    { enabled: false }
  )

  const inputRef = useRef()

  useEffect(() => {
    if (!enableSearch) return

    inputRef.current.focus()
  }, [enableSearch])

  useEffect(() => {
    fetchJobs()
  }, [debouncedValue])

  console.log("Data is", data)

  return (
    <>
      <Navbar fixed='top' bg='dark' variant='dark'>
        <FilterButton
          variant='outline-info'
          title='Main page'
          triggerHandler={() => {
            setShowList(false)
            setEnableSearch(false)
            setSearchTerm("")
          }}
        />
        <Form className='d-flex ml-auto'>
          <FormControl
            ref={inputRef}
            disabled={!enableSearch}
            size='sm'
            type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton disabled={!enableSearch} size='sm' variant='outline-info' title='Search' />
        </Form>
      </Navbar>
      {isLoading ? (
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
                setSearchTerm("recent")
              }}
            />
          </div>
          {showList && (
            <div className='row'>
              {data?.data?.map((job) => (
                <div className='col-md-6 col-lg-4'>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
          {!showList && data?.data && (
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
              {data?.data?.map((job) => (
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

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery("jobs", async () => {
    const { data } = await axios.get(`https://stormy-harbor-22855.herokuapp.com/api/jobs`)

    return data
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Jobs

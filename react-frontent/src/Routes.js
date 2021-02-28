import React, { Suspense, lazy, useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { Navbar, Form, FormControl, Spinner } from "react-bootstrap"
import useDebounce from "./core/hooks/useDebounce"
import FilterButton from "./components/FilterButton"

const JobsScreen = lazy(() => import("./screens/JobsScreen"))
// This is not a necessary implementation, I just wanted to show how we can make some optimization on dynamic module imports.

const Routes = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [enableSearch, setEnableSearch] = useState(false)

  const { loading } = useSelector((state) => state.jobs)

  const debouncedValue = useDebounce(searchTerm, 1000)

  const inputRef = useRef()

  useEffect(() => {
    if (!enableSearch) return

    inputRef.current.focus()
  }, [enableSearch])

  console.log("Loading from Routes", loading)
  return (
    <Router>
      <Navbar fixed='top' bg='dark' variant='dark'>
        <Navbar.Brand href='/'>Jobs</Navbar.Brand>
        <Form className='d-flex ml-auto'>
          <FormControl
            ref={inputRef}
            disabled={!enableSearch}
            size='sm'
            type='text'
            placeholder='Search'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton disabled={!enableSearch} size='sm' variant='outline-info' title='Search' />
        </Form>
      </Navbar>
      <Switch>
        <Redirect exact from='/' to='/test/jobs' />
        {/*Automatically redirects from home page to our destination page */}
        <Route
          exact
          path='/test/jobs'
          render={() => (
            /* With slow internet connection it will show the Loading or spinner while the component is being dynamically loaded */
            <Suspense fallback={<Spinner animation='grow' />}>
              <JobsScreen
                loading={loading}
                debouncedValue={debouncedValue}
                enableSearch={enableSearch}
                setEnableSearch={setEnableSearch}
              />
            </Suspense>
          )}
        />
      </Switch>
    </Router>
  )
}

export default Routes

import React from "react"
import { Card, Badge } from "react-bootstrap"

const JobCard = ({ job, className }) => {
  const addNewBadge = (postedDate) => {
    const date = parseInt(postedDate.split("d")[0], 10)

    if (date >= 10) {
      return false
    }

    return true
  }

  return (
    <>
      {job && (
        <Card className={`job__card-container ${className}`}>
          <Card.Body>
            {job.companyLogo ? (
              <img className='job__card-logo' src={job.companyLogo} alt='Company logo' />
            ) : (
              <i className='far fa-building job__card-logo'></i>
            )}
            <Card.Text className='job__card-name'>{job.companyName}</Card.Text>
            <Card.Text className='job__card-title'>{job.jobTitle}</Card.Text>
            <Card.Text className='job__card-description'>{job.shortDesc}</Card.Text>
            <Card.Text className='job__card-footer'>
              <p>
                {job.postedDate}{" "}
                {addNewBadge(job.postedDate) === true && <Badge variant='success'>New</Badge>}
              </p>{" "}
              <p>{job.estimatedSalary}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default JobCard

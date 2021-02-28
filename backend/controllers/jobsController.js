import axios from "axios"

export const getJobs = async (req, res) => {
  const query = req?.query?.q

  console.log("Query from backend", query)
  try {
    const { data } = await axios("https://www.zippia.com/api/jobs", {
      method: "POST",
      data: {
        companySkills: true,
        dismissedListingHashes: [],
        fetchJobDesc: true,
        jobTitle: "Business Analyst",
        locations: [],
        numJobs: 40,
        previousListingHashes: [],
      },
    })

    if (!data) {
      res.status(400).json({ message: "Some error occurred" })

      return
    }

    console.log("Data", data)

    if (query) {
      if (query === "recent") {
        const recentJobs = data?.jobs?.filter(
          (job) => parseInt(job.postedDate.split("d")[0], 10) <= 7
        )

        res.status(200).json({
          data: recentJobs,
          message: "Recent jobs",
        })

        return
      }

      const searchedJobs = data?.jobs?.filter((job) =>
        job.companyName.toLowerCase().includes(query)
      )

      res.status(200).json({
        data: searchedJobs,
        message: "Filtered jobs",
      })

      return
    }

    const truncatedJobs = data?.jobs?.slice(0, 10)

    res.status(200).json({
      data: truncatedJobs,
      message: "Successfully fetched jobs",
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

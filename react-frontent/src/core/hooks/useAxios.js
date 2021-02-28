import { useState } from "react"
import axios from "axios"

const useAxios = () => {
  const [responseData, setResponseData] = useState(null)

  const sendRequest = async (url, options) => {
    try {
      const { data } = await axios(url, options)

      setResponseData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return { responseData, sendRequest }
}

export default useAxios

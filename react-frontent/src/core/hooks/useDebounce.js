import { useState, useEffect } from "react"

// I've created this custom hook in order to implement a server side jobs searching, this hook is intended for protecting our API from requests bombarding on each input onChange event :)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

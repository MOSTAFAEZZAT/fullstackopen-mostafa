import axios from "axios"
import { useEffect, useState } from "react"

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return // skip empty calls

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry(response.data)
      })
      .catch(error => {
        console.error('Country fetch error:', error)
        setCountry(null)
      })
  }, [name])

  return country
}

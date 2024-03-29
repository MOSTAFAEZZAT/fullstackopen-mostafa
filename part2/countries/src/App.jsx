import { useEffect, useState } from 'react'
import axios from 'axios'
import phonebook from './services/phonebook'
import './index.css'
import Notification from './components/Notification'
import countries from './services/countries'

const App = () => {

  const [countryName, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [specificCountry, setSpecificCountry] = useState({});
  const [countriesLimit, setCountriesLimit] = useState("");


  useEffect(() => {

    countries.getAllCountries()
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  useEffect(() => {

    console.log('countryName', countryName)
  }, [countryName])

  useEffect(() => {

    console.log('countryList', countryList)
  }, [countryList])
  useEffect(() => {

    console.log('countriesLimit', countriesLimit)
  }, [countriesLimit])

  const onShow = (country) => {
    countries.getSpecificCountry(`${country}`)
      .then(response => {
        console.log(response.data);
        setCountryList([]);
        setCountriesLimit("")
        setSpecificCountry(response.data);
      })
  }

  const onSearch = (event) => {
    event.preventDefault();
  }

  const handleSearch = (event) => {
    const value = event.target.value;
    setCountry(event.target.value);
    setSpecificCountry({});

    if (value.trim() === "") {
      setCountriesLimit(null);
      return;
    }

    const filteredCountries = countryData.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    setCountryList(filteredCountries);

    if (filteredCountries.length === 1) {
      countries.getSpecificCountry(`${filteredCountries[0].name.common}`)
        .then(response => {
          console.log(response.data);
          setCountryList([]);
          setCountriesLimit("")
          setSpecificCountry(response.data);
        })
    }
    else if (filteredCountries.length > 10) {
      setCountryList([]);
      setCountriesLimit("Too much matches, specify another filter")
    } else {
      setCountriesLimit(null)
    }
  }


  if (Object.keys(specificCountry).length !== 0) {
    return (
      <div>
        <form onSubmit={onSearch}>
          find countries
          <input value={countryName} onChange={handleSearch} />
        </form>
        <h1>{specificCountry.name.common}</h1>
        <p>capital {specificCountry.capital}</p>
        <p>area {specificCountry.area}</p>
        <ul>
          Languages
          {Object.keys(specificCountry.languages).map(lang => <li key={crypto.randomUUID()}> {specificCountry.languages[lang]}</li>)}
        </ul>
        <img src={specificCountry.flags.png} />
      </div >
    )
  }
  else if (countriesLimit !== null || countryList.length < 10) {
    return (
      <div>
        <form onSubmit={onSearch}>
          find countries
          <input value={countryName} onChange={handleSearch} />
        </form>
        {
          countryList.map(country => <div>
            <p key={crypto.randomUUID()}>{country.name.common} <button onClick={() => { onShow(country.name.common) }}>show</button></p>
          </div>)
        }
        {countriesLimit}


      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={onSearch}>
          find countries
          <input value={countryName} onChange={handleSearch} />
        </form>
      </div>
    )
  }
}

export default App
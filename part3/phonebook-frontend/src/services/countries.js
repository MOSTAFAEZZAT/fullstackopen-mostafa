import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const waetherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const appid = '3f302ce0d171df4148a1a2bcbcef3f90'
const getAllCountries = () => {
    return axios.get(`${baseUrl}/all`)
}

const getSpecificCountry = (name) => {
    return axios.get(`${baseUrl}/name/${name}`);
}

const getWeather = (lat, lon) => {
    return axios.get(`${waetherBaseUrl}lat=${lat}&lon=${lon}&appid=${appid}&units=Metric`)
}

export default { getAllCountries, getSpecificCountry, getWeather }
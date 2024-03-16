import axios from 'axios'

const url = '/api/persons';

const addNewPerson = (person) => {
    return axios.post(url, person);
}

const getAll = () => {
    return axios.get(url);
}

const deletePerson = (id) => {

    return axios.delete(`${url}/${id}`);
}

const updatePhonenumber = (id, newNumber) => {

    return axios.put(`${url}/${id}`, newNumber)
}

export default { addNewPerson, getAll, deletePerson, updatePhonenumber };
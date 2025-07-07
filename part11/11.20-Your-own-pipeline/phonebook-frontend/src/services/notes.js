import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (name, newObject) => {
    return axios.put(`${baseUrl}/${name}`, newObject)
}

const deleteMember = (name) => {

    return axios.delete(url, name);
}

export default {
    deleteMember: deleteMember,
    getAll: getAll,
    create: create,
    update: update
}
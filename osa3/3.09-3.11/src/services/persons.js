import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
                    .catch(error => {
                        console.log('get error')
                    })
    return request.then(response => response.data)
}
  
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
                    .catch(error => {
                        console.log('post error')
                    })
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
                    .catch(error => {
                        console.log('delete error')
                    })
    return request
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
                    .catch(error => {
                        console.log('update error')
                    })
    return request.then(response => response.data)
}
export default { getAll, create, del, update }
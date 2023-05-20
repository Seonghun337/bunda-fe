import axios from 'axios';

export function getVariables(page, size) {
    const params = { page, size }
    return axios.get('/v1/variables', {params});
}

export function updateVariable(request) {
    return axios.put('/v1/variables', request);
}

export function createVariable(request) {
    return axios.post('/v1/variables', request);
}

export function deleteVariable(id) {
    const params = {key: id}
    return axios.delete('/v1/variables', {params})
}

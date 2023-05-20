import axios from 'axios';

export function getSummary() {
    return axios.get('/v1/summary/today');
}
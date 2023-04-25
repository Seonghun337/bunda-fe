import axios from 'axios';

export function getBacktests(page, size) {
    return axios.get('/v1/back-test');
}

export function postBacktest(body) {
    return axios.post('/v1/back-test', body);
}
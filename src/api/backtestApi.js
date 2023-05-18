import axios from 'axios';

export function getBacktests(page, size) {
    return axios.get('/v1/back-test');
}

export function postBacktest(body) {
    return axios.post('/v1/back-test', body);
}

export function getCandles(termUnit, startDateTime, endDateTime) {
    const params = {
        termUnit,
        startDateTime: convertDate2Str(startDateTime),
        endDateTime: convertDate2Str(endDateTime)
    };
    return axios.get('/v1/candles', {params});
}

function convertDate2Str(date) {
  return date.toISOString().split('.')[0];
}

export function getStatistics() {
    return "";
}

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
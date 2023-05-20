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


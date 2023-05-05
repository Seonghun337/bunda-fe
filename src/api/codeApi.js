import axios from 'axios';

export function getCompareRangeTypes() {
    axios.get('/v1/codes/compare-range-types')
}

export function getStatisticsTypes() {
    return axios.get('/v1/codes/statistics-types');
}



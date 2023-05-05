import axios from 'axios';

export function getCompareRangeTypes() {
    return axios.get('/v1/codes/compare-range-types')
}

export function getStatisticsTypes() {
    return axios.get('/v1/codes/statistics-types');
}

export function getTermUnits() {
    return axios.get('/v1/codes/term-units')
}

export function getCompareTypes() {
    return axios.get('/v1/codes/compare-types')
}

export function getQtyTypes() {
    return axios.get('/v1/codes/qty-types')
}

export function getMarginTypes() {
    return axios.get('/v1/codes/margin-types')
}

export function getOperatorTypes() {
    return axios.get('/v1/codes/operator-types')
}

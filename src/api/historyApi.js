import axios from 'axios';

export function getOrders(page, size) {
    const params = { page, size }
    return axios.get('/v1/orders', {params});
}

export function getPositions(page, size) {
    const params = { page, size }
    return axios.get('/v1/positions', {params});
}
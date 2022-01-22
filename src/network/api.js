import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

export async function getApi (path, params) {
    const token = localStorage.getItem('token') || null
    const response = await instance.get(path, {
        headers: {
            token: token,
        },
        params: params,
    })
    return response.data
}

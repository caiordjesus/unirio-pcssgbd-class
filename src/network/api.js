import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

export async function getApi (path, params) {
    const token = localStorage.getItem('token') || null
    return await instance.get(path, {
        headers: {
            token: token,
        },
        params: params,
    })
}

export async function postApi (path, body) {
    const token = localStorage.getItem('token') || null

    return instance.post(path, body, {
        headers: {
            token: token,
        },
    })
}

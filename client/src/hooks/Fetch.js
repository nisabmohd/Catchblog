import axios from 'axios'
import { url } from '../baseurl'

export const useFetch = () => {
    async function post(body, slug) {
        const resp = await axios.post(`${url}/${slug}`, {
            ...body
        })
        return resp.data
    }
    async function put(body, slug) {
        const resp = await axios.put(`${url}/${slug}`, {
            ...body
        })
        return resp.data
    }
    async function get(slug) {
        const resp = await axios.get(`${url}/${slug}`)
        return resp.data
    }
    async function deleteput(body, slug) {
        const resp = await axios.delete(`${url}/${slug}`, {
            ...body
        })
        return resp.data
    }
    return [{ get, post, put, deleteput }]
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const BASE_URL = 'https://disease.sh/v3/covid-19/countries'

export default abstract class AxiosClient {

    protected getClient: () => AxiosInstance

    constructor() {
        this.getClient = () => {
            const axiosClient = axios.create({
                baseURL: BASE_URL,
                headers: {
                    "Content-type": "application/json"
                }
            })
            axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
                return config
            }, err => {
                return Promise.reject(err)
            })
            axiosClient.interceptors.response.use((res: AxiosResponse) => {
                return res
            }, err => {
                return Promise.reject(err)
            })

            return axiosClient
        }
    }

    get(url: string, config: AxiosRequestConfig = {}) {
        return this.getClient()
                   .get(url, config)
                   .then(res => Promise.resolve(res))
                   .catch(err => Promise.reject(err))
    }
}
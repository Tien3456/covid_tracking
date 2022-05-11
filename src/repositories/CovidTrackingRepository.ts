import AxiosClient from "../config/axiosClient"

class CovidTrackingRepository extends AxiosClient {

    constructor() {
        super()
    }

    getAll(): Promise<any> {
        return this.get(String(process.env.REACT_APP_API_URL))
    }
}

export default new CovidTrackingRepository()
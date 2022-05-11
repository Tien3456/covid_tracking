import AxiosClient from "../config/axiosClient"

class CovidTrackingRepository extends AxiosClient {

    constructor() {
        super()
    }

    getAll(): Promise<any> {
        return this.get("")
    }
}

export default new CovidTrackingRepository()
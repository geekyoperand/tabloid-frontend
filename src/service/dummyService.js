import http from "./httpService"

class DummyService {
    async getAllData() {
        try {
            const result = await http.get("/api/dummydata/all")
            return result.data
        } catch (ex) {
            return { apierror: ex.response.data }
        }
    }

    async getData(limit = 1) {
        try {
            const result = await http.get(`/api/dummydata?limit=${limit}`)
            return result.data
        } catch (ex) {
            return { apierror: ex.response }
        }
    }

    async getUserData(user) {
        try {
            const result = await http.get(`/api/dummydata?firstname=${user.firstname}&age=${user.age}`)
            return result.data
        } catch (ex) {
            return { apierror: ex.response }
        }
    }
}

export default new DummyService()

import { myFetch } from "@/api/httpClient";

const url = 'hotels';

export const hotelsApi = {

  async getAll() {
    return await myFetch({ url, method: 'get' })
  },

  async updateReserve(id, value) {
    return await myFetch({
      url: `${url}/${id}`, method: 'patch', data: {
        id: id,
        reserve: value
      }
    })
  }
}

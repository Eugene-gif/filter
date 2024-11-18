import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function myFetch({ url, method, data }) {
  try {
    const response = await httpClient({ url, method, data })
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default httpClient;

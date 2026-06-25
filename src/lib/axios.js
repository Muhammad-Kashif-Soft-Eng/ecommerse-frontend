import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : ""),
  withCredentials: true,
});

export default api;
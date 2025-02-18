import axios from "axios";

const api = axios.create({
  baseURL: "https://flight-radar1.p.rapidapi.com",

  headers: {
    "x-rapidapi-key": "f02d1e3127msh3fbd04243ecf372p130752jsn27f031ada121",
    "x-rapidapi-host": "flight-radar1.p.rapidapi.com",
  },
});
export default api;

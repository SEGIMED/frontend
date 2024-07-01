import axios from "axios";
const url = "https://segimed-backend.onrender.com/api";
const local = "http://localhost:5000/api";

export const ApiSegimed = axios.create({
  baseURL:local,
});

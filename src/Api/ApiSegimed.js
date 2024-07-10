import axios from "axios";
const url = "https://develop.api.segimed.com/api";
const local = "http://localhost:5000/api";

export const ApiSegimed = axios.create({
  baseURL: url,
});

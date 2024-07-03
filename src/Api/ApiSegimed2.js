import axios from "axios";
export const url = "https://segimed-backend.onrender.com/api";
export const local = "http://localhost:5000/api";

export const ApiSegimed2 = axios.create({
    baseURL: local,
  });
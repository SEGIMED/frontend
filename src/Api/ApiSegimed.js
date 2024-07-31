import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// const url = "https://segimed-backend.onrender.com/api";
const url = "https://develop.api.segimed.com/api";
const local = "http://localhost:5000/api"; 

export const ApiSegimed = axios.create({
  baseURL: local,
});
//Se agrega el interceptor para agregar el refresh token al header
ApiSegimed.interceptors.request.use(
  async (config) => {
    //Rutas que no necesitan token
    if (
      config.url === "/user/login" ||
      config.url === "/user/refresh" ||
      config.url === "/user/register-user"
    ) {
      return config;
    }
    //Se obtiene el ultimo access token de las cookies
    const accessToken = Cookies.get("a");
    //Si existe se agrega al header
    if (accessToken) {
      config.headers["token"] = accessToken;
    } else {
      //Si no existe se redirige al login
      Swal.fire({
        icon: "error",
        title: "Sesión expirada",
        text: "Por favor inicie sesión de nuevo",
        allowOutsideClick: false,
        showConfirmButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          console.log("mandando a login");
          window.location.href = "/";
          Cookies.remove("a");
          Cookies.remove("d");
          Cookies.remove("b");
          Cookies.remove("c");
        }
      });
    }
    //Se obtiene el ultimo refresh token de las cookies
    const refreshToken = Cookies.get("d");
    //Si existe se agrega al header
    if (refreshToken) {
      //se agrega al header x-refresh-token el refresh token
      config.headers["x-refresh-token"] = refreshToken;
    } else {
      //Si no existe se redirige al login
      Swal.fire({
        icon: "error",
        title: "Sesión expirada",
        text: "Por favor inicie sesión de nuevo",
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then((res) => {
        if (res.isConfirmed) {
          console.log("mandando a login2");
          Cookies.remove("a");
          Cookies.remove("d");
          Cookies.remove("b");
          Cookies.remove("c");
          window.location.href = "/";
        }
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiSegimed.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.headers["token"] !== undefined) {
      let token = response.headers["token"];
      //Si la respuesta es 200 y el header contiene token se actualiza el token en las cookies
      Cookies.set("a", token);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    //Si el error es 401 y el request no es de login o refresh
    if (
      error.response.status === 401 &&
      originalRequest.url !== "/user/login" &&
      originalRequest.url !== "/user/refresh"
    ) {
      //Se obtiene el refresh token
      const refreshToken = Cookies.get("d");
      //Si no existe se redirige al login
      if (!refreshToken) {
        Swal.fire({
          icon: "error",
          title: "Sesión expirada",
          text: "Por favor inicie sesión de nuevo",
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: "Iniciar sesión",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.href = "/";
            Cookies.remove("a");
            Cookies.remove("d");
            Cookies.remove("b");
            Cookies.remove("c");
          }
        });
        return Promise.reject(error);
      }
    }
    if (
      error.response.data.msg === "Refresh token is invalid or expired" ||
      error.response.data.msg === "Invalid access token" ||
      error.response.data.msg === "Invalid refresh token"
    ) {
      console.log("error");
      Swal.fire({
        icon: "error",
        title: "Sesión expirada",
        text: "Por favor inicie sesión de nuevo",
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.href = "/";
          Cookies.remove("a");
          Cookies.remove("d");
          Cookies.remove("b");
          Cookies.remove("c");
        }
      });
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

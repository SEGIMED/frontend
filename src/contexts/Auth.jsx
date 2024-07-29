"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

//api here is an axios instance which has the baseURL set according to the env.
import Swal from "sweetalert2";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("a");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Inicie sesión para continuar",
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: "Iniciar sesión",
        }).then((res) => {
          if (res.isConfirmed) {
            Cookies.remove("a");
            Cookies.remove("d");
            Cookies.remove("b");
            Cookies.remove("c");
            router.push("/");
          }
        });
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  // const login = async (email, password) => {
  //   const { data: token } = await api.post("auth/login", { email, password });
  //   if (token) {
  //     Cookies.set("a", token, { expires: 60 });
  //     setUser(user);
  //     console.log("Got user", user);
  //   }
  // };

  // const logout = (email, password) => {
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

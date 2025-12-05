// import { createContext, useEffect, useState } from "react";
// import type { AuthContextType } from "@/types/authcontext";
// import type { LoginResponse } from "@/types/user";

// export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<LoginResponse["user"] | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken) setToken(savedToken);
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   const login = (data: LoginResponse) => {
//     setToken(data.token);
//     setUser(data.user);

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

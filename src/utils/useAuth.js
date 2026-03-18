import { createContext, useContext } from "react";

const authContext = createContext();
function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth is used outside the AuthProvider");
  }
  return context;
}

export { useAuth, authContext };

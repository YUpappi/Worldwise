import { createContext, useContext } from "react";

const citiesContext = createContext();
function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("citiesContext is used outside of the cities provider");
  return context;
}

export { citiesContext, useCities };

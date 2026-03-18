import { useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { citiesContext } from "../utils/useCities";
import {
  getCities,
  getCity as fetchCity,
  createCity,
  deleteCity as removeCity,
} from "../services/apiCities";

function reducer(state, action) {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
}

const initialState = {
  isLoading: false,
  cities: [],
  currentCity: {},
  error: "",
};

function CitiesProvider({ children }) {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function loadCities() {
      dispatch({ type: "Loading" });
      try {
        const data = await getCities();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    loadCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (
        currentCity?.id !== undefined &&
        String(id) === String(currentCity.id)
      )
        return;

      dispatch({ type: "Loading" });
      try {
        const data = await fetchCity(id);
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    },
    [currentCity?.id],
  );

  async function createNewCity(city) {
    dispatch({ type: "Loading" });
    try {
      const payload = {
        ...city,
        date: city?.date ? new Date(city.date).toISOString() : null,
      };
      const data = await createCity(payload);
      dispatch({ type: "city/added", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
      throw err;
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "Loading" });
    try {
      await removeCity(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

export { CitiesProvider };

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

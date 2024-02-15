import { useCallback, useReducer } from "react";
import CountriesReducer from "./CountriesReducer";
import CountriesContext from "./CountriesContext";
import {
  getAllCountriesService,
  getCountryService,
} from "../../services/countries";
import {
  ERROR,
  ERROR_COUNTRY,
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  IS_LOADING,
  IS_LOADING_COUNTRY,
} from "../types";

const CountriesState = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    countries: [],
    country: null,
    isLoading: false,
    isLoadingCountry: false,
    error: "",
    errorCountry: "",
  };
  const [state, dispatch] = useReducer(CountriesReducer, initialState);

  const getAllCountries = useCallback(async () => {
    dispatch({ type: IS_LOADING, payload: true });
    const response = await getAllCountriesService();
    if (response.success && Array.isArray(response.countries)) {
      const { countries } = response;
      dispatch({ type: GET_ALL_COUNTRIES, payload: countries });
    } else {
      dispatch({
        type: ERROR,
        payload: response?.errorMessages || "Oops, something went wrong. ",
      });
    }
  }, []);

  const getCountry = useCallback(async (iso: string) => {
    dispatch({ type: IS_LOADING_COUNTRY, payload: true });
    const response = await getCountryService(iso);
    if (response.success && response.country) {
      const { country } = response;
      dispatch({ type: GET_COUNTRY, payload: country });
    } else {
      dispatch({
        type: ERROR_COUNTRY,
        payload: response?.errorMessages || "Oops, something went wrong. ",
      });
    }
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countries: state.countries,
        country: state.country,
        isLoading: state.isLoading,
        isLoadingCountry: state.isLoadingCountry,
        error: state.error,
        errorCountry: state.errorCountry,
        dispatch,
        getAllCountries,
        getCountry,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesState;

import { createContext } from "react";
import { CountriesContextType } from "../types";

const initialContextValue: CountriesContextType = {
  countries: [],
  country: null,
  isLoading: false,
  isLoadingCountry: false,
  error: "",
  errorCountry: "",
  dispatch: () => {},
  getAllCountries: () => {},
  getCountry: () => {},
};

const CountriesContext = createContext(initialContextValue);

export default CountriesContext;

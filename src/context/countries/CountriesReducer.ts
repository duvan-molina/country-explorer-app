import {
  Action,
  ERROR,
  ERROR_COUNTRY,
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  IS_LOADING,
  IS_LOADING_COUNTRY,
  State,
} from "../types";

function CountriesReducer(state: State, action: Action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        isLoading: false,
      };
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
        isLoadingCountry: false,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: "",
      };
    case IS_LOADING_COUNTRY:
      return {
        ...state,
        isLoadingCountry: action.payload,
        errorCountry: "",
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ERROR_COUNTRY:
      return {
        ...state,
        errorCountry: action.payload,
        isLoadingCountry: false,
      };
    default:
      return state;
  }
}

export default CountriesReducer;

import { CountriesType, CountryType } from "../types";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const IS_LOADING_COUNTRY = "IS_LOADING_COUNTRY";
export const IS_LOADING = "IS_LOADING";
export const ERROR = "ERROR";
export const ERROR_COUNTRY = "ERROR_COUNTRY";

export type State = {
  countries: CountriesType[];
  country: CountryType | null;
  isLoading: boolean;
  isLoadingCountry: boolean;
  error: string;
  errorCountry: string;
};

type GetAllCountriesAction = {
  type: typeof GET_ALL_COUNTRIES;
  payload: CountriesType[];
};

type GetCountryAction = {
  type: typeof GET_COUNTRY;
  payload: CountryType;
};

type IsLoadingAction = {
  type: typeof IS_LOADING;
  payload: boolean;
};

type ErrorAction = {
  type: typeof ERROR;
  payload: string;
};

type IsLoadingCountryAction = {
  type: typeof IS_LOADING_COUNTRY;
  payload: boolean;
};

type ErrorCountryAction = {
  type: typeof ERROR_COUNTRY;
  payload: string;
};

export type Action =
  | GetAllCountriesAction
  | GetCountryAction
  | IsLoadingAction
  | ErrorAction
  | IsLoadingCountryAction
  | ErrorCountryAction;

export type CountriesContextType = {
  countries: CountriesType[];
  country: CountryType | null;
  isLoading: boolean;
  isLoadingCountry: boolean;
  error: string;
  errorCountry: string;
  dispatch: React.Dispatch<Action>;
  getAllCountries: () => void;
  getCountry: (iso: string) => void;
};

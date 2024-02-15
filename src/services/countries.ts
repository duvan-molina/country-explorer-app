import { CountriesType, CountryType } from "../types";

export type ApiResponseAllCountries = {
  countries: CountriesType[] | null | undefined;
  errorMessages: string | null | undefined;
  success: boolean;
};

type ApiResponseCountryType = {
  country: CountryType | null | undefined;
  errorMessages: string | null | undefined;
  success: boolean;
};

export const getAllCountriesService =
  async (): Promise<ApiResponseAllCountries> => {
    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            Accept: "application/json",
            method: "GET",
            "X-CSCAPI-KEY": import.meta.env.VITE_API_KEY as string,
          },
        }
      );
      const countries = await response.json();
      return { countries, success: true, errorMessages: null };
    } catch (error) {
      return {
        countries: null,
        success: false,
        errorMessages: "Opps, Something went wrong. Please try again later.",
      };
    }
  };

export const getCountryService = async (
  iso: string
): Promise<ApiResponseCountryType> => {
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${iso}`,
      {
        headers: {
          Accept: "application/json",
          method: "GET",
          "X-CSCAPI-KEY": import.meta.env.VITE_API_KEY as string,
        },
      }
    );
    const country = await response.json();

    return { country, success: true, errorMessages: null };
  } catch (error) {
    return {
      country: null,
      success: false,
      errorMessages: "Opps, Something went wrong. Please try again later.",
    };
  }
};

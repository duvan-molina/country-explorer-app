export type CountriesType = {
  id: number;
  name: string;
  iso2: string;
};

export type CountryType = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
  emojiU: string;
};

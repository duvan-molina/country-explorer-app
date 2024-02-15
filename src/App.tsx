import { useContext, useEffect } from "react";

import CityTableComponent from "./components/CityTable.component";
import CountriesContext from "./context/countries/CountriesContext";

import "./App.css";

const App = () => {
  const { getAllCountries } = useContext(CountriesContext);

  useEffect(() => {
    getAllCountries();
  }, []);

  return <CityTableComponent />;
};

export default App;

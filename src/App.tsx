import { useContext, useEffect } from "react";

import CityTableComponent from "./components/CityTable.component";
import CountriesContext from "./context/countries/CountriesContext";

import "./App.css";
import BasicInformationComponent from "./components/BasicInformation.component";

const App = () => {
  const { getAllCountries } = useContext(CountriesContext);

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <>
      <BasicInformationComponent />
      <CityTableComponent />;
    </>
  );
};

export default App;

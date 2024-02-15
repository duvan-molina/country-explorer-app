import { useState } from "react";

import CityTableComponent from "./components/CityTable.component";
import countries from "./services/countries.json";

import "./App.css";

function App() {
  const [data] = useState(() => [...countries]);

  return <CityTableComponent data={data} />;
}

export default App;

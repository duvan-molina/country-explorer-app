import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.tsx";

import "./index.css";
import CountriesState from "./context/countries/CountriesState.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <CountriesState>
        <App />
      </CountriesState>
    </ChakraProvider>
  </React.StrictMode>
);

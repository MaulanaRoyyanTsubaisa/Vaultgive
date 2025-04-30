import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import { Sepolia } from "@thirdweb-dev/chains";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    activeChain={Sepolia}
    supportedChains={[Sepolia]}
    autoConnect={true}
    clientId={process.env.VITE_THIRDWEB_API_KEY}
    rpc={process.env.VITE_RPC_URL}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);

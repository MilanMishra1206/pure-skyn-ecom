import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "./index.css";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/pure-skyn-ecom">
      <Provider store={store}>
        <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

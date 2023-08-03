// our top level indexed JS file is responsible for all of our redux/data setup.

// Whenever Webpack passes an import statement path like this, if you do not provide a relative path, Webpack automatically assumes that you are trying to specify a NPM module or module that is installed inside of your node modules directory. So no need to specify a relative path here.
// import materializeCSS from "materialize-css/dist/css/materialize.min.css";
// don't need variable so simplify import statement
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const el = document.getElementById("root");
const root = ReactDom.createRoot(el);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If a given file is exporting a class or a react component of any type via a functional
// component or class based component, we will label it with a capital letter. (e.g. App.js)
// But if the file returns just a function or just a series of functions
// or something like that, we will label it with a lowercase leading character. (e.g. index.js)

// console.log("stripe key is", process.env.REACT_APP_STRIPE_KEY);
// console.log("environment is", process.env.NODE_ENV);

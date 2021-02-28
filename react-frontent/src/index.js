import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import store from "./core/store"
import Routes from "./Routes"
import "./styles.scss"

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
)

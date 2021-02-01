import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { Routes, NoAuthRoutes, AuthRoutes } from "./config";
import "antd/dist/antd.css";
import AuthRoute from "./components/auth-route";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Redirect exact from="/" to={Routes.login} />
          {NoAuthRoutes.map((rt) => (
            <Route path={rt.path} component={rt.component} {...rt} />
          ))}
          {AuthRoutes.map((rt) => (
            <AuthRoute path={rt.path} Component={rt.component} {...rt} />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

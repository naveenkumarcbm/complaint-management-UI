import Title from "antd/lib/typography/Title";
import { Redirect, Route } from "react-router-dom";
import { Routes } from "../../config";
import { getUserDetail } from "../../util";

const Renderer = ({ Component, permission, ...props }) => {
  const user = getUserDetail();
  const isAuthenticated = !!user;

  if (isAuthenticated) {
    return permission.some((rl) => user.role === rl) ? (
      <Component {...props} />
    ) : (
      <Title>Page Access - Not Authorized</Title>
    );
  }
  return <Redirect to={Routes.login} />;
};

const AuthRoute = ({ exact = false, path, Component, ...props }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => <Renderer Component={Component} {...props} />}
    />
  );
};

export default AuthRoute;

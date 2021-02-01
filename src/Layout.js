import { Layout, Menu, Typography } from "antd";
import { Link, Redirect, Switch, useHistory } from "react-router-dom";
import AuthRoute from "./components/auth-route";
import { Routes, SubRoutes } from "./config";
import { getUserDetail } from "./util";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const AppLayout = () => {
  const user = getUserDetail();
  const history = useHistory();
  const logout = () => {
    sessionStorage.removeItem("TOKEN");
    history.push(Routes.login);
    window.location.reload();
  };
  return (
    <Layout className="layout">
      <Header className="app-header">
        <div className="logo">
          <Link to={Routes.landing}>
            <Title className="app-logo" level={2}>
              Incident Management
            </Title>
          </Link>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {SubRoutes.filter(
            (srt) => (srt.permission.indexOf(user.role) !== -1 && srt.menu)
          ).map((srt, i) => (
            <Menu.Item key={"srt_" + i}>
              <Link to={srt.path}>{srt.title}</Link>
            </Menu.Item>
          ))}
          <Menu.Item onClick={logout} key={"srt_100"}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="app-content">
        <Switch>
          <Redirect exact from={Routes.landing} to={Routes.incident} />
          {SubRoutes.map((rt) => (
            <AuthRoute
              exact={true}
              path={rt.path}
              Component={rt.component}
              {...rt}
            />
          ))}
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Incident Management©2021 Created by Naveen Kumar
      </Footer>
    </Layout>
  );
};

export default AppLayout;
